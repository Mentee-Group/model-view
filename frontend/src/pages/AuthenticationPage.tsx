import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { register, login } from '@/services/AuthService';
import { toast } from 'sonner';

function AuthenticationPage() {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [isSignInButtonHidden, setIsSignInButtonHidden] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); 

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'register') {
      setIsSignIn(false);
      setIsSignInButtonHidden(true);
    } else {
      setIsSignIn(true);
      setIsSignInButtonHidden(false);
    }
  }, [searchParams]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password);
      toast.success('Registration successful!');
      navigate('/'); 
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Registration failed');
      } else {
        toast.error('Registration failed');
      }
    }
  };

  const handleLogin = async () => {
    try {
      await login(email, password);
      toast.success('Sign in successful!');
      navigate('/'); 
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Sign in failed');
      } else {
        toast.error('Sign in failed');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80 border border-gray-300">
        <h1 className="text-3xl font-bold text-center text--800 mb-6">Welcome</h1>
        <div className="border-t my-4"></div>

        <div className="flex justify-around mb-6" id="signInSectionToggle">
          {!isSignInButtonHidden && (
            <button
              className={`text-lg font-semibold py-2 px-4 cursor-pointer ${isSignIn ? "border-b-2 border-gray-300 text-gray-600" : "text-black-500"}`}
              onClick={() => {
                setIsSignIn(true);
                setIsSignInButtonHidden(false);
                const newParams = new URLSearchParams(searchParams);
                newParams.set('mode', 'signin');
                window.history.pushState({}, '', `/authentication?${newParams.toString()}`);
              }}
            >
              Sign In
            </button>
          )}
          <button
            className={`text-lg font-semibold py-2 px-4 cursor-pointer ${!isSignIn ? "border-b-2 border-gray-600 text-gray-600" : "text-gray-500"}`}
            onClick={() => {
              setIsSignIn(false);
              setIsSignInButtonHidden(true);
              const newParams = new URLSearchParams(searchParams);
              newParams.set('mode', 'register');
              window.history.pushState({}, '', `/authentication?${newParams.toString()}`);
            }}
          >
            Register
          </button>
        </div>

        {isSignIn ? (
          <div className="flex flex-col gap-2" id="signInSection">
            <input
              type="email"
              placeholder="Email"
              className="p-2 border border-gray-300 rounded mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 border border-gray-300 rounded mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} className="bg-sky-900 text-white py-1 px-6 rounded-full hover:bg-green-300">
              Sign in with Email
            </button>
          </div>
        ) : (
          <form className="flex flex-col" onSubmit={handleRegister}>
            <label htmlFor="name" className="text-black-700 font-semibold mb-1">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="p-2 border border-gray-300 rounded mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="email" className="text-black-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              id="email"
              placeholder="email@gmail.com"
              className="p-2 border border-gray-300 rounded mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password" className="text-black-700 font-semibold mb-1">Password</label>
            <input
              type="password"
              id="password"
              placeholder="***********"
              className="p-2 border border-gray-300 rounded mb-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="bg-sky-900 text-white py-1 px-6 rounded-full hover:bg-purple-300 mb-4">
              Register
            </button>
            <p className="text-center text-md text-gray-600 font-semibold mb-2">
              If you need to sign-in click{" "}
              <Link to="#signInSectionToggle" className="text-sky-900 hover:underline">here</Link>.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthenticationPage;
