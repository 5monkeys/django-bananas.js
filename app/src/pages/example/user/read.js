import { Button, Typography } from "@material-ui/core";
import { AdminContext, Content, TitleBar } from "django-bananas";
import { AutoField, FieldArray, Form } from "django-bananas/forms";
import PropTypes from "prop-types";
import React from "react";

class UserPage extends React.Component {
  static contextType = AdminContext;

  render() {
    const {
      data: { obj: user },
      title,
      route,
    } = this.props;

    return (
      <>
        <TitleBar title={`${title} #${user.id}`} back=".." />
        <Content>
          <Typography>
            <strong>Route:</strong> {route.id} {`{id: ${route.params.id}}`}
          </Typography>
          <br />
          <Form
            initialValues={user}
            operationId="example.user:update"
            operationParams={{ id: route.params.id }}
          >
            <AutoField name="username" />
            <br />
            <AutoField name="email" />
            <br />
            <br />
            <FieldArray name="monkeys">
              {({ fields }) => (
                <>
                  {fields.map((prefix, index) => (
                    <div key={`formset-${prefix}`}>
                      <AutoField name={`${prefix}.name`} />
                      <Button
                        type="button"
                        onClick={() => fields.remove(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button type="button" onClick={() => fields.push({})}>
                    Add
                  </Button>
                </>
              )}
            </FieldArray>
            <br />
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Form>
        </Content>
      </>
    );
  }
}

UserPage.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.object.isRequired,
};

export default UserPage;
