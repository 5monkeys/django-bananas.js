declare module "swagger-client";

export type LogoType = boolean | string | React.ElementType;
export type PageComponent<T = any> = React.ComponentType<{ data: T }>;
