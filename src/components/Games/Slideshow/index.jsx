import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

function Slideshow({
  data,
  isSelected,
  handleSelectBlock,
  isFirst,
  isLast,
  handleDeleteBlock,
  handleEditModal,
  setShowTemplatePreview,
  handleMoveDown,
  handleMoveUp,
  cloneblock,
  handleAddBlockFromBlock,
}) {
  console.log(data, "chekcdttatsasasayavoa");

  const slides = data?.struct?.slides;

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(null);

  console.log(currentSlide, "thumbsSwiperthumbsSwiperthumbsSwiper");

  const handleSlideChange = (swiper) => {
    const activeIndex = swiper.realIndex;
    setCurrentSlide(slides[activeIndex]);
  };

  return (
    <div
      style={{ fontSize: "unset" }}
      className={isSelected ? "block-builder selected" : "block-builder"}
      onClick={() => handleSelectBlock("slide-show", data)}
    >
      <button
        className="plus-selected"
        onClick={() => handleAddBlockFromBlock(data.id)}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
      <div className="game_mainParent">
        <div className="editButton">
          <button
            className="button-boost"
            onClick={() => handleEditModal("slide-show", data?.id)}
          >
            Edit
          </button>
        </div>
        <div className="preview-alert">
          You can try the game in action in the{" "}
          <span type="button" onClick={() => setShowTemplatePreview("preview")}>
            <i class="fa-regular fa-eye"></i> Preview mode
          </span>
        </div>
        <div className="disabled-panel">
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
      <ul
        className={`${isSelected ? "inlineControls selected-controls" : "inlineControls"}  `}
      >
       {!isFirst && (<li
          className="Inline_control__list"
          title="Move up"
          role="button"
          onClick={() => handleMoveUp(data.id)}
        >
          <i className="fa-solid fa-arrow-up"></i>
        </li>)}
        {!isLast && (<li
          className="Inline_control__list"
          title="Move down"
          role="button"
          onClick={() => handleMoveDown(data.id)}
        >
          <i className="fa-solid fa-arrow-down"></i>
        </li>)}
        <li
          className="Inline_control__list"
          title="Clone"
          role="button"
          onClick={() => cloneblock(data.id)}
        >
          <i className="fa-solid fa-copy"></i>
        </li>
        <li
          className="Inline_control__list"
          title="Remove"
          data-test="delete-block"
          role="button"
          onClick={() => handleDeleteBlock(data?.id)}
        >
          <i className="fa-solid fa-trash"></i>
        </li>
      </ul>
    </div>
  );
}

export default Slideshow;
