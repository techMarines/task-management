import { getEmailVerificationLink } from "#services/authServices";
import { useState, useEffect, useRef } from "react";

export default function EmailVerificationComponent() {
    // status : 'sending', 'sent', or 'error'
    const [status, setStatus] = useState('Sending');
    const [message, setMessage] = useState('sending verification link to your email, please wait...');
    // ref to avoid sending requests twice in strict mode
    const verificationLinkSent = useRef(false);

    useEffect(() => {
        if (verificationLinkSent.current) return;
        // This function will run once when the component mounts
        const getEmailStatus = async () => {
            // in strict mode the second useEffect runs before the async call is finished sending two requests, 
            // thus always place the ref before the async call to avoid running useEffect twice.
            verificationLinkSent.current = true; // change to true to avoid requests after the initial request

            // Make the API call to your backend verification endpoint
            const response = await getEmailVerificationLink();

            if (response.success) {
                setStatus('Sent');
                setMessage('Verification Link sent to your email!');
            } else {
                setStatus('Error');
                setMessage(response.message || "Couldn't send link due to server error.");
            }
        };

        getEmailStatus();
    }, [status]);


    return (
        <div className={`h-full w-full xl:w-1/2 py-8 flex flex-col justify-center items-center text-4xl ${status === "Error" ? "text-red-600" : "text-amber-100"}`}>
            {status}
            <div className="text-2xl px-6">{message}</div>
        </div>
    );
};
