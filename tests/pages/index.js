import React from "react";

import { AdminContext, Content } from "../../src";

const IndexPage = () => {
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

export default IndexPage;
