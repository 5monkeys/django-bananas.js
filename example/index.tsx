import React from "react";
import ReactDOM from "react-dom";
import * as Bananas from "bananas-commerce-admin";

ReactDOM.render(
  <React.StrictMode>
    <Bananas.App
      api={{
        schema: "http://localhost:8123/_/admin/api/v1/openapi.json",
        server: "http://localhost:8123/_/admin/api/v1/",
      }}
      nav={{}}
      extensions={[Bananas.bananasRouterExtension, Bananas.posRouterExtension]}
      pages={async (route) => {
        console.log(route);
        return (await import(`./pages/${route.page}`)).default;
      }}
    />
  </React.StrictMode>,
  document.getElementById("root") as HTMLElement,
);
