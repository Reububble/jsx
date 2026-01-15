type ElementCtor<T extends HTMLElement> = {
  new (...args: any[]): T;
};

type BuiltInTag = Exclude<keyof HTMLElementTagNameMap, CustomElementTag>;

type CustomElementTag = `${string}-${string}`;

type TagError<Message extends string> = { error: Message; valid: never };

type ExtendsOptions<
  Tag extends keyof HTMLElementTagNameMap,
  Base extends BuiltInTag,
> = {
  extends: Base extends Tag ? TagError<`${Tag} cannot extend itself`> : Base;
};

type Default<T, Default> = T extends never ? Default : T;

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
  ...rest: Default<
    {
      [K in BuiltInTag]: HTMLElement extends HTMLElementTagNameMap[K] ? never
        : HTMLElementTagNameMap[Tag] extends HTMLElementTagNameMap[K] ? [options: ExtendsOptions<Tag & string, K>]
        : never;
    }[BuiltInTag],
    []
  >
): void {
  if (customElements.get(tag)) {
    throw new Error(`Duplicate custom element tag: ${tag}`);
  }

  customElements.define(tag, ctor as unknown as CustomElementConstructor, rest.at(0) as ElementDefinitionOptions);
}

type A = { [K in "a"]: K extends "b" ? 1 : never }["a"] extends never ? true : false;
