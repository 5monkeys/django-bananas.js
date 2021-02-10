import { Typography } from "@material-ui/core";
import { Content } from "django-bananas";
import React from "react";

const AppleList = () => (
  <Content>
    <Typography gutterBottom variant="h3">
      Apples
    </Typography>
    <Typography gutterBottom>Apples are fruits.</Typography>
    <a href="https://en.wikipedia.org/wiki/Granny_Smith">More info</a>
  </Content>
);

export default AppleList;
