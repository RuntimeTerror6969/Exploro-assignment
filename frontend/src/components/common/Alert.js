import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Alert = ({ type = "info", message, onClose }) => {
  const alertStyles = {
    success: "bg-green-50 text-green-800 border-green-400",
    error: "bg-red-50 text-red-800 border-red-400",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-400",
    info: "bg-blue-50 text-blue-800 border-blue-400",
  };

  const iconStyles = {
    success: "text-green-400",
    error: "text-red-400",
    warning: "text-yellow-400",
    info: "text-blue-400",
  };

  return (
    <div className={`rounded-md border p-4 ${alertStyles[type]}`}>
      <div className="flex">
        <div className="flex-grow">
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onClose && (
          <div className="ml-3">
            <button
              type="button"
              className={`inline-flex rounded-md p-1.5 ${iconStyles[type]} hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2`}
              onClick={onClose}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;
