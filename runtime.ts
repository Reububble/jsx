import type { Element } from "./types.ts";

function createElement(tag: unknown) {
  if (typeof tag === "string") {
    return document.createElement(tag);
  }
  return (tag as () => HTMLElement)();
}

type CSSStyleStrings = {
  [K in keyof CSSStyleDeclaration]: CSSStyleDeclaration[K] extends string ? never : K;
}[keyof CSSStyleDeclaration];

/** the jsx function */
export function jsx(tag: any, props: any): Element {
  const element = createElement(tag);
  let children = undefined;

  for (const propKey in props) {
    const prop = props[propKey];
    switch (propKey) {
      case "style":
        for (const key in prop) {
          element.style[key as Exclude<keyof CSSStyleDeclaration, CSSStyleStrings>] = prop[key];
        }
        break;
      case "className":
        element.className = String(prop);
        break;
      case "children":
        children = prop;
        break;
      default:
        if (propKey.startsWith("on")) {
          element.addEventListener(propKey.slice(2) as keyof HTMLElementEventMap, prop as any);
          break;
        }
        switch (typeof prop) {
          case "string":
            element.setAttribute(propKey, prop);
            break;
          case "boolean":
            element.toggleAttribute(propKey, prop);
            break;
          case "undefined":
            element.toggleAttribute(propKey, false);
            break;
          default:
            element.setAttribute(propKey, String(prop));
        }
    }
  }

  if (children !== undefined) {
    if (!Array.isArray(children)) {
      children = [children];
    }

    element.replaceChildren(...children);
  }

  return element;
}

export const jsxs = jsx;

export * as JSX from "./types.ts";
