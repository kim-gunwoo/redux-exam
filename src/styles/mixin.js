import { css } from "styled-components";

const sampleFlex = (
  justify = "center",
  items = "center",
  direction = "row"
) => css`
  display: flex;
  justify-content: ${justify};
  align-items: ${items};
  flex-direction: ${direction};
`;

const mixin = { sampleFlex };

export default mixin;
