import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/Home';
import AboutPage from '@/pages/About';
import ContactPage from '@/pages/Contact';
import DisciplineWorkPage from '@/pages/DisciplineWork';
import ProjectDetailPage from '@/pages/ProjectDetail';

const queryClient = new QueryClient();

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col selection:bg-ink selection:text-paper">
      <Header />
      <main className="flex-1 w-full relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Layout>
      <RoutedErrorBoundary>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/work/:discipline/:project" component={ProjectDetailPage} />
          <Route path="/work/:discipline" component={DisciplineWorkPage} />
          <Route component={NotFound} />
        </Switch>
      </RoutedErrorBoundary>
    </Layout>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;