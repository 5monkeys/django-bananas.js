import { AdminContext } from "django-bananas";
import arrayMutators from "final-form-arrays";
import PropTypes from "prop-types";
import React from "react";
import { Form as FForm } from "react-final-form";

import FormContext from "./FormContext";

class Form extends React.Component {
  static contextType = AdminContext;

  getSchema(operationId) {
    const { schema } = this.context.api[operationId];
    return schema && schema.data ? schema.data : undefined;
  }

  handleSubmit = values => {
    const { operationId, operationParams } = this.props;
    return this.context.api[operationId]({ ...operationParams, data: values })
      .then(() => {
        this.context.admin.success("Changes have been saved!");
        return false;
      })
      .catch(({ response: { statusText, status, obj } }) => {
        this.context.admin.error(`${status} : ${statusText}`);
        return obj;
      });
  };

  render() {
    const { operationId, children, onSubmit, ...props } = this.props;
    return (
      <FForm
        {...props}
        mutators={{ ...arrayMutators }}
        onSubmit={onSubmit || this.handleSubmit}
      >
        {({ handleSubmit, ...childProps }) => (
          <form onSubmit={handleSubmit}>
            <FormContext.Provider
              value={{ schema: this.getSchema(operationId) }}
            >
              {typeof children === "object"
                ? children
                : children({ handleSubmit, ...childProps })}
            </FormContext.Provider>
          </form>
        )}
      </FForm>
    );
  }
}

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  operationId: PropTypes.string.isRequired,
  operationParams: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  onSubmit: undefined,
};

export default Form;
