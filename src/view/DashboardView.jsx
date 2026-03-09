
import { Outlet } from "react-router-dom";
import Slidebar from "../components/Dashboard/slidebar";
import Header from "../components/Header/Header";
import Footer from "../components/Header/Footer";

const DashboardView = () => {
  return (
    <>
      <div className="flex w-full">
          <Slidebar />

        <main className="w-full p-4 ">
            <Outlet/>
        </main>
      </div>
        <Footer/>
    </>
  );
};

export default DashboardView;
