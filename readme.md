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

### Custom Elements

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

If you define customized built-in elements, you can add type-only branding for the DOM interfaces that TypeScript represents structurally. This gives `define`
stricter checking for built-in local names:

```ts
declare const tag: unique symbol;

declare global {
  interface HTMLTableCaptionElement {
    readonly [tag]: "caption";
  }

  interface HTMLDivElement {
    readonly [tag]: "div";
  }

  interface HTMLHeadingElement {
    readonly [tag]: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  }

  interface HTMLParagraphElement {
    readonly [tag]: "p";
  }

  interface HTMLDListElement {
    readonly [tag]: "dl";
  }

  interface HTMLMenuElement {
    readonly [tag]: "menu";
  }

  interface HTMLHeadElement {
    readonly [tag]: "head";
  }

  interface HTMLPictureElement {
    readonly [tag]: "picture";
  }

  interface HTMLSpanElement {
    readonly [tag]: "span";
  }
}
```
