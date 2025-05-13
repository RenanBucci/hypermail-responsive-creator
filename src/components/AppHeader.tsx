
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOGO_URL } from "../App";
import { FileText, LayoutTemplate, ChevronDown, Settings, LogOut, User, Moon, Sun, Menu } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-mobile';

interface AppHeaderProps {
  showAuth?: boolean;
  showMenu?: boolean;
}

export function AppHeader({ showAuth = true, showMenu = true }: AppHeaderProps) {
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    // In a real implementation, this would update the theme in localStorage or context
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { name: "Home", path: "/", icon: null },
    { name: "Email Builder", path: "/app", icon: <LayoutTemplate className="h-4 w-4 mr-2" /> },
    { name: "Propostas", path: "/proposal", icon: <FileText className="h-4 w-4 mr-2" /> },
  ];

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and desktop navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 mr-8">
              <img src={LOGO_URL} alt="HyperMail" className="h-8 w-auto" />
              <h1 className="text-xl font-bold text-blue-600 hidden sm:block">HyperMail</h1>
            </Link>
            
            {showMenu && !isMobile && (
              <nav className="hidden md:flex space-x-1">
                {navigationItems.map((item) => (
                  <Button
                    key={item.path}
                    variant={isActive(item.path) ? "default" : "ghost"}
                    asChild
                    className={isActive(item.path) ? "bg-blue-50 text-blue-700" : ""}
                    size="sm"
                  >
                    <Link to={item.path} className="flex items-center">
                      {item.icon}
                      {item.name}
                    </Link>
                  </Button>
                ))}
              </nav>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
            
            {/* Authentication buttons */}
            {showAuth && (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="outline" asChild size="sm">
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/register">Registrar</Link>
                </Button>
              </div>
            )}
            
            {/* User menu (if logged in) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>Perfil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    <span>Configurações</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Mobile menu button */}
            {showMenu && isMobile && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden"
              >
                <Menu className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile menu */}
        {showMenu && isMobile && mobileMenuOpen && (
          <nav className="md:hidden py-3 border-t">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className={`flex items-center p-2 rounded-md ${isActive(item.path) ? 'bg-blue-50 text-blue-700' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Authentication buttons on mobile */}
            {showAuth && (
              <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-2">
                <Button variant="outline" asChild size="sm">
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/register">Registrar</Link>
                </Button>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
