import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const RoleSelection = () => {
  const navigate = useNavigate(); // Using useNavigate hook

  // Function to handle role selection
  const handleRoleSelection = (role) => {
    if (role === "admin") {
      navigate("/adminsignin"); // Navigate to the admin login page
    } else if (role === "student") {
      navigate("/signin"); // Navigate to the student login page
    }
  };

  // Handle speech on hover
  const handleHoverStart = (role) => {
    const utterance = new SpeechSynthesisUtterance(role);
    speechSynthesis.speak(utterance);
  };

  const handleHoverEnd = () => {
    speechSynthesis.cancel(); // Stop any ongoing speech synthesis
  };

  return (
    <motion.div
      className="w-full h-screen  dark:bg-gray-800 dark:text-gray-200 flex flex-col justify-center items-center bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="bg-white dark:bg-gray-700 dark:text-gray-200 p-8 rounded-lg shadow-md w-80 text-center">
        <h2 className="text-2xl font-bold mb-8">Continue as</h2>

        <div className="flex flex-col gap-4">
          <motion.button
            className="py-3 px-6 bg-sky-800 text-white rounded-full"
            onClick={() => handleRoleSelection("admin")}
            onMouseEnter={() => handleHoverStart("Admin")}
            onMouseLeave={handleHoverEnd}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Admin
          </motion.button>

          <motion.button
            className="py-3 px-6 bg-sky-800 text-white rounded-full"
            onClick={() => handleRoleSelection("student")}
            onMouseEnter={() => handleHoverStart("Student")}
            onMouseLeave={handleHoverEnd}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Student
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default RoleSelection;
