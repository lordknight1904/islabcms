
import { drawerWidth, transition, container, backgroundColor, spacingUnit } from "../theme";

const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
    backgroundColor: backgroundColor,
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: 'touch'
  },
  content: {
    marginTop: "70px",
    padding: "30px 15px",
    minHeight: "calc(100% - 123px)"
  },
  container,
  map: {
    marginTop: "70px"
  },
  buttonMini: {
    width: '35px',
    height: '35px',
    margin: `0 ${spacingUnit}px`,
    '& svg': {
      fontSize: '14px',
    }
  },
  buttonRoot: {
    margin: '0',
    padding: '0',
  },
  pdfWidth: {
    '& canvas': {
      width: '100% !important',
    }
  }
});

export default appStyle;