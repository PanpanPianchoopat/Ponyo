import styled from "styled-components";
import { PhoneFilled } from "@ant-design/icons";
import COLORS from "../../../../public/constant/colors";

export const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px;
  align-items: flex-start;
`;

export const DetailText = styled.text`
  font-size: 13px;
  color: #4c403f;
`;
export const PhoneIcon = styled(PhoneFilled)`
  font-size: 16px;
  color: ${COLORS.PRIMARY_BLUE};
  transform: scaleX(-1);
  margin-right: 5px;
`;
