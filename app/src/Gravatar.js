import { Avatar } from "@material-ui/core";
import { AdminContext } from "django-bananas";
import gravatar from "gravatar";
import React from "react";

export default ({ props }) => (
  <AdminContext.Consumer>
    {context => {
      const url = gravatar.url(context.user.email);
      return <Avatar src={url} {...props} />;
    }}
  </AdminContext.Consumer>
);
