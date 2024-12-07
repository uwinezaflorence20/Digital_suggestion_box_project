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

const stopSpeech = () => {
  window.speechSynthesis.cancel();
};

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [notification, setNotification] = useState(null); // Notification object

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form inputs
    if (!username.trim() || !regNumber.trim() || !password.trim()) {
      setNotification({ type: "error", message: "Please fill in all fields" });
      return;
    }

    if (isNaN(regNumber)) {
      setNotification({
        type: "error",
        message: "Registration number must be a valid number",
      });
      return;
    }

    setLoading(true); // Start loading spinner

    try {
      // Make API call to register user
      const response = await axios.post(
        "https://dsb-yf9s.onrender.com/user",
        {
          username: username.trim(),
          regnumber: Number(regNumber),
          password: password.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );

      if (response.status === 201) {
        setNotification({
          type: "success",
          message: "Account created successfully! Redirecting...",
        });
        setTimeout(() => {
          navigate("/signin");
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      setNotification({
        type: "error",
        message:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // Notification styles
  const notificationStyles = {
    base: "fixed top-10 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-md text-sm w-96",
    success: "bg-green-100 text-green-800 border border-green-300",
    error: "bg-red-100 text-red-800 border border-red-300",
  };

  return (
    <div className="pt-2 mb-8 px-4 sm:px-6 lg:px-8 relative dark:bg-gray-900 dark:text-gray-200">
      {/* Notification */}
      {notification && (
        <div
          className={`${notificationStyles.base} ${
            notification.type === "success"
              ? notificationStyles.success
              : notificationStyles.error
          }`}
        >
          <div className="flex items-center mt-20">
            <div className="mr-2 ">
              {notification.type === "success" ? (
                <svg
                  className="w-5 h-2 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </div>
            <span>{notification.message}</span>
          </div>
        </div>
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

        <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
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
