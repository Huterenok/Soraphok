interface moduleIScss {
  [index: string]: string;
}

declare module "*.scss" {
  // eslint-disable-next-line import/no-anonymous-default-export
  export default moduleIScss;
}
