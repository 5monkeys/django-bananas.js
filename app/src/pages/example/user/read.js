import { Button, Typography } from "@material-ui/core";
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

class UserPage extends React.Component {
  static contextType = AdminContext;

  render() {
    const {
      classes,
      data: { obj: user },
      title,
      route,
    } = this.props;

    return (
      <Form
        initialValues={user}
        operationId="example.user:update"
        operationParams={{ id: route.params.id }}
        formProps={{ className: classes.formRoot }}
      >
        <TitleBar title={`${title} ${user.username}`} back=".." />
        <Content>
          <Typography>
            <strong>Route:</strong> {route.id} {`{id: ${route.params.id}}`}
          </Typography>
          <br />
          <AutoField name="username" />
          <br />
          <AutoField name="email" />
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

UserPage.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserPage);
