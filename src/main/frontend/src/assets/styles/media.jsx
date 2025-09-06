import mediaOriginal from "styled-media-query";

const media = {
  /* 1170px以上 */
  xl: (...args) => mediaOriginal.greaterThan("large")(...args),
  
  /* 768px以上1170px以下 */
  lg: (...args) => mediaOriginal.between("medium", "large")(...args),
  
  /* 768px以下 */
  md: (...args) => mediaOriginal.lessThan("medium")(...args),
  
  /* 1170px以下 */
  lessThanlg: (...args) => mediaOriginal.lessThan("large")(...args),
};

export default media;
