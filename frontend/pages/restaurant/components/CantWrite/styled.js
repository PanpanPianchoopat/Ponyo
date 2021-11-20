import styled from "styled-components";
import COLORS from "../../../../public/constant/colors";

export const LockContainer = styled.div`
  display: flex;
  margin: 30px auto;
  flex-direction: column;
  align-items: center;
`;

export const LockText = styled.b`
  font-size: 1rem;
  color: ${COLORS.PRIMARY_YELLOW};
  margin: 10px 0;
`;
