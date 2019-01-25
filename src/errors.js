export class PageError extends Error {}
export class PageNotFoundError extends PageError {
  message = "Page Not Found";
  code = 404;
}
export class InternalPageError extends PageError {
  message = "Internal Page Error";
  code = 500;
}
export class PageNotImplementedError extends PageError {
  message = "Page Not Implemented";
  code = 501;
}
export class AnonymousUserError extends Error {}
