import { useState, useEffect } from 'react';
import { useSearchParams, Link} from 'react-router-dom';


function AuthenticationPage() {
    const [isSignIn, setIsSignIn] = useState<boolean>(true);
    const [isSignInButtonHidden, setIsSignInButtonHidden] = useState(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const mode = searchParams.get('mode');
        if (mode === 'register') {
            setIsSignIn(false);
            setIsSignInButtonHidden(true); // Optionally hide the sign-in button on initial register view

        } else {
            setIsSignIn(true);
            setIsSignInButtonHidden(false); // Optionally show the sign-in button on initial sign-in view
        }
    }, [searchParams]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-80 border border-gray-300">
                <h1 className="text-3xl font-bold text-center text--800 mb-6">
                    Welcome
                </h1>
                <div className="border-t my-4"></div>

                {/* Toggle Buttons for Sign In and Register */}
                <div className="flex justify-around mb-6" id="signInSectionToggle">
                    {!isSignInButtonHidden && (
                        <button
                            className={`text-lg font-semibold py-2 px-4 cursor-pointer ${
                                isSignIn ? "border-b-2 border-gray-300 text-gray-600" : "text-black-500"
                            }`}
                            onClick={() => {
                                setIsSignIn(true);
                                setIsSignInButtonHidden(false);
                                // Programmatically navigate to the sign-in URL to update the query param
                                const newParams = new URLSearchParams(searchParams);
                                newParams.set('mode', 'signin');
                                window.history.pushState({}, '', `/authentication?${newParams.toString()}`);

                            }}
                        >
                            Sign In
                        </button>
                    )}

                    <button
                        className={`text-lg font-semibold py-2 px-4 cursor-pointer ${
                            !isSignIn ? "border-b-2 border-gray-600 text-gray-600" : "text-gray-500"
                        }`}
                        onClick={() => {
                            setIsSignIn(false);
                            setIsSignInButtonHidden(true);
                            // Programmatically navigate to the register URL to update the query param
                            const newParams = new URLSearchParams(searchParams);
                            newParams.set('mode', 'register');
                            window.history.pushState({}, '', `/authentication?${newParams.toString()}`);
                        }}
                    >
                        Register
                    </button>
                </div>

                {/* Social Login Buttons (conditionally rendered based on isSignIn) */}
                {isSignIn ? (
                    <div className="flex flex-col gap-2" id="signInSection">
                        <button className="bg-sky-900 text-white py-1 px-6 rounded-full hover:bg-green-300">Sign in with Email</button>
                        <button className="bg-sky-900 text-white py-1 px-6 rounded-full hover:bg-red-300">Sign in with Google</button>
                        <button className="bg-sky-900 text-white py-1 px-6 rounded-full hover:bg-blue-300">Sign in with Facebook</button>
                        <button className="bg-sky-900 text-white py-1 px-6 rounded-full hover:bg-purple-300">Sign in with Yahoo</button>
                    </div>
                ) : (
                    // Form sections for registration
                    <form className="flex flex-col">
                        <label htmlFor="name" className="text-black-700 font-semibold mb-1">Name</label>
                        <input type="text" id="name" placeholder="Your Name"
                               className="p-2 border border-gray-300 rounded mb-3" required/>
                        <label htmlFor="email" className="text-black-700 font-semibold mb-1">Email</label>
                        <input type="email" id="email" placeholder="email@gmail.com"
                               className="p-2 border border-gray-300 rounded mb-3" required/>
                        <label htmlFor="password" className="text-black-700 font-semibold mb-1">Password</label>
                        <input type="password" id="password" placeholder="***********"
                               className="p-2 border border-gray-300 rounded mb-6" required/>
                        <div className="flex flex-col gap-10">
                            <button
                                className="bg-sky-900 text-white py-1 px-6 rounded-full hover:bg-purple-300 mb-4">Register
                            </button>
                        </div>
                                <p className="text-center text-md text-gray-600 font-semibold mb-2">
                                    If you need to sign-in click <Link to='#signInSectionToggle'
                                                                       className="text-sky-900 hover:underline"
                                                                        >here</Link>.
                                </p>
                    </form>
                    )}
            </div>
        </div>
);
}

export default AuthenticationPage;
