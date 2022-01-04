import { Typography } from "@mui/material";
import { Content } from "django-bananas";
import React from "react";

import GenericTitleBar from "../../../components/GenericTitleBar";

const Page = () => (
  <>
    <GenericTitleBar />
    <Content>
      <Typography gutterBottom variant="h3">
        Granny Smith
      </Typography>
      <Typography gutterBottom>
        The Granny Smith is a tip-bearing apple cultivar, which originated in
        Australia in 1868. It is named after Maria Ann Smith, who propagated the
        cultivar from a chance seedling. The tree is thought to be a hybrid of
        Malus sylvestris, the European wild apple, with the Domesticated apple
        Malus pumila as the polleniser.[citation needed]
      </Typography>
      <a href="https://en.wikipedia.org/wiki/Granny_Smith">More info</a>
    </Content>
  </>
);
export default Page;
