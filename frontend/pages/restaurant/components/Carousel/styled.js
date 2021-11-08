import styled from "styled-components";
import { Swiper } from "swiper/react";
import COLORS from "../../../../public/constant/colors";
import BREAKPOINTS from "../../../../public/constant/breakpoints";

export const CarouselContainer = styled.div`
  width: 100%;
  background: linear-gradient(
    180deg,
    ${COLORS.PRIMARY_DARK} 90%,
    ${COLORS.PRIMARY_LIGHT} 0%
  );
`;

export const Slider = styled(Swiper)`
  width: 80%;
  height: 500px;

  .swiper-button-prev,
  .swiper-button-next {
    color: ${COLORS.LIGHT_GREY};
  }
  .swiper-button-prev:hover,
  .swiper-button-next:hover {
    color: white;
  }
  .swiper-pagination-bullet-active {
    opacity: 1;
    background: var(--swiper-pagination-color, var(--swiper-theme-color));
    background-color: ${COLORS.PRIMARY_YELLOW};
  }
  @media (max-width: ${BREAKPOINTS.DESKTOP_FULL_HD}) {
    height: 350px;
  }
  @media (max-width: ${BREAKPOINTS.HiDPI_LAPTOP}) {
    height: 250px;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    height: 200px;
  }
  @media (max-width: ${BREAKPOINTS.IPHONE_11}) {
    width: 100%;
    height: 150px;
  }
`;

export const SlideContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    ${COLORS.PRIMARY_DARK} 90%,
    ${COLORS.PRIMARY_LIGHT} 0%
  );
  justify-content: center;
`;

export const SlideImage = styled.img`
  width: auto;
  height: 100%;
`;

export const Test = styled.div`
  display: flex;

  background: linear-gradient(
    180deg,
    ${COLORS.PRIMARY_DARK} 80%,
    ${COLORS.PRIMARY_LIGHT} 0%
  );
  width: 100%;
  height: 200px;
`;
