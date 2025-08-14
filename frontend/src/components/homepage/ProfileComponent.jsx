import { Outlet } from "react-router";
import Button from "#components/ui/Button";
import { useState } from "react";

const numberOfProjects = 0;

export default function ProfileComponent() {
    const [displayName, setDisplayName] = useState(localStorage.getItem("displayName"));
    const [error, setError] = useState(null);

    return (
        <div className='flex grow-1'>
            <section className={"flex w-full flex-col content-baseline justify-evenly"}>
                <div className="flex w-full grow-1 items-center border-b-2 border-b-gray-800 pl-10 text-3xl">
                    <div className="w-7/12">Display Name:{displayName}</div>
                    <div className="flex w-5/12 justify-end">
                        <Button
                            navigateTo="change-display-name"
                            buttonText="Change Display Name"
                            extraClasses="mr-14"
                        />
                    </div>
                </div>
                <div className="flex grow-1 items-center justify-baseline border-b-2 border-b-gray-800 pl-10 text-3xl">
                    Number of Projects Owned: {numberOfProjects}
                </div>
                <div className="flex grow-1 items-center border-b-2 border-b-gray-800 pl-10 text-3xl">
                    Number of Projects Member in: {numberOfProjects}
                </div>
                <div className="flex grow-1 items-center pl-10 text-3xl">Total Number of Projects: {numberOfProjects}</div>
            </section>
            <Outlet context={{ displayName: [displayName, setDisplayName], error: [error, setError] }} />
        </div>
    );
}
