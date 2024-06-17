import { css } from "styled-components";

const mobile = (styles) => {
  return css`
    @media only screen and (max-width: 380px) {
      ${styles}
    }
  `;
};

export default mobile;
