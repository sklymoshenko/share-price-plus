type ItemHref = "price" | "people" | "configuration";

export interface IBreadcrumb {
  id: number;
  label?: string;
  disabled: boolean;
  href?: ItemHref | "empty";
  icon?: string;
}
