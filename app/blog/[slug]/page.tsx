"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import {
  FaSquareXTwitter,
  FaSquareFacebook,
  FaSquare,
  FaSquareFull,
} from "react-icons/fa6";
import { IoLogoFacebook } from "react-icons/io";
import {
  ImageShimmer,
  TextShimmer,
} from "../../../components/ui/Shimmer/shimmerStyles";
import { getBlogDetail } from "../../../hooks/api/blog/getBlogDetail";

export default function BlogPost() {
  const { slug } = useParams();
  const [blogData, setBlogData] = useState<any>();
  const fetchBlogData = async () => {
    try {
      const data = await getBlogDetail(slug as string);
      setBlogData(data);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [slug]);

  return (
    <div>
      {!blogData && (
        <div>
          <div
            className="d-block"
            style={{
              height: "15rem",
            }}
          >
            {<ImageShimmer height="100%" width="100%" />}
          </div>
          <div className="container">
            <h1 className="display-6 fw-bold lh-1 text my-5">
              <TextShimmer />
              <TextShimmer />
              <TextShimmer />
              <TextShimmer />
            </h1>
          </div>
        </div>
      )}
      {blogData ? (
        <div key={blogData?.id}>
          <div
            className="d-block"
            style={{
              height: "15rem",
              backgroundImage: `url(${blogData?.featured_image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="container">
            <h1 className="display-6 fw-bold lh-1 text mt-4">
              {blogData?.title}
            </h1>
            <div className="mt-3">
              {new Date(blogData?.updated_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </div>
            <div className="d-flex align-items-center mb-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  `${window.location.origin}/blog/${slug}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaSquareFacebook
                  size={24}
                  className="me-2"
                  style={{ color: "#1877F2" }}
                />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  `${window.location.origin}/blog/${slug}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaSquareXTwitter
                  size={24}
                  className="me-2"
                  style={{ color: "#000000" }}
                />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  `${window.location.origin}/blog/${slug}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin
                  size={24}
                  className="me-2"
                  style={{ color: "#0A66C2" }}
                />
              </a>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: blogData?.content }}
              className="mb-5"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
