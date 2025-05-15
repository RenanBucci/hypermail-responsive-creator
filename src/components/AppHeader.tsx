
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { APP_NAME, LOGO_URL } from "../App";
import { FileText, LayoutTemplate, Settings, LogOut, User, Moon, Sun, Menu, ArrowLeft, HelpCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useThemeStore } from '@/store/themeStore';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface AppHeaderProps {
  showAuth?: boolean;
  showMenu?: boolean;
  backTo?: string;
}

export function AppHeader({ showAuth = false, showMenu = true, backTo }: AppHeaderProps) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { theme, setTheme } = useThemeStore();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { 
      name: "Editor de Email", 
      path: "/app", 
      icon: <LayoutTemplate className="h-4 w-4 mr-2" />,
      description: "Crie emails HTML responsivos com editor visual" 
    },
    { 
      name: "Propostas", 
      path: "/proposal", 
      icon: <FileText className="h-4 w-4 mr-2" />,
      description: "Gere propostas comerciais profissionais" 
    },
    { 
      name: "Tutorial", 
      path: "/tutorial", 
      icon: <HelpCircle className="h-4 w-4 mr-2" />,
      description: "Aprenda a usar todas as ferramentas" 
    },
  ];

  return (
    <header className="bg-white border-b shadow-sm dark:bg-gray-900 dark:border-gray-800 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and desktop navigation */}
          <div className="flex items-center">
            {backTo ? (
              <Button 
                variant="ghost" 
                size="icon" 
                asChild
                className="mr-2"
                title="Voltar"
              >
                <Link to={backTo}>
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
            ) : null}
            
            <Link to="/" className="flex items-center gap-2 mr-8">
              <img src={LOGO_URL} alt={APP_NAME} className="h-8 w-auto" />
              <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400 hidden sm:block">
                {APP_NAME}
              </h1>
            </Link>
            
            {showMenu && !isMobile && (
              <nav className="hidden md:flex space-x-1">
                {navigationItems.map((item) => (
                  <HoverCard key={item.path}>
                    <HoverCardTrigger asChild>
                      <Button
                        variant={isActive(item.path) ? "default" : "ghost"}
                        asChild
                        className={isActive(item.path) ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" : ""}
                        size="sm"
                      >
                        <Link to={item.path} className="flex items-center">
                          {item.icon}
                          {item.name}
                        </Link>
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{item.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
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
              title={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
            
            {/* User menu (if logged in) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
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
                <DropdownMenuItem asChild>
                  <Link to="/tutorial" className="flex items-center">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    <span>Tutorial</span>
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
                className="md:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Menu className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile menu */}
        {showMenu && isMobile && mobileMenuOpen && (
          <nav className="md:hidden py-3 border-t dark:border-gray-800">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className={`flex items-center p-2 rounded-md ${
                      isActive(item.path) 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                      : ''
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
              
              {/* Settings in mobile menu */}
              <li>
                <Link 
                  to="/settings"
                  className="flex items-center p-2 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  <span>Configurações</span>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
