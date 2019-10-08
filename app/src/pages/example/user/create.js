import { Box, Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  AdminContext,
  Content,
  TitleBar,
  ToolBar,
  Tools,
} from "django-bananas";
import { Form } from "django-bananas/forms";
import PropTypes from "prop-types";
import React from "react";

import AutoField from "../../../components/CustomAutoField";

const styles = theme => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  formRoot: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  spacing: {
    "& > *": {
      marginTop: 20,
    },
  },
});

class UserForm extends React.Component {
  static contextType = AdminContext;

  render() {
    const { classes } = this.props;

    return (
      <Form
        initialValues={{}}
        route="example.user:create"
        formProps={{ className: classes.formRoot }}
      >
        <TitleBar title="Form" back=".." />
        <Content>
          <Typography variant="h4" component="h1">
            Create
          </Typography>
          <Typography gutterBottom variant="body1">
            This page utilizes a custom AutoField component
          </Typography>
          <Box className={classes.spacing}>
            <AutoField name="username" />
            <AutoField name="first_name" />
            <AutoField name="last_name" />
            <AutoField name="email" />
            {/* <AutoField name="new_password" /> */}
          </Box>
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
};

export default withStyles(styles)(UserForm);
