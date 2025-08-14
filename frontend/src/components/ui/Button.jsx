import { Link, useNavigate } from "react-router";

export default function Button(props) {
    const navigate = useNavigate();

    return (
        <button
            type={props.type}
            onClick={() => navigate(props.navigateTo)}
            className={`flex items-center h-16 justify-center border-2 border-purple-500 px-4 py-2 md:px-8 md:py-4 
                        text-lg font-bold rounded-full hover:cursor-pointer hover:bg-gradient-to-r 
                        from-purple-600 via-purple-500 to-red-400` + " " + props.extraClasses}
        >
            {props.buttonText}
        </button>
    );
};
