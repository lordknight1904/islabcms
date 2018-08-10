import React from "react";
import { withStyles, FormControl, InputLabel, Input, FormHelperText } from "material-ui";
import { Clear, Check } from "@material-ui/icons";
import PropTypes from "prop-types";
import cx from "classnames";

import customInputStyle from "../../assets/jss/components/customInputStyle";

function CustomInput({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
    onChange,
    onKeyDown,
    name,
    helperText,
  } = props;

  const labelClasses = cx({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = cx({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true
  });
  const marginTop = cx({
    [classes.marginTop]: labelText === undefined
  });
  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        id={id}
        name={name}
        onChange={onChange}
        onKeyDown={onKeyDown}
        {...inputProps}
      />
      {
        (helperText !== undefined && error) ? (
          <FormHelperText className={classes.labelRootError}>{helperText}</FormHelperText>
        ) : null
      }
      {error ? (
        <Clear className={classes.feedback + " " + classes.labelRootError} />
      ) : success ? (
        <Check className={classes.feedback + " " + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  );
}

CustomInput.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  helperText: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool
};

export default withStyles(customInputStyle)(CustomInput);
