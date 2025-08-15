import NavButton from "#components/ui/NavButton";
import { useOutletContext } from "react-router";

export function PopUpMedium({ children }) {
    const [error, setError] = useOutletContext().error;

    return (
        <div className="100 absolute flex flex-col items-center h-10/12 w-full lg:w-2/3 xl:w-1/2 lg:translate-x-[25%] xl:translate-x-[50%] rounded-2xl border-2 border-purple-300 bg-gray-800">
            <NavButton type="button" navigateTo={-1} buttonText="X" extraClasses="mt-[8px] mr-[8px] w-[30px] self-end" />
            <div className="text-md text-red-500">{error}</div>
            {children}
        </div>
    );
}
