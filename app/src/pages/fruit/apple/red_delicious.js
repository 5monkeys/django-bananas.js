import { Typography } from "@material-ui/core";
import { Content } from "django-bananas";
import React from "react";

import GenericTitleBar from "../../../components/GenericTitleBar";

const Page = () => (
  <>
    <GenericTitleBar />
    <Content>
      <Typography gutterBottom variant="h3">
        Red delicious
      </Typography>
      <Typography gutterBottom>
        The Red Delicious is a clone of apple cultigen, now comprising more than
        50 cultivars, first recognized in Madison County, Iowa, in 1880. It is
        one of the fifteen most popular apple cultivars in the United States,
        but has become disliked by consumers and is predicted to eventually
        vanish from store shelves as orchards are replanted.
      </Typography>
      <a href="https://en.wikipedia.org/wiki/Red_Delicious">More info</a>
    </Content>
  </>
);

export default Page;
