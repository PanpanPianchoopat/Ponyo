import styled from "styled-components";
import COLORS from "../../public/constant/colors";

export const LockContainer = styled.div`
  display: flex;
  margin: 30px auto;
  flex-direction: column;
  align-items: center;
`;

export const LockText = styled.div`
  font-size: 1rem;
  width: 200px;
  display: flex;
  text-align: center;
  color: ${COLORS.PRIMARY_YELLOW};
  margin: 20px 0;
`;
