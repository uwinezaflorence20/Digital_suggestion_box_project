
const Notification = ({ message, onClose }) => {
  return (
    <div
      className="fixed top-4 left-4 bg-green-500 text-white p-4 rounded-md shadow-lg flex items-center space-x-4 z-50"
    >
      <svg
        className="w-6 h-6 text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 00-1.414 0L10 10.586 6.707 7.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
          clipRule="evenodd"
        />
      </svg>
      <p>{message}</p>
      <button
        onClick={onClose}
        className="text-lg font-bold text-white hover:text-gray-200 focus:outline-none"
      >
        &times;
      </button>
    </div>
  );
};

export default Notification;
