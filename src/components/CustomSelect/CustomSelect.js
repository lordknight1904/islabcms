import React from "react";
import { withStyles, FormControl, Select, MenuItem, InputLabel } from "material-ui";
// import { Clear, Check } from "@material-ui/icons";
import PropTypes from "prop-types";
// import cx from "classnames";

import customInputStyle from "../../assets/jss/components/customInputStyle";

function CustomSelect({ ...props }) {
  const {
    classes,
    formControlProps,
    onChange,
    labelText,
    // labelProps,
    // selectProps,
    data,
    name,
    value,
    // error,
    // success
  } = props;

  // const marginTop = cx({
  //   [classes.marginTop]: labelText === undefined
  // });
  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      <InputLabel htmlFor="age-simple">{labelText}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        name={name}
        classes={{
          disabled: classes.disabled,
        }}
      >
        {
          data.map((d, index) => (
            <MenuItem key={index} value={d.name}>{d.name}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}

CustomSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  selectProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool
};

export default withStyles(customInputStyle)(CustomSelect);
