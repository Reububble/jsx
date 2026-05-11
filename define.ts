/**
 * Utilities for defining typed custom elements.
 *
 * @module
 */
/** Constructor type accepted by `define` for a custom element class. */
export type ElementCtor<T extends HTMLElement> = {
  new (...args: any[]): T;
};

/** Built-in element tag names that can be used with the `extends` option. */
export type BuiltInTag = Exclude<keyof HTMLElementTagNameMap, CustomElementTag>;

/** Custom element tag names. A valid custom element name must contain a hyphen. */
export type CustomElementTag = `${string}-${string}`;

/** Compile-time error shown when `define` is called with an invalid tag or base element. */
export type TagError<Message extends string> = { error: Message; valid: never };

/** Options object passed to `define` for a customized built-in element. */
export type ExtendsOptions<
  Tag extends keyof HTMLElementTagNameMap,
  Base extends BuiltInTag,
> = {
  extends: Base extends Tag ? TagError<`${Tag} cannot extend itself`> : Base;
};

/** Selects `Fallback` when `T` resolves to `never`. */
export type Default<T, Fallback> = [T] extends [never] ? Fallback : T;

/** Built-in tag names whose element type matches `T`. */
export type MatchingBuiltIn<T extends HTMLElement> = {
  [K in BuiltInTag]: HTMLElement extends HTMLElementTagNameMap[K] ? never
    : T extends HTMLElementTagNameMap[K] ? K
    : never;
}[BuiltInTag];

/** Matching built-in tag names that are more specific than `Base`. */
export type MoreSpecificBuiltIn<
  T extends HTMLElement,
  Base extends BuiltInTag,
  Match extends BuiltInTag = MatchingBuiltIn<T>,
> = {
  [K in Match]: K extends Base ? never
    : HTMLElementTagNameMap[K] extends HTMLElementTagNameMap[Base] ? HTMLElementTagNameMap[Base] extends HTMLElementTagNameMap[K] ? never : K
    : never;
}[Match];

/** Most-specific built-in tag names matching `T`. */
export type MostSpecificBuiltIn<
  T extends HTMLElement,
  Match extends BuiltInTag = MatchingBuiltIn<T>,
> = {
  [K in Match]: Default<MoreSpecificBuiltIn<T, K, Match>, K>;
}[Match];

/** Optional rest parameter accepted by `define` for a tag. */
export type DefineOptions<
  Tag extends keyof HTMLElementTagNameMap,
  Base extends BuiltInTag = MostSpecificBuiltIn<HTMLElementTagNameMap[Tag]>,
> = Default<
  {
    [K in Base]: [options: ExtendsOptions<Tag & string, K>];
  }[Base],
  []
>;

/**
 * Define a custom element, optionally extending a base element
 * The tag must be added to the global HTMLElementTagNameMap interface
 *
 * To prevent structurally identical elements from being indistinguishable,
 * add branding to the global scope in your package (see readme.md)
 */
export function define<
  Tag extends keyof HTMLElementTagNameMap,
  Base extends BuiltInTag = BuiltInTag,
>(
  tag: Tag,
  ctor: Tag extends CustomElementTag ? ElementCtor<HTMLElementTagNameMap[Base]>
    : TagError<`${Tag} is not a valid custom element tag`>,
  ...rest: DefineOptions<Tag>
): void {
  if (customElements.get(tag)) {
    throw new Error(`Duplicate custom element tag: ${tag}`);
  }

  customElements.define(tag, ctor as unknown as CustomElementConstructor, rest.at(0) as ElementDefinitionOptions);
}
