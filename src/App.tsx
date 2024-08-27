import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import { Provider } from "react-redux";
import {store} from "./api/store";
import { Toaster } from "react-hot-toast";
import JobDetails from "./components/JobDetails/JobDetails";
import SkillDetails from "./components/SkillDetails/SkillDetails";
import Search from "./components/Search/Search";
let router = createBrowserRouter([
    {
        path: "",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/jobs",
                element: <Home />,
            },
            {
                path: "/job/:id",
                element: <JobDetails />,
            },
            {
                path: "/skill/:id",
                element: <SkillDetails />,
            },
            {
                path: "/jobs/search",
                element: <Search />,
            },
        ],
    },
]);
function App() {
    return (
        <>
            <Provider store={store}>
                <RouterProvider router={router} />
                <Toaster />
            </Provider>
        </>
    );
}

export default App;
