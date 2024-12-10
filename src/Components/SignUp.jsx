import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "./Notification"; // Import the Notification component

// Function to trigger speech synthesis
const speakText = (text) => {
  const speech = new SpeechSynthesisUtterance();
  speech.text = text;
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
};

const stopSpeech = () => {
  window.speechSynthesis.cancel();
};

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null); // Manage notifications

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    if (!username.trim() || !regNumber.trim() || !password.trim()) {
      setNotification("Please fill in all fields.");
      return;
    }

    if (isNaN(regNumber)) {
      setNotification("Registration number must be a valid number.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://dsb-yf9s.onrender.com/user",
        {
          username: username.trim(),
          regnumber: Number(regNumber),
          password: password.trim(),
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        setNotification("Account created successfully! Redirecting...");
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
    } catch (error) {
      setNotification(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-2 mb-8 px-4 sm:px-6 lg:px-8 relative dark:bg-gray-900 dark:text-gray-200">
      {/* Notification Component */}
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)} // Close the notification
        />
      )}

      <div className="mx-auto max-w-screen-md mt-20 bg-sky-100 rounded-3xl px-4 py-16 sm:px-6 lg:px-8 dark:bg-gray-800 dark:text-gray-200">
        <div className="mx-auto max-w-lg text-center">
          <h1
            className="text-2xl text-sky-800 font-bold sm:text-3xl dark:text-white"
            onMouseEnter={() => speakText("Get started today!")}
            onMouseLeave={stopSpeech}
          >
            Get started today!
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="regNumber" className="sr-only">
              Registration Number
            </label>
            <input
              type="text"
              id="regNumber"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Enter Registration Number"
              onMouseEnter={() => speakText("Enter Registration Number")}
              onMouseLeave={stopSpeech}
            />
          </div>

          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
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

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Enter Password"
              onMouseEnter={() => speakText("Enter your password")}
              onMouseLeave={stopSpeech}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-sky-800 dark:text-sky-300">
              Have an account?{" "}
              <Link to="/signin">
                <span
                  className="underline hover:text-sky-400 dark:hover:text-sky-200"
                  onMouseEnter={() => speakText("Go to login page")}
                  onMouseLeave={stopSpeech}
                >
                  Login
                </span>
              </Link>
            </p>

            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-sky-800 px-5 py-3 text-sm font-medium text-white hover:bg-white hover:text-sky-800 dark:bg-sky-700 dark:hover:bg-sky-600 dark:hover:text-white"
              onMouseEnter={() => speakText("Create Account button")}
              onMouseLeave={stopSpeech}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-t-2 border-white rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
