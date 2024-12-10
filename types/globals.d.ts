/// <reference types="@emotion/react/types/css-prop" />

type SearchParams<T extends string> = {
  [key in T as key extends `${infer k}[]` ? k : key extends `${infer k}?` ? k : key]: T extends `${string}[]`
    ? string[]
    : T extends `${string}?`
      ? string | undefined
      : string;
};

interface PageProps<T extends string = never, U extends string = never> {
  params: { [k in T]: string };
  searchParams: SearchParams<U>;
}

type LayoutProps<T extends string = void> = Record<T | 'children', ReactNode>;
