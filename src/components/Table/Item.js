import React from "react";
import {
  withStyles,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  LinearProgress,
  TablePagination,
  TableFooter,
  IconButton,
} from "material-ui";
import {
  LastPage,
  KeyboardArrowRight,
  KeyboardArrowLeft,
  FirstPage
} from "@material-ui/icons";

import PropTypes from "prop-types";

import tableStyle from "../../assets/jss/components/tableStyle";

function Item({ ...props }) {
  const {
    classes,
    data,
    onClick,
  } = props;
  return (
    <TableRow>
      {
        data.map((prop, index) => (
          <TableCell key={index} className={classes.tableCell}>
            {
              prop instanceof Array ? (
                prop.map((p) => p)
              ) : prop
            }
          </TableCell>
        ))
      }
    </TableRow>
  );
}

Item.defaultProps = {
  tableHeaderColor: "gray"
};

Item.propTypes = {
  onClick: PropTypes.func,
  classes: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.object)])),
};

export default withStyles(tableStyle)(Item);
