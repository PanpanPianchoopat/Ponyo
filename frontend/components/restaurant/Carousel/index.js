/*******************************************************************************
 * Carousel component - images slideshow.
 * 'slides' is an array of images to be displayed in the carousel.
 ******************************************************************************/

import React from "react";
import { Slider, SlideContent, SlideImage, CarouselContainer } from "./styled";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper";

SwiperCore.use([Navigation, Pagination, Autoplay, EffectCoverflow]);

const Carousel = (props) => {
  const TRANSITION_DELAY_MS = 2500;
  const SLIDE_ROTATE_DEG = 50;
  const SPACE_BETWEEN_SLIDE = 0;
  const DEPTH_OFFSET_PX = 100;
  const EFFECT_MULTIPLIER = 1;

  return (
    <>
      <CarouselContainer>
        <Slider
          navigation={true}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: TRANSITION_DELAY_MS, disableOnInteraction: false }}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: SLIDE_ROTATE_DEG,
            stretch: SPACE_BETWEEN_SLIDE,
            depth: DEPTH_OFFSET_PX,
            modifier: EFFECT_MULTIPLIER,
            slideShadows: true,
          }}
        >
          {props.slides.map((image, index) => {
            return (
              <SwiperSlide key={index}>
                <SlideContent>
                  <SlideImage src={image} />
                </SlideContent>
              </SwiperSlide>
            );
          })}
        </Slider>
      </CarouselContainer>
    </>
  );
};

export default Carousel;
