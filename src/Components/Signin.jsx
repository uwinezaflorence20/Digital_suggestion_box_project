import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Function to trigger speech synthesis
const speakText = (text) => {
  const speech = new SpeechSynthesisUtterance();
  speech.text = text;
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
};

// Function to stop speech synthesis
const stopSpeech = () => {
  window.speechSynthesis.cancel();
};

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    if (!username.trim() || !password.trim()) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    setLoading(true); // Start loading spinner

    try {
      // Make API call for user login
      const response = await axios.post(
        "https://dsb-yf9s.onrender.com/login",
        {
          username: username.trim(),
          password: password.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { Token, Username, Regnumber } = response.data;

        // Save token and additional data in localStorage
        localStorage.setItem("token", Token);
        localStorage.setItem("username", Username);
        localStorage.setItem("regnumber", Regnumber);

        // Clear any previous errors and navigate to the student dashboard
        setErrorMessage("");
        navigate("/student");
      }
    } catch (error) {
      // Handle errors from the API or network issues
      setErrorMessage(
        error.response?.data?.message || "Invalid username or password. Please try again."
      );
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="pt-2 mb-8 px-4 sm:px-6 lg:px-8 dark:bg-gray-900 dark:text-gray-200">
      <div className="mx-auto max-w-screen-md mt-20 bg-sky-100 rounded-3xl px-4 py-16 sm:px-6 lg:px-8 dark:bg-gray-800 dark:text-gray-200">
        <div className="mx-auto max-w-lg text-center">
          <h1
            className="text-2xl text-sky-800 font-bold sm:text-3xl dark:bg-gray-900 dark:text-white"
            onMouseEnter={() => speakText("Welcome back! Please sign in.")}
            onMouseLeave={stopSpeech}
          >
            Welcome Back!
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Enter Username"
                onMouseEnter={() => speakText("Enter Username")}
                onMouseLeave={stopSpeech}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Enter Password"
                onMouseEnter={() => speakText("Enter Password")}
                onMouseLeave={stopSpeech}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-sky-800 dark:text-sky-300">
              No account?{" "}
              <Link to="/signup">
                <span
                  className="underline hover:text-sky-400 dark:hover:text-sky-200"
                  onMouseEnter={() => speakText("Go to sign-up page")}
                  onMouseLeave={stopSpeech}
                >
                  Sign up
                </span>
              </Link>
            </p>

            <button
              type="submit"
              className="inline-block rounded-lg bg-sky-800 px-5 py-3 text-sm font-medium text-white hover:bg-white hover:text-sky-800 dark:bg-sky-700 dark:hover:bg-sky-600 dark:hover:text-white"
              onMouseEnter={() => speakText("Sign in button")}
              onMouseLeave={stopSpeech}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-t-2 border-white rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
