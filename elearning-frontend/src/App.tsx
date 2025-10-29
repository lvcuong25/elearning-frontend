import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <AppRouter />
          <Toaster position="top-right" />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;