export interface MenuItem {
  label: string;
  route?: string;
  href?: string;
}

export interface Menu {
  label: string;
  items?: MenuItem[];
  route?: string;
}
