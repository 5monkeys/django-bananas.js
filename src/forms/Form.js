import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { FORM_ERROR } from "final-form";
import arrayMutators from "final-form-arrays";
import PropTypes from "prop-types";
import React from "react";
import { Form as FForm } from "react-final-form";

import AdminContext from "../context";
import FormContext from "./FormContext";

/*
Turn this:
    {"detail": "User already exists"}

And this:
    {"__all__": "User already exists"}

Also this:
    {"non_field_errors": ["User already exists"]}

Into this, with `FORM_ERROR` from final-form:
    {[FORM_ERROR]: ["Passwords must match"], "<field_name>": ["This field is required"]}
*/
function normalizeFormErrorData(data) {
  let normalizedData = data;
  if (data != null && typeof data === "object") {
    const { non_field_errors = [], __all__ = [], detail, ...errors } = data;
    normalizedData = {
      [FORM_ERROR]: non_field_errors
        .concat(__all__)
        .concat(detail)
        .filter(Boolean),
      ...errors,
    };
  }
  return normalizedData;
}

class Form extends React.Component {
  static contextType = AdminContext;

  getSchema(route) {
    const { schema } = this.context.api[route];
    return schema && schema.data ? schema.data : undefined;
  }

  handleSubmit = values => {
    const { route, params, onSubmit } = this.props;
    const endpoint = data =>
      this.context.api[route]({ ...params, data: data || values });
    if (onSubmit) {
      return onSubmit({ endpoint, values });
    }
    return endpoint()
      .then(() => {
        // TODO: store data from server in the form
        this.context.admin.success("Changes have been saved!");
        return false;
      })
      .catch(({ response: { statusText, status, obj } }) => {
        const errorMessages = {
          400: "Please correct the errors on this form.",
        };
        this.context.admin.error(
          errorMessages[status] || `${status} : ${statusText}`
        );
        return normalizeFormErrorData(obj);
      });
  };

  render() {
    const { route, children, formProps, ...props } = this.props;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FForm
          {...props}
          mutators={{ ...arrayMutators }}
          onSubmit={this.handleSubmit}
        >
          {({ handleSubmit, ...childProps }) => (
            <form onSubmit={handleSubmit} {...formProps}>
              <FormContext.Provider value={{ schema: this.getSchema(route) }}>
                {typeof children === "object"
                  ? children
                  : children({ handleSubmit, ...childProps })}
              </FormContext.Provider>
            </form>
          )}
        </FForm>
      </MuiPickersUtilsProvider>
    );
  }
}

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  route: PropTypes.string.isRequired,
  params: PropTypes.object,
  onSubmit: PropTypes.func,
  formProps: PropTypes.object,
};

Form.defaultProps = {
  onSubmit: undefined,
  params: {},
  formProps: {},
};

export default Form;
