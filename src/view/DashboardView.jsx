import { Outlet } from "react-router-dom";
import Slidebar from "../components/Dashboard/slidebar";

const DashboardView = () => {
  return (
    <>
      <div className="flex w-full">
        <Slidebar />

        <main className="w-full p-4 ">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardView;
