import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Statistic from "./pages/Statistic";
import Streams from "./pages/Streams";
import StreamInfoPage from "./pages/StreamInfoPage";
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Statistic />,
    },
    {
        path: '/streams',
        element: <Streams />,
    },
    {
        path: '/stream_info/:streamName',
        element: <StreamInfoPage />,
    },
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
