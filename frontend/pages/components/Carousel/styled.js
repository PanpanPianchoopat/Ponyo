import styled from "styled-components";
import { Swiper } from "swiper/react";
import COLORS from "../../../public/constant/colors";
import BREAKPOINTS from "../../../public/constant/breakpoints";

export const Slider = styled(Swiper)`
  width: 80%;
  height: 700px;
  .swiper-button-prev,
  .swiper-button-next {
    color: #4c403f;
    background: rgb(246, 190, 15, 0.5);
    border-radius: 50px;
    padding: 35px;
  }
  .swiper-button-prev:hover,
  .swiper-button-next:hover {
    background: rgb(246, 190, 15, 1);
  }
  .swiper-pagination-bullet-active {
    opacity: 1;
    background: var(--swiper-pagination-color, var(--swiper-theme-color));
    background-color: ${COLORS.PRIMARY_YELLOW};
  }
  @media (max-width: ${BREAKPOINTS.HiDPI_LAPTOP}) {
    height: 450px;
  }
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    height: 250px;
    .swiper-button-prev,
    .swiper-button-next {
      color: ${COLORS.PRIMARY_YELLOW};
      background: none;
    }
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
  background: ${COLORS.PRIMARY_DARK};
  justify-content: center;
`;

export const SlideImage = styled.img`
  width: auto;
  height: 100%;
`;
