import React from "react";
import * as Progress from "@radix-ui/react-progress";

const LoadingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Logo or Loading Text */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
        <p className="text-gray-500">Please wait while we prepare things for you</p>
      </div>

      {/* Radix UI Progress Bar */}
      <Progress.Root
        className="relative w-72 h-4 overflow-hidden bg-gray-300 rounded-full"
        value={100}
      >
        <Progress.Indicator
          className="w-full h-full transition-transform ease-in-out duration-500 bg-blue-600 rounded-full"
          style={{ transform: "translateX(-25%)" }}
        />
      </Progress.Root>
    </div>
  );
};

export default LoadingPage;
