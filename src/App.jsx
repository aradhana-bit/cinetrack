import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Loader from './components/Loader/Loader';
import './styles/global.css';

const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Discover = lazy(() => import('./pages/Discover/Discover'));
const Watchlist = lazy(() => import('./pages/Watchlist/Watchlist'));
const AddToWatchlist = lazy(() => import('./pages/AddToWatchlist/AddToWatchlist'));

function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <Suspense fallback={<Loader message="Loading page..." />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/add" element={<AddToWatchlist />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </Provider>
  );
}
