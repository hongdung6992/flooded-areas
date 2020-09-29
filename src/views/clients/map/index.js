import React, { useState, useRef } from "react";
import PersistentDrawerLeft from "../../../components/PersistentDrawerLeft";
import Image from "material-ui-image";
import Map from "./Map";
import AutoRotatingCarouselModal from "../../../components/AutoRotatingCarouselModal";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "./style.scss";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { floodedAreas } from "../../../data";

export default function FloodedAreasOnMap() {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const childRef = useRef();
  const matches = useMediaQuery("(max-width:600px)");

  const callHandleDrawerOpen = (data) => {
    setData(data);
    childRef.current.handleDrawerOpen();
  };

  return (
    <>
      <PersistentDrawerLeft
        main={<Map openDrawer={callHandleDrawerOpen} data={floodedAreas} />}
        ref={childRef}
      >
        {data.images && data.images[0] ? (
          <Image
            src={data.images[0].image}
            aspectRatio={16 / 9}
            onClick={() => setOpen(true)}
          />
        ) : null}
        <div className="name">{data ? data.name : ""}</div>
        {!data.length ? (
          <List>
            {floodedAreas.map((area, index) => (
              <ListItem button key={index}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
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
