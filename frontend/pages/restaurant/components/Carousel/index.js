import React from "react";
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
import { Slider, SlideContent, SlideImage, CarouselContainer } from "./styled";
import { SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation, Pagination, Autoplay, EffectCoverflow]);

const Carousel = (props) => {
  return (
    <CarouselContainer>
      <Slider
        navigation={true}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
      >
        {props.slides.map((image, index) => (
          <SwiperSlide key={index}>
            <SlideContent>
              <SlideImage src={image} />
            </SlideContent>
          </SwiperSlide>
        ))}
      </Slider>
    </CarouselContainer>
  );
};

export default Carousel;
