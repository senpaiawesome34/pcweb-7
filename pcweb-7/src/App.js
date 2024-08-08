import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./views/HomePage";
import LoginPage from './views/LoginPage';
import SignUpPage from './views/SignUpPage';
import ScanPage from "./views/ScanPage";
// import StatPage from "./views/StatPage";
// import UpdatePage from "./views/UpdatePage";
import HistoryPage from './views/HistoryPage';

function App() {

  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignUpPage /> },
    { path: "/scan", element: <ScanPage />},
    // { path: "/stat/:id", element: <StatPage />},
    // { path: "/update/:id", element: <UpdatePage />}
    { path: "/history", element: <HistoryPage /> },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;