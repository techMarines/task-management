import NavBar from "#components/NavBar";
import { Outlet } from "react-router";

function App() {
    return (
        <div className="flex min-h-screen flex-col bg-gray-900 text-white">
            <NavBar />
            <Outlet />
        </div>
    );
}

export default App;
