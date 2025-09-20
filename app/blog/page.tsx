"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import styled from "styled-components";
// import Button from "../../components/ui/common/Button";
import ProductListingShimmer from "../../components/ui/Shimmer/ProductListingShimmer";
import { getBlogs } from "../../hooks/api/blog/getBlogs";
import Button from "../../components/ui/common/Button";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<any>(null);
  useEffect(() => {
    const result = getBlogs().then((data) => setBlogs(data));
  }, []);
  return (
    <div>
      <HeroSection>
        <h1>The Blog Corner</h1>
      </HeroSection>
      <Container className="">
        <Row className="p-5">
          {!blogs ? (
            <ProductListingShimmer count={4} />
          ) : !blogs.results || blogs.results.length === 0 ? (
            <div className="col-12 text-center py-5">
              <h4>No blogs found. Check back later!</h4>
            </div>
          ) : (
            blogs.results.map((item: any, idx: any) => (
              // this is the card
              <div className="col-md-6 col-lg-4 p-3" key={idx}>
                <a
                  href={`/blog/${item.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="card hover-zoom">
                    <Image
                      src={item.featured_image}
                      alt={item.title}
                      width={500}
                      height={250}
                      className="p-3"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                    <div className="p-3 pt-0">
                      <div className="text-muted card-subtitle pb-2">
                        {new Date(item.published_date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </div>
                      <h5 className="card-title">
                        <b>{item.title}</b>
                      </h5>
                      <p className=" card-text text-limit-two-line">
                        {item.excerpt}
                      </p>
                      <div
                        style={{ backgroundColor: "#3d3d3d", color: "white" }}
                        className="btn"
                      >
                        {/* <Button
                          varient="primary"
                          label="Read More"
                          borderradius="5px"
                          className="cursor-pointer"
                          onClick={() => router.push(`/blog/${item.slug}`)}
                        /> */}
                        Read More
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))
          )}
        </Row>
      </Container>
    </div>
  );
};

const HeroSection = styled.div`
  padding: 5rem 0;
  text-align: center;
  background-color: ${(props) =>
    props?.theme?.colors?.backgroundDark || "#f8f9fa"};
  color: #fff;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`;

export default Page;
