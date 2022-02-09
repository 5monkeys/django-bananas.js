import { Button, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Content, TitleBar, ToolBar, Tools } from "django-bananas";
import { AutoField, Form } from "django-bananas/forms";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(
  createStyles(theme => ({
    paper: {
      margin: theme.gap(2),
      padding: theme.gap(2),
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

const UserPage = ({ data: { obj: user }, title, route }) => {
  const classes = useStyles();
  return (
    <Form
      initialValues={user}
      route="example.user:update"
      params={{ id: route.params.id }}
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
};

UserPage.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.object.isRequired,
};

export default UserPage;
