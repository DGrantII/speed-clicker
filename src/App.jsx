//import './App.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import Game from './pages/Game';
import Cps from './pages/Cps';

function App() {

    // Define the routes for the application
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path=":level" element={<Game />} />
            <Route path="cps" element={<Cps />} />
        </Route>
    ));

    return (
        <RouterProvider router={router} />
    );
}

export default App
