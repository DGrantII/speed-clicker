import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import Game from './pages/Game';
import Cps from './pages/Cps';
import Error from './components/Error';


function App() {

    // Define the routes for the application
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="cps" element={<Cps />} />
            <Route path=":level" element={<Game />} />
            <Route path="*" element={<Error />} />
        </Route>
    ),{ basename: '/speed-clicker' } // Set the base path for the application
    );

    return (
        <RouterProvider router={router} />
    );
}

export default App
