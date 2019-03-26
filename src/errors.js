export class PageError extends Error {}
export class PageNotFoundError extends PageError {
  message = "Page not found";
  code = 404;
}
export class InternalPageError extends PageError {
  message = "Internal page error";
  code = 500;
}
export class PageNotImplementedError extends PageError {
  message = "Page not implemented";
  code = 501;
}
export class AnonymousUserError extends Error {}
