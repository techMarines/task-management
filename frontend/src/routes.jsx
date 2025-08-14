import AuthPage from "#pages/AuthPages";
import ErrorPage from "#pages/ErrorPage";
import App from "./App";
import ProjectComponent from "#components/homepage/ProjectComponent";
import KanBhanComponent from "#components/homepage/KanbhanComponent";
import TreeViewComponent from "#components/homepage/TreeViewComponent";
import ProfileComponent from "#components/homepage/ProfileComponent";
import * as forms from "#components/forms";
import { PopUpMedium } from "#components/ui/PopUp";

import { loadUserProjects } from "#components/homepage/ProjectComponent";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "project/byUserId/:userId",
                element: <ProjectComponent />,
                loader: loadUserProjects,
                children: [{ path: "create-user-project", element: <PopUpMedium>{<forms.CreateUserProjectForm />}</PopUpMedium> }],
            },
            { path: "kanbhan/:projectId", element: <KanBhanComponent /> },
            { path: "tree-view/:projectId", element: <TreeViewComponent /> },
            {
                path: "profile/:userId",
                element: <ProfileComponent />,
                children: [{ path: "change-display-name", element: <PopUpMedium>{<forms.ChangeDisplayNameForm />}</PopUpMedium> }],
            },
        ],
    },
    {
        path: "auth",
        element: <AuthPage />,
        children: [
            { path: "login", element: <forms.AuthForm /> },
            { path: "register", element: <forms.AuthForm /> },
        ],
    },
];

export default routes;
