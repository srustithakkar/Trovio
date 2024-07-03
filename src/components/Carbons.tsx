import DashboardHeader from "./DashboardHeader";

/**
 * TODO:
 *
 * 1. Initialize the component:
 *    a. On component mount, asynchronously fetch carbon credits data from the provided API endpoint.
 *    b. Store the fetched project data in a React context for global state management, ensuring data can be accessed by any component in the application.
 *    c. Render the carbon credits dynamically based on the number of carbon credits returned by the API. Use the NormalCard component to display each carbon credits by default.
 *
 * 2. Implement view toggling functionality:
 *    a. Add a toggle button to the UI that allows users to switch between two views: Normal and Compact (Already implemented in the snippet).
 *    b. Define state to keep track of the current view mode (Normal or Compact).
 *    c. Implement event handlers to update the view mode state when the button is clicked.
 *    d. Conditionally render the carbon credits cards using either the NormalCard or CompactCard component based on the current view mode.
 *
 */

const Carbons = () => {
    return (
        <section className="max-w-screen-xl m-auto">
            <DashboardHeader />
            <div className="flex items-center justify-between my-5">
                <h1 className="text-2xl font-bold">List of Carbon credits</h1>
                <ul className="flex space-x-2">
                    <li>
                        <button className="bg-slate-200 p-2 rounded-md px-4 hover:bg-slate-300">
                            Normal
                        </button>
                    </li>
                    <li>
                        <button className="bg-slate-200 p-2 rounded-md px-4 hover:bg-slate-300">
                            Compact
                        </button>
                    </li>
                </ul>
            </div>

            <main className="">
                <div className="grid grid-cols-3 gap-5 my-5">
                    <NormalCard />
                    <NormalCard />
                    <NormalCard />
                </div>

                <div className="grid grid-cols-2 gap-5 my-5">
                    <CompactCard />
                    <CompactCard />
                    <CompactCard />
                </div>
            </main>
        </section>
    );
};

const NormalCard = () => {
    return (
        <div className="min-w-[350px] border rounded-md p-5 space-y-1">
            <h2 className="text-xl font-bold">Name</h2>
            <p className="text-base">lorem lipsum </p>
            <div className="h-[200px] bg-gray-200 flex items-center justify-center rounded">
                <span className="opacity-20"> Img Placeholder</span>
            </div>
            <div className="flex justify-between text-sm">
                <span>By John Doe</span>
                <span>2021-09-01</span>
            </div>
        </div>
    );
};

const CompactCard = () => {
    return (
        <div className="border rounded-md p-3 flex justify-between">
            <div>
                <h2 className="text-xl font-bold">Name</h2>
                <p className="text-base">lorem lipsum </p>
            </div>
            <div className="flex flex-col text-sm">
                <span>By John Doe</span>
                <span>2021-09-01</span>
            </div>
        </div>
    );
};

export default Carbons;
