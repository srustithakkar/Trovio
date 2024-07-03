import React from "react";
import Logo from "./Logo";

/**
 * TODO:
 *
 * 1. Display Username
 * - Extract the user name from the userContext and dynamically display the username in the header by replacing the placeholder "UserName"
 *
 * 2. Implement Logout Functionality
 * - Define a logout function that clears the user context and redirects the user to the login page.
 */

const DashboardHeader = () => {
    const handleLogout = () => {
        //TODO: handle logout
    };
    return (
        <header className="flex  items-center justify-between border-b h-20">
            <div>
                <Logo />
            </div>
            <div>
                <ul className="flex items-center space-x-3">
                    {/* Display the username here */}
                    <li>UserName</li>
                    <li>
                        <button className="bg-slate-200 p-2 rounded-md px-4 hover:bg-slate-300">
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default DashboardHeader;
