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

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [notification, setNotification] = useState(""); // Notification message
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form inputs
    if (!username || !regNumber || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    setLoading(true); // Start loading spinner

    try {
      // Make API call to register user
      const response = await axios.post("https://dsb-yf9s.onrender.com/user", {
        username,
        regnumber: regNumber,
        password,
      });

      if (response.status === 201) {
        setNotification("Account created successfully! Redirecting..."); // Success notification
        setTimeout(() => {
          navigate("/signin");
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      setErrorMessage("Error: " + error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="pt-2 px-4 sm:px-6 lg:px-8 relative">
      {/* Notification */}
      {notification && (
        <div className="fixed top-10 left-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in">
          {notification}
        </div>
      )}

      <div className="mx-auto max-w-screen-md mt-20 bg-sky-100 rounded-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1
            className="text-2xl text-sky-800 font-bold sm:text-3xl"
            onMouseEnter={() => speakText("Get started today!")}
            onMouseLeave={stopSpeech} // Stop speech when cursor leaves
          >
            Get started today!
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <div>
            <label htmlFor="regNumber" className="sr-only">
              Reg No
            </label>
            <div className="relative">
              <input
                type="text"
                id="regNumber"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Enter Reg No"
                onMouseEnter={() => speakText("Enter Registration Number")}
                onMouseLeave={stopSpeech} // Stop speech when cursor leaves
              />
            </div>
          </div>

          <div>
            <label htmlFor="username" className="sr-only">
              User Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Enter User Name"
                onMouseEnter={() => speakText("Enter User Name")}
                onMouseLeave={stopSpeech} // Stop speech when cursor leaves
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
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
                placeholder="Enter password"
                onMouseEnter={() => speakText("Enter your password")}
                onMouseLeave={stopSpeech} // Stop speech when cursor leaves
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-sky-800">
              Have an account?{" "}
              <Link to="/signin">
                <a
                  className="underline hover:text-sky-400"
                  href="#"
                  onMouseEnter={() => speakText("Go to login page")}
                  onMouseLeave={stopSpeech} // Stop speech when cursor leaves
                >
                  Login
                </a>
              </Link>
            </p>

            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-sky-800 px-5 py-3 text-sm font-medium text-white hover:bg-white hover:text-sky-800"
              onMouseEnter={() => speakText("Create Account button")}
              onMouseLeave={stopSpeech} // Stop speech when cursor leaves
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-t-2 border-white rounded-full animate-spin"></div>
                  <span>Loading...</span>
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
