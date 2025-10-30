import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AntdThemeProvider } from './contexts/AntdThemeProvider';
import AppRouter from './routes/AppRouter';

// Tạo QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AntdThemeProvider>
            <AuthProvider>
              <Router>
                <AppRouter />
                <Toaster position="top-right" />
              </Router>
            </AuthProvider>
          </AntdThemeProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;