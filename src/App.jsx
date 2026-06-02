/**
 * Application router: defines all routes and mounts them under the shared Root layout.
 */
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import Game from './pages/Game';
import Cps from './pages/Cps';
import Error from './components/Error';
import Slider from './pages/Slider';

// Top-level component that provides client-side routing for the SPA
function App() {
    // Browser router with nested routes and GitHub Pages base path
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Root />}>
                <Route index element={<Home />} />
                <Route path="cps" element={<Cps />} />
                <Route path="slider" element={<Slider />} />
                <Route path="normal/:level" element={<Game />} />
                <Route path="*" element={<Error />} />
            </Route>
        ),
        { basename: '/speed-clicker' }
    );

    return <RouterProvider router={router} />;
}

export default App;
