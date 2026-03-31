import { createBrowserRouter } from "react-router-dom";
import App from "./App"; // Home page
import Register from "./components/Accontpages/register";
import Signin from "./components/Accontpages/signin";
import AuthGuard from "./store/Auth";
import DashboardView from "./view/DashboardView";
import ViewdetailDash from "./components/Dashboard/ViewDetailDash";
import TableView from "./components/Dashboard/TableView";
import InsertStore from "./components/Dashboard/InsertStore";
import UpdateStore from "./components/Dashboard/UpdateStore";
import AboutUs from "./components/Dashboard/AboutUs";
import Contact from "./components/Dashboard/contact";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <App />
      </AuthGuard>
    ),
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/about",
    element: (
      <AuthGuard>
        <AboutUs />
      </AuthGuard>
    ),
  },
  {
    path: "/contact",
    element: (
      <AuthGuard>
        <Contact />
      </AuthGuard>
    ),
  },
  {
    path: "/shop",
    element: (
      <AuthGuard>
        <Shop />
      </AuthGuard>
    ),
  },
  {
    path: "/checkout",
    element: (
      <AuthGuard>
        <Checkout />
      </AuthGuard>
    ),
  },
  {
    path: "/DashboardView",
    element: (
      <AuthGuard>
        <DashboardView />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <ViewdetailDash />,
      },
      {
        path: "tableview",
        element: <TableView />,
      },
      {
        path: "insertStore",
        element: <InsertStore />,
      },
      {
        path: "UpdateStore",
        element: <UpdateStore />,
      },
    ],
  },
]);
