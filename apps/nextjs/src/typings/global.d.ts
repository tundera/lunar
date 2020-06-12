declare module '*.scss' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.css' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.graphql';
declare module '*.gql';

// types/mdx.d.ts
declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
}