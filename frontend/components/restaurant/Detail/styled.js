import styled from "styled-components";
import { PhoneFilled } from "@ant-design/icons";
import COLORS from "../../../public/constant/colors";
import BREAKPOINTS from "../../../public/constant/breakpoints";
import { BsFillGeoAltFill } from "react-icons/bs";

export const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px;
  align-items: flex-start;
`;

export const SectionHeader = styled.b`
  font-size: 20px;
  margin-bottom: 10px;
  @media (max-width: ${BREAKPOINTS.IPAD_LANDSCAPE}) {
    font-size: 18px;
  }
`;

export const CloseDays = styled.small`
  color: ${COLORS.PRIMARY_RED};
  font-size: 14px;
`;

export const DetailText = styled.small`
  font-size: 14px;
  margin: 5px 0;
  color: #4c403f;
`;
export const PhoneIcon = styled(PhoneFilled)`
  font-size: 16px;
  color: ${COLORS.PRIMARY_BLUE};
  transform: scaleX(-1);
  margin-right: 5px;
`;

export const PinIcon = styled(BsFillGeoAltFill)`
  margin-right: 5px;
  color: ${COLORS.PRIMARY_RED};
`;

export const Direction = styled.a`
  width: 80%;
  height: 25px;
  border-radius: 5px;
  align-self: center;
  background: ${COLORS.PRIMARY_BLUE};
  color: white;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  &:hover {
    filter: brightness(0.9);
    color: white;
  }
`;

export default InnerContainer;
