# @reububble/jsx

A small DOM JSX runtime for TypeScript.

## Setup

Install the package from JSR:

```sh
deno add jsr:@reububble/jsx
```

Configure JSX in your `deno.jsonc` or `tsconfig.json` under `compilerOptions`:

```jsonc
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@reububble/jsx",
    "lib": ["dom", "dom.iterable", "esnext"]
  }
}
```

## Usage

```tsx
const button = (
  <button
    className="primary"
    onClick={() => console.log("clicked")}
    style={{ color: "white" }}
  >
    Click me
  </button>
);

document.body.append(button);
```

Use `define` to register custom elements:

```tsx
import { define } from "@reububble/jsx";

class MenuButton extends HTMLElement {
  connectedCallback() {
    this.replaceChildren(<button>Menu</button>);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "menu-button": MenuButton;
  }
}

define("menu-button", MenuButton);

document.body.append(<menu-button></menu-button>);
```

## Custom Elements

To prevent structurally identical elements from being indistinguishable to the define function, add branding to the global scope in your package:

```ts
declare const tag: unique symbol;

declare global {
  interface HTMLHeadingElement {
    [tag]: "h1";
  }
  interface HTMLAnchorElement {
    [tag]: "a";
  }
  interface HTMLAreaElement {
    [tag]: "area";
  }
  interface HTMLAudioElement {
    [tag]: "audio";
  }
  interface HTMLBaseElement {
    [tag]: "base";
  }
  interface HTMLBodyElement {
    [tag]: "body";
  }
  interface HTMLBRElement {
    [tag]: "br";
  }
  interface HTMLButtonElement {
    [tag]: "button";
  }
  interface HTMLCanvasElement {
    [tag]: "canvas";
  }
  interface HTMLTableCaptionElement {
    [tag]: "caption";
  }
  interface HTMLTableColElement {
    [tag]: "col";
  }
  interface HTMLDataElement {
    [tag]: "data";
  }
  interface HTMLDataListElement {
    [tag]: "datalist";
  }
  interface HTMLModElement {
    [tag]: "del";
  }
  interface HTMLDetailsElement {
    [tag]: "details";
  }
  interface HTMLDialogElement {
    [tag]: "dialog";
  }
  interface HTMLDivElement {
    [tag]: "div";
  }
  interface HTMLDListElement {
    [tag]: "dl";
  }
  interface HTMLEmbedElement {
    [tag]: "embed";
  }
  interface HTMLFieldSetElement {
    [tag]: "fieldset";
  }
  interface HTMLFormElement {
    [tag]: "form";
  }
  interface HTMLHeadingElement {
    [tag]: "h1";
  }
  interface HTMLHeadElement {
    [tag]: "head";
  }
  interface HTMLHRElement {
    [tag]: "hr";
  }
  interface HTMLHtmlElement {
    [tag]: "html";
  }
  interface HTMLIFrameElement {
    [tag]: "iframe";
  }
  interface HTMLImageElement {
    [tag]: "img";
  }
  interface HTMLInputElement {
    [tag]: "input";
  }
  interface HTMLLabelElement {
    [tag]: "label";
  }
  interface HTMLLegendElement {
    [tag]: "legend";
  }
  interface HTMLLIElement {
    [tag]: "li";
  }
  interface HTMLLinkElement {
    [tag]: "link";
  }
  interface HTMLMapElement {
    [tag]: "map";
  }
  interface HTMLMenuElement {
    [tag]: "menu";
  }
  interface HTMLMetaElement {
    [tag]: "meta";
  }
  interface HTMLMeterElement {
    [tag]: "meter";
  }
  interface HTMLObjectElement {
    [tag]: "object";
  }
  interface HTMLOListElement {
    [tag]: "ol";
  }
  interface HTMLOptGroupElement {
    [tag]: "optgroup";
  }
  interface HTMLOptionElement {
    [tag]: "option";
  }
  interface HTMLOutputElement {
    [tag]: "output";
  }
  interface HTMLParagraphElement {
    [tag]: "p";
  }
  interface HTMLPictureElement {
    [tag]: "picture";
  }
  interface HTMLPreElement {
    [tag]: "pre";
  }
  interface HTMLProgressElement {
    [tag]: "progress";
  }
  interface HTMLQuoteElement {
    [tag]: "q";
  }
  interface HTMLScriptElement {
    [tag]: "script";
  }
  interface HTMLSelectElement {
    [tag]: "select";
  }
  interface HTMLSlotElement {
    [tag]: "slot";
  }
  interface HTMLSourceElement {
    [tag]: "source";
  }
  interface HTMLSpanElement {
    [tag]: "span";
  }
  interface HTMLStyleElement {
    [tag]: "style";
  }
  interface HTMLTableElement {
    [tag]: "table";
  }
  interface HTMLTableSectionElement {
    [tag]: "tbody";
  }
  interface HTMLTableCellElement {
    [tag]: "td";
  }
  interface HTMLTemplateElement {
    [tag]: "template";
  }
  interface HTMLTextAreaElement {
    [tag]: "textarea";
  }
  interface HTMLTimeElement {
    [tag]: "time";
  }
  interface HTMLTitleElement {
    [tag]: "title";
  }
  interface HTMLTableRowElement {
    [tag]: "tr";
  }
  interface HTMLTrackElement {
    [tag]: "track";
  }
  interface HTMLUListElement {
    [tag]: "ul";
  }
  interface HTMLVideoElement {
    [tag]: "video";
  }
}
```
