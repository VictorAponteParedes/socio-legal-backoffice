// src/components/AppDrawer/types.ts

export interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface AppDrawerProps {
  children: React.ReactNode;
}

export interface DrawerSidebarProps {
  isOpen: boolean;
  navSections: NavSection[];
  activePath: string;
  onNavigate: (path: string) => void;
  onClose: () => void;
}

export interface DrawerHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

export interface DrawerNavItemProps {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}

export interface DrawerOverlayProps {
  isOpen: boolean;
  onClick: () => void;
}
