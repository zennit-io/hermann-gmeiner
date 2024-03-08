export type DynamicRoute<Key extends string | number | symbol> = {
  params: { [K in Key]: string };
};
