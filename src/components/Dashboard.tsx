import React, { Dispatch, SetStateAction } from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";

interface DashboardProps {
  setLogin: Dispatch<SetStateAction<boolean>>;
  username: string;
}

const Dashboard: React.FC<DashboardProps> = ({ setLogin, username }) => {
  return (
    <div className="px-20 m-auto bg-purple-50">
      <DashboardHeader setLogin={setLogin} username={username} />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
