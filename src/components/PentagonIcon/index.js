import React from "react";
import PropTypes from "prop-types";

const PentagonIcon = ({ size }) => {
  return (
    <img
      style={{ width: size, height: size }}
      alt="pentagon-icon"
      src="./images/icon/pentagon.png"
    />
  );
};

PentagonIcon.propTypes = {
  size: PropTypes.number,
};

export default PentagonIcon;
