import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
// import Root from "./routes/root.tsx";
// import { ErrorPage } from "./routes/error.tsx";

// import { root_loader, list_loader } from "./loaders.ts";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Root />,
//         errorElement: <ErrorPage />,
//         loader: root_loader,
//         children: [
//             {
//                 path: "/list/:id",
//                 element: <Root />,
//                 errorElement: <ErrorPage />,
//                 loader: list_loader
//             }
//         ],
//     },
// ]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        {/* <RouterProvider router={router} /> */}
        <App />
    </React.StrictMode>
);
