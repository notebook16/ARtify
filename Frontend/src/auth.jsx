import { useState } from "react";
import { useAuth } from "./AuthContext"; // Import the AuthContext
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const { login, signup} = useAuth(); // Access AuthContext functions and state
  const [isSignUp, setIsSignUp] = useState(false); // Toggle state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // Email for sign-up
  
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      // Signup logic
      if (!username || !password || !email) {
        alert("Please fill all the fields.");
        return;
      }
      await signup(username, password, email);
      navigate("/");
    } else {
      // Login logic
      if (!username || !password) {
        alert("Please enter a username and password.");
        return;
      }
      await login(username, password);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-800 to-black">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-r from-gray to-gray shadow-[0_0_10px_5px_rgba(255,255,255,0.6)] rounded-lg">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
            {isSignUp ? "Sign Up for an Account" : "Sign In to Your Account"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username Input */}
            <div>
              <label className="block text-sm font-medium text-white">Username</label>
              <div className="mt-2">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Conditionally render Email for Sign Up */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-white">Email</label>
                <div className="mt-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            )}

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-white">Password</label>
              <div className="mt-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

          

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                
              >
                sign in
              </button>
            </div>
          </form>

          {/* Toggle Sign Up / Sign In */}
          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-sm text-indigo-500 hover:underline"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
