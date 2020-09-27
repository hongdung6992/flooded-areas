import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Image from "material-ui-image";
import Map from "./Map";
import AutoRotatingCarouselModal from "../../../components/AutoRotatingCarouselModal";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "./style.scss";

const drawerWidth = 400;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    padding: 0,
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});
  const [openCarousel, setOpenCarousel] = React.useState(false);

  const handleDrawerOpen = (data) => {
    setData(data);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const matches = useMediaQuery("(max-width:600px)");
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <div className="header-title">ダナンの浸水地域</div>
          <IconButton onClick={handleDrawerClose} className="header-icon">
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {data.images && data.images[0] ? (
          <Image
            src={data.images[0].image}
            aspectRatio={16 / 9}
            onClick={() => setOpenCarousel(true)}
          />
        ) : null}
        <div className="name">{data ? data.name : ""}</div>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Map openDrawer={handleDrawerOpen} />
      </main>
      <AutoRotatingCarouselModal
        handleOpen={openCarousel}
        setHandleOpen={setOpenCarousel}
        data={data.images}
        isMobile={matches}
      />
    </div>
  );
}
