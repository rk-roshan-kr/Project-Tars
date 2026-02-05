import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';

// Lazy load pages
const Landing = lazy(() => import('./pages/Landing'));
const System = lazy(() => import('./pages/System'));
const Mentor = lazy(() => import('./pages/Mentor'));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Landing />
          </PageTransition>
        } />
        <Route path="/system" element={
          <PageTransition>
            <System />
          </PageTransition>
        } />
        <Route path="/mentor" element={
          <PageTransition>
            <Mentor />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <main className="app-container">
        <Suspense fallback={<div className="font-data text-dim" style={{ padding: '2rem', textAlign: 'center' }}>INITIALIZING...</div>}>
          <AnimatedRoutes />
        </Suspense>
      </main>
    </Router>
  );
}

export default App;
