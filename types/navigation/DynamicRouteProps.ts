export type DynamicRouteProps<Key extends string | number | symbol> = {
  params: { [K in Key]: string };
};
