import { Typography } from "@material-ui/core";
import { Content, TitleBar } from "django-bananas";
import PropTypes from "prop-types";
import React from "react";

const UserPage = ({ data, title, route }) => {
  const user = data.obj;
  return (
    <>
      <TitleBar title={`${title} #${user.id}`} back=".." />
      <Content>
        <Typography>
          <strong>Route:</strong> {route.id} {`{id: ${route.params.id}}`}
        </Typography>
        <br />
        <Typography>
          <strong>ID:</strong> {user.id}
        </Typography>
        <Typography>
          <strong>Username:</strong> {user.username}
        </Typography>
        <Typography>
          <strong>Name:</strong> {user.full_name}
        </Typography>
        <Typography>
          <strong>E-mail:</strong> {user.email}
        </Typography>
      </Content>
    </>
  );
};

UserPage.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.object.isRequired,
};

export default UserPage;
