import React, { Dispatch, SetStateAction } from "react";
import Logo from "./Logo";
import { useQueryClient } from "react-query";

interface Props {
  setLogin: Dispatch<SetStateAction<boolean>>;
  username: string;
}

const DashboardHeader: React.FC<Props> = ({ setLogin, username }) => {
  const queryClient = useQueryClient();
  const userName = localStorage.getItem("username")
    ? localStorage.getItem("username")
    : "";
  const handleLogout = () => {
    localStorage.removeItem("token");
    queryClient.removeQueries("user");
    setLogin(false);
  };

  return (
    <header className="flex items-center justify-between border-b h-20">
      <div>
        <Logo />
      </div>
      <div>
        <ul className="flex items-center space-x-3">
          {/* Display the username here */}
          <li>{(userName && userName.toUpperCase()) || "User"}</li>
          <li>
            <button
              className="bg-slate-200 p-2 rounded-md px-4 hover:bg-slate-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default DashboardHeader;
