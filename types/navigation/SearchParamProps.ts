export type SearchParamProps<Keys extends string[]> = {
  searchParams: { [key in Keys[number]]: string | string[] | undefined };
};
