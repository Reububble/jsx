/**
 * JSX namespace types used by this runtime.
 *
 * @module
 */
/** JSX props for every tag in `HTMLElementTagNameMap`. */
export type IntrinsicElements = {
  [Tag in keyof HTMLElementTagNameMap]:
    & {
      style?: Partial<CSSStyleDeclaration & { [k: `--${string}`]: string }>;
      className?: string;
      classList?: string[] | DOMTokenList;
      tabindex?: string;
      children?: Child | readonly Child[];
    }
    & {
      [
        Prop in {
          [K in keyof HTMLElementTagNameMap[Tag]]: K extends `on${string}` ? K
            : HTMLElementTagNameMap[Tag][K] extends string | number | boolean ? K
            : never;
        }[keyof HTMLElementTagNameMap[Tag]]
      ]?: HTMLElementTagNameMap[Tag][Prop];
    }
    & {
      [Prop in `data-${string}`]: any;
    };
};

/** Constructor return type accepted by JSX component classes. */
export type ElementClass = HTMLElementTagNameMap[keyof HTMLElementTagNameMap] extends { new (props: any): infer C extends HTMLElement } ? C : never;

/** Element values returned by this JSX runtime. */
export type Element = InstanceType<typeof Element>;

/** Runtime constructor used for `instanceof` checks against JSX elements. */
export const Element: typeof HTMLElement = HTMLElement;

/** Child value accepted by JSX elements. */
export type Child = string | Element;
