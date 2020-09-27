import React from "react";
import { AutoRotatingCarousel } from "material-auto-rotating-carousel";
import CarouselEffect from '../CarouselEffect';

const AutoRotatingCarouselModal = ({
  handleOpen,
  setHandleOpen,
  isMobile,
  data,
}) => {
  return (
    <div>
      <AutoRotatingCarousel
        open={handleOpen}
        onClose={() => setHandleOpen(false)}
        onStart={() => setHandleOpen(false)}
        autoplay={false}
        mobile={isMobile}
      >
        <CarouselEffect data={data} />
      </AutoRotatingCarousel>
    </div>
  );
};

export default AutoRotatingCarouselModal;
