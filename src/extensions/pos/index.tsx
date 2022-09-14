import { RouterExtension } from "../../router/Router";
import { PageComponent } from "../../types";
import PurchaseDetailPage from "./pages/purchase/detail";
import PurchaseListPage from "./pages/purchase/list";

export const posRouterExtension: RouterExtension = {
  app: "pos",
  pages: (route) => {
    if (route.view === "purchase") {
      switch (route.action) {
        case "list":
          return PurchaseListPage as PageComponent;
        case "detail":
          return PurchaseDetailPage as PageComponent;
      }
    }

    throw new Error("Unknown pos page");
  },
};
