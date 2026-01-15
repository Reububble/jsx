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
            : string extends HTMLElementTagNameMap[Tag][K] ? K
            : number extends HTMLElementTagNameMap[Tag][K] ? K
            : boolean extends HTMLElementTagNameMap[Tag][K] ? K
            : never;
        }[keyof HTMLElementTagNameMap[Tag]]
      ]?: HTMLElementTagNameMap[Tag][Prop];
    }
    & {
      [Prop in `data-${string}`]: any;
    };
};

export type ElementClass = HTMLElementTagNameMap[keyof HTMLElementTagNameMap] extends { new (props: any): infer C extends HTMLElement } ? C : never;

export type Element = InstanceType<typeof Element>;
export const Element = HTMLElement;

type Child = string | Element;
