import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import SwiperCore, {
  Navigation,
  Pagination,
  EffectFade,
  Autoplay,
} from "swiper";
import { Slider, SlideContent, SlideImage } from "./styled";
import { SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation, Pagination, EffectFade, Autoplay]);

const Carousel = (props) => {
  return (
    <>
      <Slider
        navigation={true}
        pagination={{ clickable: true }}
        loop={true}
        effect={"fade"}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
      >
        {props.slides.map((image) => (
          <SwiperSlide>
            <SlideContent>
              <SlideImage src={image} />
            </SlideContent>
          </SwiperSlide>
        ))}
      </Slider>
    </>
  );
};

export default Carousel;
