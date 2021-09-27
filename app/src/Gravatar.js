import { Avatar } from "@material-ui/core";
import { useAdmin } from "django-bananas";
import gravatar from "gravatar";
import React from "react";

const Gravatar = ({ props }) => {
  const { user } = useAdmin();
  const url = gravatar.url(user.email);

  return <Avatar src={url} {...props} />;
};

export default Gravatar;
