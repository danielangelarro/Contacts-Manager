import React from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const ErrorPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Icono y mensaje principal */}
      <div className="flex flex-col items-center bg-white shadow-md p-8 rounded-lg">
        <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Server Error
        </h1>
        <p className="text-gray-500 mb-4 text-center">
          We’re sorry, something went wrong on our end. Please try again later.
        </p>

        {/* Botón para intentar nuevamente */}
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
        >
          Try Again
        </button>
      </div>

    </div>
  );
};

export default ErrorPage;
