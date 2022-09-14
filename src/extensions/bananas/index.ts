import { RouterExtension } from "../../router/Router";
import { PageComponent } from "../../types";
import MePage from "./pages/me/list";

export const bananasRouterExtension: RouterExtension = {
  app: "bananas",
  pages: async (route) => {
    if (route.view === "me" && route.action === "list") {
      return MePage as PageComponent;
    }

    throw new Error("Unknown bananas page");
  },
};
