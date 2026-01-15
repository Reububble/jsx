import { Element } from "./types.ts";

function createElement(tag: unknown) {
  if (typeof tag === "string") {
    return document.createElement(tag);
  } else if (typeof tag === "function") {
    const ret = tag();
    if (!(ret instanceof Element)) {
      throw new Error("Function didn't return Element type");
    }
    return ret;
  }
  throw new Error("tag cannot create an Element");
}

type CSSStyleStrings = {
  [K in keyof CSSStyleDeclaration]: CSSStyleDeclaration[K] extends string ? never : K;
}[keyof CSSStyleDeclaration];

/** the dev version of the jsx function */
export function jsxDEV(
  tag: unknown,
  props: unknown,
  _key: unknown,
  _isStaticChildren: boolean,
  _file: {
    fileName: string;
    lineNumber: number;
    columnNumber: number;
  } | null,
): Element {
  const element = createElement(tag);
  const children = new Array<string | Element>();

  if (props !== undefined && typeof props !== "object") {
    throw new Error("props is not an object");
  }

  for (const propKey in props) {
    const prop = (props as { [k: string]: unknown })[propKey];
    switch (propKey) {
      case "style":
        if (typeof prop !== "object") {
          throw new Error("style is not an object");
        }
        for (const key in prop) {
          const value = (prop as { [k: typeof key]: unknown })[key];
          if (typeof value !== "string") {
            throw new Error("style value is not a string");
          }
          element.style[key as Exclude<keyof CSSStyleDeclaration, CSSStyleStrings>] = value;
        }
        break;
      case "className":
        element.className = String(prop);
        break;
      case "children":
        if (Array.isArray(prop)) {
          if (!prop.every((child): child is string | Element => typeof child === "string" || child instanceof Element)) {
            throw new Error("Not every child is string or element");
          }
          children.push(...prop);
        } else {
          if (typeof prop !== "string" && !(prop instanceof Element)) {
            throw new Error("Child is not string or element");
          }
          children.push(prop);
        }
        break;
      default:
        if (
          propKey.startsWith("on") && (typeof prop === "function" ||
            typeof prop === "object" && prop !== null && "handleEvent" in prop && typeof prop["handleEvent"] === "function")
        ) {
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

  element.replaceChildren(...children);

  return element;
}

export const jsx = jsxDEV;
export const jsxs = jsxDEV;

export * as JSX from "./types.ts";
