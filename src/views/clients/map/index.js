import React, { useState, useRef } from "react";
import PersistentDrawerLeft from "../../../components/PersistentDrawerLeft";
import Image from "material-ui-image";
import Map from "./Map";
import AutoRotatingCarouselModal from "../../../components/AutoRotatingCarouselModal";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "./style.scss";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { floodedAreas } from "../../../data";
import PentagonIcon from "../../../components/PentagonIcon";

export default function FloodedAreasOnMap() {
  const [areas] = useState(floodedAreas);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const childRef = useRef();
  const mapRef = useRef();
  const matches = useMediaQuery("(max-width:600px)");

  const callHandleDrawerOpen = (data) => {
    setData(data);
    childRef.current.handleDrawerOpen();
    mapRef.current.zoomToCenter(data);
  };

  return (
    <>
      <PersistentDrawerLeft
        main={
          <Map
            openDrawer={callHandleDrawerOpen}
            data={floodedAreas}
            ref={mapRef}
          />
        }
        ref={childRef}
      >
        {data.images && data.images[0] ? (
          <Image
            src={data.images[0].image}
            aspectRatio={16 / 9}
            onClick={() => setOpen(true)}
          />
        ) : null}
        {data && data.name ? (
          <div className="name">Area: {data.name}</div>
        ) : null}

        {data && data.description ? (
          <div className="name">Description: {data.description}</div>
        ) : null}

        {data.length !== 0 ? (
          <List>
            {areas.map((area, index) => (
              <ListItem
                button
                key={index}
                onClick={() => callHandleDrawerOpen(area)}
              >
                <ListItemIcon>
                  <PentagonIcon size={30} />
                </ListItemIcon>
                <ListItemText primary={area.name} />
              </ListItem>
            ))}
          </List>
        ) : null}
      </PersistentDrawerLeft>
      <AutoRotatingCarouselModal
        handleOpen={open}
        setHandleOpen={setOpen}
        data={data.images}
        isMobile={matches}
      />
    </>
  );
}
