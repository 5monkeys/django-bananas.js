import { Button } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Content, TitleBar, ToolBar, Tools } from "django-bananas";
import { AutoField, Form } from "django-bananas/forms";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(
  createStyles(theme => ({
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
  }))
);

const UserForm = ({ data: { obj: data } }) => {
  const classes = useStyles();
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
        <br />
        <AutoField name="choices" />
        <br />
        <AutoField name="multiple_choices" />
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
};

UserForm.propTypes = {
  data: PropTypes.object.isRequired,
};

export default UserForm;
