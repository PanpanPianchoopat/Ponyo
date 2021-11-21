import styled from "styled-components";
import COLORS from "../../public/constant/colors";
import { SmileOutlined } from "@ant-design/icons";

export const Header = styled.div`
  padding: 50px 0 100px 0;
  margin-bottom: 20px;
  background: ${COLORS.PRIMARY_DARK};
  display: flex;
  justify-content: center;
`;

export const Loading = styled.p`
  color: white;
  font-size: 20px;
`;

export const SmileIcon = styled(SmileOutlined)`
  color: ${COLORS.PRIMARY_YELLOW};
  margin-right: 10px;
  font-size: 50px;
`;

export default Header;
