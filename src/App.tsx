
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";

// Save the logo URL for global access
export const LOGO_URL = "/lovable-uploads/e310737e-a3e5-4922-869d-209714dbc556.png";

// Lazy load page components
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const AppPage = lazy(() => import("./pages/App"));
const ProposalCreator = lazy(() => import("./pages/ProposalCreator"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center">
      <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
      <p className="text-gray-500">Carregando...</p>
    </div>
  </div>
);

// Create QueryClient with performance optimizations
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    },
  },
});

// Use a route structure to determine which routes need the AppHeader
const routes = [
  { path: '/', element: <Index />, showHeader: false },
  { path: '/login', element: <Login />, showHeader: true, hideAuthButtons: true },
  { path: '/register', element: <Register />, showHeader: true, hideAuthButtons: true },
  { path: '/forgot-password', element: <ForgotPassword />, showHeader: true, hideAuthButtons: true },
  { path: '/app', element: <AppPage />, showHeader: true },
  { path: '/proposal', element: <ProposalCreator />, showHeader: true },
  { path: '*', element: <NotFound />, showHeader: true },
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {routes.map(({ path, element, showHeader, hideAuthButtons }) => (
              <Route
                key={path}
                path={path}
                element={
                  <>
                    {showHeader && (
                      <AppHeader showAuth={!hideAuthButtons} />
                    )}
                    {element}
                  </>
                }
              />
            ))}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
