import React from "react";

import { AdminContext, Content } from "../../src";

export default () => {
  return (
    <Content>
      <p>Dashboard Test Page</p>
      <AdminContext.Consumer>
        {context => {
          window.__adminContext = context;
          return null;
        }}
      </AdminContext.Consumer>
    </Content>
  );
};
