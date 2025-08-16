import { useState } from "react";
import authPhoto from "#assets/placeholderAuthImg.png";
import { Outlet, useLocation } from "react-router";

export default function AuthPage() {
    const location = useLocation();
    const isAuthForEmail = location.pathname.split("/")[2] === "get-email-verification-link";
    const [error, setError] = useState(null);
    const [input, setInput] = useState({
        username: "",
        password: "",
        rememberMe: false,
    });

    // email verification auth
    if (isAuthForEmail) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-gray-950 font-bold">
                <div className="flex flex-col items-center xl:flex-row h-6/12 w-11/12 overflow-hidden bg-gray-800 xl:h-[75%] xl:w-[75%]">
                    {/* image */}
                    <div className={`hidden xl:block h-full w-1/2 p-[1%]`}>
                        <img src={authPhoto} alt="auth visual" className="h-full w-full rounded-2xl object-cover" />
                    </div>

                    {/*Message*/}
                    <Outlet />
                </div>
            </div>
        )
    }
    // if normal login/register auth
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-950 font-bold">
            <div className="flex h-full w-full overflow-hidden bg-gray-800 sm:h-[75%] sm:w-[90%] md:w-[85%] md:rounded-2xl lg:w-[75%]">
                {/* image */}
                <div className={`hidden h-full w-1/2 p-[1%] xl:block`}>
                    <img src={authPhoto} alt="auth visual" className="h-full w-full rounded-2xl object-cover" />
                </div>

                {/* form */}
                <Outlet context={{ input: [input, setInput], error: [error, setError] }} />
            </div>
        </div>
    )
};
