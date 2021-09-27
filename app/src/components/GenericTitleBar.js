import React from "react";
import { TitleBar, usePage } from "django-bananas";

const GenericTitleBar = props => {
  const { title } = usePage();
  return <TitleBar title={title} back={".."} {...props} />;
};

export default GenericTitleBar;
