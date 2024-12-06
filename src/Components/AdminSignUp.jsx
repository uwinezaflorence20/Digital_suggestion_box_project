import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Function to trigger speech synthesis
const speakText = (text) => {
  const speech = new SpeechSynthesisUtterance();
  speech.text = text;
  speech.lang = "en-US";
  window.speechSynthesis.speak(speech);
};

const AdminSignUp = () => {
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form inputs
    if (!role || !password) {
      setErrorMessage("Please fill in all fields");
      console.log("Validation failed: Some fields are empty");
      return;
    }

    console.log("Form submitted with data:", { role, password });
    // Simulate success
    navigate("/adminsignin");
  };

  return (
    <div className="pt-2 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-md mt-20 bg-sky-100 rounded-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1
            className="text-2xl text-sky-800 font-bold sm:text-3xl"
            onMouseEnter={() => speakText("Get started today!")}
          >
            Sign in
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <div>
            <label htmlFor="role" className="sr-only">
              Role
            </label>

            <div className="relative">
              <input
                type="text"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Role"
                onMouseEnter={() => speakText("Enter Role")}
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
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Password"
                onMouseEnter={() => speakText("Enter your password")}
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
                >
                  Login
                </a>
              </Link>
            </p>

            <button
              type="submit"
              className="inline-block rounded-lg bg-sky-800 px-5 py-3 text-sm font-medium text-white hover:bg-white hover:text-sky-800"
              onMouseEnter={() => speakText("Create Account button")}
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSignUp;
