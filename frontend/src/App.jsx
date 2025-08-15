import NavBar from "#components/NavBar";
import { Outlet } from "react-router";
import { getUserDetails } from "#services/profileServices";

function App() {
    return (
        <div className="h-screen flex flex-col bg-gray-900 text-white">
            <NavBar />
            {/* This main element will grow to fill the remaining space */}
            <main className="grow overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}

export default App;
