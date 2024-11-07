import React from 'react';

const Notification = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center transition-opacity duration-300 ease-in-out">
      <div className="bg-white rounded-lg p-6 shadow-lg text-center w-80 transform transition-transform duration-300 ease-in-out">
        <div className="text-4xl">🎖️</div>
        <h2 className="text-xl font-bold mt-4">Congratulations!</h2>
        <p className="text-gray-600 mt-2">{message}</p>
        <button
          onClick={onClose}
          className="bg-green-500 text-white font-semibold px-4 py-2 mt-4 rounded-md w-full"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Notification;
