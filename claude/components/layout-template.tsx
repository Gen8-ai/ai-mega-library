import React from 'react';
import { Bell, Search, Menu, User, Home, FileText, Mail, BarChart, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Type Definitions
interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

interface LayoutProps {
  children: React.ReactNode;
}

// Navigation Configuration
const navItems: NavItem[] = [
  { label: 'Dashboard', icon: <Home className="w-4 h-4" />, href: '/' },
  { label: 'Projects', icon: <FileText className="w-4 h-4" />, href: '/projects' },
  { label: 'Messages', icon: <Mail className="w-4 h-4" />, href: '/messages' },
  { label: 'Analytics', icon: <BarChart className="w-4 h-4" />, href: '/analytics' },
  { label: 'Settings', icon: <Settings className="w-4 h-4" />, href: '/settings' },
];

// Header Component
const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => (
  <header className="bg-white shadow-sm fixed top-0 w-full z-50">
    <div className="mx-auto px-4">
      <div className="flex h-16 justify-between items-center">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="text-xl font-semibold">AppName</div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Account Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  </header>
);

// Sidebar Component
const Sidebar = ({ isOpen }: { isOpen: boolean }) => (
  <aside className={`
    fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-sm transition-all duration-300
    ${isOpen ? 'w-64' : 'w-0 lg:w-64'} overflow-hidden
  `}>
    <nav className="p-4 h-full flex flex-col">
      <div className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <Button variant="ghost" className="w-full justify-start gap-3">
                {item.icon}
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex items-center gap-3 px-3">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          <div>
            <div className="font-medium">John Doe</div>
            <div className="text-sm text-gray-500">Admin</div>
          </div>
        </div>
      </div>
    </nav>
  </aside>
);

// Footer Component
const Footer = () => (
  <footer className="bg-white shadow-sm mt-auto">
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-500">
          © 2025 AppName. All rights reserved.
        </div>
        <div className="flex gap-4">
          <Button variant="link" size="sm">Privacy</Button>
          <Button variant="link" size="sm">Terms</Button>
          <Button variant="link" size="sm">Contact</Button>
        </div>
      </div>
    </div>
  </footer>
);

// Main Layout Component
const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="flex pt-16">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;