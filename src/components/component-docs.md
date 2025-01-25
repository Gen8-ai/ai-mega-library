# Component Documentation

## Layout Components

### Header
```typescript
interface HeaderProps {
  title: string;
  showNav?: boolean;
  onMenuClick?: () => void;
}
```
Purpose: Main navigation and branding component
Location: `src/components/layout/Header.tsx`

### Footer
```typescript
interface FooterProps {
  links: Array<{ text: string; href: string }>;
  showSocial?: boolean;
}
```
Purpose: Site-wide footer information
Location: `src/components/layout/Footer.tsx`

## Sidebar Components

### Navigation
```typescript
interface NavProps {
  items: NavItem[];
  activeItem?: string;
  onItemSelect: (item: string) => void;
}
```
Purpose: Main navigation menu
Location: `src/components/sidebar/Nav.tsx`

### Menu
```typescript
interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

interface MenuProps {
  items: MenuItem[];
  expanded?: boolean;
}
```
Purpose: Expandable menu items
Location: `src/components/sidebar/Menu.tsx`

## Content Components

### Grid
```typescript
interface GridProps<T> {
  data: T[];
  columns: Column[];
  onRowClick?: (item: T) => void;
  sortable?: boolean;
}
```
Purpose: Data display and management
Location: `src/components/content/Grid.tsx`

### Charts
```typescript
interface ChartProps {
  data: DataPoint[];
  type: 'line' | 'bar' | 'pie';
  options?: ChartOptions;
}
```
Purpose: Data visualization
Location: `src/components/content/Charts.tsx`

## Best Practices

### Component Structure
```typescript
// Component template
import React from 'react';

interface ComponentProps {
  // Props interface
}

export const Component: React.FC<ComponentProps> = ({
  // Destructured props
}) => {
  // Component logic
  return (
    // JSX
  );
};
```

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow component-specific styling
- Maintain consistent spacing
- Use semantic class names

### Type Safety
- Define interfaces for all props
- Use TypeScript strict mode
- Document complex types
- Avoid any type

### Testing
- Write unit tests for components
- Test edge cases
- Mock complex dependencies
- Maintain high coverage