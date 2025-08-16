import { Outlet, redirect, useLoaderData } from 'react-router';
import { getUserDetails } from '#services/profileServices';

// This loader function runs BEFORE any child route tries to render
export async function loader() {
    try {
        const response = await getUserDetails();
        const user = response.data;

        // If the user is not verified, redirect them to their profile page
        if (!user.isVerified) {
            return redirect(`/profile/${user.id}`);
        }

        // If verified, return the user data and allow access
        return user;
    } catch (error) {
        // If there's any error (e.g., no token), redirect to login
        return redirect('/auth/login');
    }
}

export default function ProtectedLayout() {
    const user = useLoaderData();
    // This just renders the child route (e.g., ProjectComponent)
    return <Outlet context={user} />;
}
