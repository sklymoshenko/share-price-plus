type ItemHref = "price" | "people" | "configuration";

export interface Item {
  id: number;
  label?: string;
  disabled: boolean;
  href?: ItemHref | "empty";
  icon?: string;
}
