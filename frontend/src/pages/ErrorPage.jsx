import { useNavigate } from "react-router";

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    return (
        <>
            <div className="flex h-screen w-screen flex-col items-center justify-center bg-black text-center">
                <h1 className="px-[1%] font-mono text-2xl sm:translate-y-36 sm:text-4xl">Oh no, this page doesn't exist!</h1>
                <div className="my-[10%] text-[128px] font-bold sm:my-[0%] sm:text-[350px] lg:text-[512px]">404</div>
                <button
                    onClick={handleClick}
                    className="border-b-4 border-b-purple-800 py-3 text-2xl font-extrabold hover:cursor-pointer hover:text-purple-200 sm:-translate-y-24"
                >
                    Back Home
                </button>
            </div>
        </>
    );
};

export default ErrorPage;
