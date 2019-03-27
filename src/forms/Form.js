import DateFnsUtils from "@date-io/date-fns";
import arrayMutators from "final-form-arrays";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import PropTypes from "prop-types";
import React from "react";
import { Form as FForm } from "react-final-form";

import { AdminContext } from "..";
import FormContext from "./FormContext";

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
        return obj;
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
