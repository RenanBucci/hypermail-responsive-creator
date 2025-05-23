
import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { useThemeStore } from "@/store/themeStore";

// Salva a URL do logo para acesso global
export const LOGO_URL = "/lovable-uploads/e310737e-a3e5-4922-869d-209714dbc556.png";
export const APP_NAME = "ContentForge Pro";

// Lazy load dos componentes de página
const Welcome = lazy(() => import("./pages/Welcome"));
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const AppPage = lazy(() => import("./pages/App"));
const ProposalCreator = lazy(() => import("./pages/ProposalCreator"));
const Settings = lazy(() => import("./pages/Settings"));
const Tutorial = lazy(() => import("./pages/Tutorial"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Fallback de carregamento
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center">
      <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
      <p className="text-gray-500">Carregando...</p>
    </div>
  </div>
);

// Cria QueryClient com otimizações de desempenho
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutos
      retry: 1,
      gcTime: 10 * 60 * 1000, // 10 minutos (formerly cacheTime)
    },
  },
});

// Usa uma estrutura de rotas para determinar quais rotas precisam do AppHeader
const routes = [
  { path: '/welcome', element: <Welcome />, showHeader: false },
  { path: '/', element: <Index />, showHeader: false },
  { path: '/login', element: <Login />, showHeader: true, hideAuthButtons: true },
  { path: '/register', element: <Register />, showHeader: true, hideAuthButtons: true },
  { path: '/forgot-password', element: <ForgotPassword />, showHeader: true, hideAuthButtons: true },
  { path: '/app', element: <AppPage />, showHeader: false, backTo: "/" },
  { path: '/proposal', element: <ProposalCreator />, showHeader: false, backTo: "/" },
  { path: '/settings', element: <Settings />, showHeader: false },
  { path: '/tutorial', element: <Tutorial />, showHeader: true, backTo: "/" },
  { path: '*', element: <NotFound />, showHeader: true },
];

const App = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Apply theme to the document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className={theme === 'dark' ? 'dark' : ''}>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {routes.map(({ path, element, showHeader, hideAuthButtons, backTo }) => (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <>
                        {showHeader && (
                          <AppHeader showAuth={!hideAuthButtons} backTo={backTo} />
                        )}
                        {element}
                      </>
                    }
                  />
                ))}
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
