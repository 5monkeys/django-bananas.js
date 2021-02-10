import { Avatar } from "@material-ui/core";
import { AdminContext } from "django-bananas";
import gravatar from "gravatar";
import React from "react";

const Gravatar = ({ props }) => {
  return (
    <AdminContext.Consumer>
      {context => {
        const url = gravatar.url(context.user.email);
        return <Avatar src={url} {...props} />;
      }}
    </AdminContext.Consumer>
  );
};

export default Gravatar;
