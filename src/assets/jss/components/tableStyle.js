// ##############################
// // // Table styles
// #############################

import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont
} from "../theme";

const tableStyle = theme => ({
  warningTableHeader: {
    color: warningColor
  },
  primaryTableHeader: {
    color: primaryColor
  },
  dangerTableHeader: {
    color: dangerColor
  },
  successTableHeader: {
    color: successColor
  },
  infoTableHeader: {
    color: infoColor
  },
  roseTableHeader: {
    color: roseColor
  },
  grayTableHeader: {
    color: grayColor
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse"
  },
  tableHeadCell: {
    color: "inherit",
    ...defaultFont,
    fontSize: "1em"
  },
  tableCell: {
    ...defaultFont,
    lineHeight: "1.42857143",
    padding: "12px 8px",
    verticalAlign: "middle",
    "&:first-child": {
      marginLeft: '0',
    },
    "&:last-child": {
      marginRight: '0',
    }
  },
  tableCellLoading: {
    ...defaultFont,
    lineHeight: "1.42857143",
    padding: "0 !important",
    borderBottom: "none",
    verticalAlign: "top",
  },
  tableResponsive: {
    width: "100%",
    // marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  emptyTableFooter: {
    height: '0',
  }
});

export default tableStyle;
