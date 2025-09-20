import React, { useState } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import { FreeMode, Navigation, Thumbs, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { TPhoto } from "../../../lib/types";

const ImageViewerItem = ({ photos }: { photos: TPhoto[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        zoom={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Zoom]}
        className="mySwiper2"
      >
        {photos.map((node) => (
          <SwiperSlide key={node.id}>
            <div className="swiper-zoom-container">
              <Image
                src={node.image_url}
                alt="Swiper Image"
                width={600}
                height={600}
                className="ImageViewer"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {photos.length > 1 && (
        <Swiper
          onSwiper={(swiper: any) => setThumbsSwiper(swiper)}
          loop={true}
          spaceBetween={10}
          slidesPerView={3}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper mt-4"
        >
          {photos.map((node) => (
            <SwiperSlide key={node.id}>
              <Image
                src={node.image_url}
                alt="Swiper Thumbnail"
                width={120}
                height={120}
                className="swiperImage"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default ImageViewerItem;
