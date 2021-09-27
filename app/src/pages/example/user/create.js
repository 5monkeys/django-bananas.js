import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Content, TitleBar, ToolBar, Tools } from "django-bananas";
import { Form } from "django-bananas/forms";
import React from "react";

import PermissionRequired from "../../../../../src/auth/PermissionRequired";
import AutoField from "../../../components/CustomAutoField";

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
    spacing: {
      "& > *": {
        marginTop: 20,
      },
    },
  }))
);

const RawInput = ({ input, fieldProps: { label, helperText, ...rest } }) => (
  <label>
    {label}
    {helperText && ` (${helperText})`}:
    <br />
    <input {...input} type="email" {...rest} />
  </label>
);

const UserCreate = () => {
  const classes = useStyles();

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
          <Typography>
            ... And a raw input utilizing the FieldComponent prop to supply a
            custom component:
          </Typography>
          <AutoField name="email" FieldComponent={RawInput} />
        </Box>
      </Content>
      <ToolBar color="paper" justify="end">
        <Tools>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <PermissionRequired permission={"auth.delete_user"}>
            <Tooltip
              title={
                "only visible if you have the permission 'auth.delete_user'"
              }
            >
              <Button type="submit" variant="contained" color="secondary">
                Special save
              </Button>
            </Tooltip>
          </PermissionRequired>
        </Tools>
      </ToolBar>
    </Form>
  );
};

export default UserCreate;
