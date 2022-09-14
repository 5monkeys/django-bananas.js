import { capitalize, nthIndexOf } from "../util";

/**
 * Parses an `operationId` returning app, view and action
 *
 * ## Examples
 *
 * `bananas.me:list` -> `{ app: "bananas", view: "me", action: "list" }`
 *
 * `bananas.login:create` -> `{ app: "bananas", view: "login", action: "create" }`
 *
 * `bananas.i18n:list` -> `{ app: "bananas", view: "i18n", action: "list" }`
 */
export function parseOperationId(
  operationId: string,
): { app: string; view: string; action: string } | undefined {
  const match = operationId.match(/^(\w+)\.(\w+):(\w+)$/);

  if (match !== null) {
    return {
      app: match[1],
      view: match[2],
      action: match[3],
    };
  }

  return undefined;
}

export function isNavigation(tags: string[]): boolean {
  return tags.includes("navigation");
}

export function getPath(
  endpoint: string,
  method: string,
  action: string | undefined,
): string {
  return (method.toLowerCase() === "get"
    ? endpoint
    : `${endpoint}${action ?? ""}/`).replace(/{([^}]*)}/, ":$1");
}

function getBasePath(path: string): string {
  return path.substring(0, (nthIndexOf(path, "/", 2, 1) + 1) || undefined);
}

export function getPage(
  path: string,
  action: string | undefined,
): string {
  const basePath = getBasePath(path);
  const relativeBasePath = basePath.slice(1);
  return `${relativeBasePath}${action}`;
}

function getAppLabel(tags: string[]): string {
  return tags.filter((tag) => tag.startsWith("app:"))[0]?.split(":")[1];
}

function getView(id: string): string {
  return id.substring(id.indexOf(".") + 1, id.indexOf(":"));
}

export function getTitle(view: string, summary?: string): string {
  return (summary ?? (view && capitalize(view.replace("_", " "))));
}
