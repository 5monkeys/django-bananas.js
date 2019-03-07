import PropTypes from "prop-types";
import React from "react";

import { Content, Link, TitleBar, Tools } from "../../../../src";

const UserListPage = ({ data, title }) => (
  <>
    <TitleBar title={`${title} (users)`}>
      <Tools>
        <Link route="example.user:create">Add</Link>
      </Tools>
    </TitleBar>
    <Content>
      {data.obj.map(user => (
        <Link key={user.id} route="example.user:read" params={{ id: user.id }}>
          {user.username}
        </Link>
      ))}
    </Content>
  </>
);

UserListPage.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default UserListPage;
