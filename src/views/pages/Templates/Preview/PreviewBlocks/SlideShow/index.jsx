import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LeadForm from "../Form";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

function SlideshowPreview({ data }) {
  const { templateDetails } = useSelector((state) => state.DrawerReducer);
  console.log(data?.struct, "chckdsdsdsd");

  const slides = data?.struct?.slides;

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(null);

  console.log(currentSlide, "thumbsSwiperthumbsSwiperthumbsSwiper");

  const handleSlideChange = (swiper) => {
    const activeIndex = swiper.realIndex;
    setCurrentSlide(slides[activeIndex]);
  };

  return (
    <div>
      <div className="game_mainParent">
        <div className="game_mainParent">
          <div className="">
            <div className="container py-4 w-100">
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={10}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper mb-4"
                onSlideChange={handleSlideChange}
              >
                {slides.map((item, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={item.image}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-auto cursor-pointer"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                  backgroundColor: `${data?.struct?.isTransparentBackground ? "transparent" : data?.struct?.colorTheme}`,
                }}
                loop={true}
                spaceBetween={10}
                slidesPerView={1.3}
                centeredSlides={true}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                {slides.map((item, i) => (
                  <SwiperSlide key={i}>
                    <div className="slide__item_content">
                      <img
                        src={item.image}
                        alt={`Nature ${i + 1}`}
                        className="w-full h-auto"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="container">
                <h4 style={{ color: data?.struct?.textColor }}>
                  {currentSlide?.header}
                </h4>
                <p style={{ color: data?.struct?.textColor }}>
                  {currentSlide?.description}
                </p>
                <p style={{ color: data?.struct?.textColor }}>
                  {currentSlide?.imageCaption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlideshowPreview;
