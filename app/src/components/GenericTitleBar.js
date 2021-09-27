import { TitleBar, usePage } from "django-bananas";
import React from "react";

const GenericTitleBar = props => {
  const { title } = usePage();
  return <TitleBar title={title} back={".."} {...props} />;
};

export default GenericTitleBar;
