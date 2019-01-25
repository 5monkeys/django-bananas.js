import { Typography } from "@material-ui/core";
import { Content, TitleBar } from "django-bananas";
import React from "react";

export default () => (
  <>
    <TitleBar title={"Create User"} back=".." />
    <Content>
      <Typography>...form</Typography>
    </Content>
  </>
);
