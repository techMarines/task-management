import { Outlet, useLoaderData } from "react-router";
import NavButton from "#components/ui/NavButton";
import { useState } from "react";
import { getUserDetails } from "#services/profileServices";

const numberOfProjects = 0;

export async function loader() {
    const response = await getUserDetails();
    return response.data;
}

export function getUserDisplayNameComponent(user) {
    return (
        <div className="flex w-full grow-1 items-center border-b-2 border-b-gray-800 pl-10 text-3xl">
            <div className="w-7/12">Display Name: {user.displayName}</div>
            <div className="flex w-5/12 justify-end">
                <NavButton
                    navigateTo="change-display-name"
                    buttonText="Change Display Name"
                    extraClasses="mr-14"
                />
            </div>
        </div>
    )
}

export function getUserVerificationComponent(user) {
    return (
        <div className="flex w-full grow-1 items-center border-b-2 border-b-gray-800 pl-10 text-3xl">
            <div className={`w-7/12 ${user.isVerified ? "" : "text-red-500"}`}>
                {user.isVerified ? "Your email is verified" : "Your email is not verified"}
            </div>
            {
                user.isVerified ? "" : <div className="flex w-5/12 justify-end" >
                    <NavButton
                        navigateTo="/auth/get-email-verification-link/me"
                        buttonText="Send Verification Link"
                        extraClasses="mr-14"
                    />
                </div>
            }
        </div >
    )
}

export default function ProfileComponent() {
    const user = useLoaderData();
    const [error, setError] = useState(null);

    return (
        <div className='flex h-full'>
            <section className={"flex w-full flex-col content-baseline justify-evenly"}>
                {getUserDisplayNameComponent(user)}
                {getUserVerificationComponent(user)}
                <div className="flex grow-1 items-center justify-baseline border-b-2 border-b-gray-800 pl-10 text-3xl">
                    Number of Projects Owned: {numberOfProjects}
                </div>
                <div className="flex grow-1 items-center border-b-2 border-b-gray-800 pl-10 text-3xl">
                    Number of Projects Member in: {numberOfProjects}
                </div>
                <div className="flex grow-1 items-center pl-10 text-3xl">Total Number of Projects: {numberOfProjects}</div>
            </section>
            <Outlet context={{ error: [error, setError] }} />
        </div>
    );
}
