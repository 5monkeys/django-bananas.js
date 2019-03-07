import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  AdminContext,
  Content,
  TitleBar,
  ToolBar,
  Tools,
} from "django-bananas";
import { AutoField, Form } from "django-bananas/forms";
import PropTypes from "prop-types";
import React from "react";

const styles = theme => ({
  paper: {
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
  },
  formRoot: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.paper,
  },
});

class UserForm extends React.Component {
  static contextType = AdminContext;

  render() {
    const {
      classes,
      data: { obj: data },
    } = this.props;

    return (
      <Form
        initialValues={data}
        route="example.user:form.create"
        formProps={{ className: classes.formRoot }}
      >
        <TitleBar title="Form" back=".." />
        <Content>
          <AutoField name="text" />
          <br />
          <AutoField name="date" />
          <br />
          <AutoField name="datetime" />
          <br />
          <AutoField name="boolean" variant="checkbox" />
          <br />
          <AutoField name="boolean" variant="switch" />
          <br />
          <AutoField name="integer" />
        </Content>
        <ToolBar color="paper" justify="end">
          <Tools>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Tools>
        </ToolBar>
      </Form>
    );
  }
}

UserForm.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserForm);
