import Button from "#components/ui/Button";
import { getUserProjects } from "#services/projectServices";
import { Outlet, useLoaderData } from "react-router";
import { useState } from "react";

export async function loadUserProjects() {
    const response = await getUserProjects();
    return response.data;
}

export default function ProjectsComponenet() {
    const projectsLoaded = useLoaderData();
    const [projects, setProjects] = useState(projectsLoaded);
    const [error, setError] = useState(null);

    return (
        <div className="flex grow-1">
            <section className="h-full w-full">
                <div className="h-16 md:h-36 flex mt-6 sm:mt-0 w-full justify-center items-center border-b-1 border-b-gray-700 py-[2%]">
                    <h1 className="mt-2 sm:mt-0 text-2xl sm:text-4xl md:text-5xl">Your Project's</h1>
                    <Button navigateTo={"create-user-project"} extraClasses="ml-16 md:ml-32" buttonText="Create Project" />
                </div>
                <div className="flex">{projects}</div>
            </section>
            <Outlet context={{ projects: [projects, setProjects], error: [error, setError] }} />
        </div>
    );
}
