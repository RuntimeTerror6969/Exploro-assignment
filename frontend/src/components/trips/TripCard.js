import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  CalendarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const TripCard = ({ trip }) => {
  const {
    _id,
    name,
    description,
    price,
    startDate,
    endDate,
    availableSlots,
    imageUrl,
  } = trip;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={imageUrl || "/api/placeholder/400/225"}
          alt={name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{description}</p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>
              {format(new Date(startDate), "MMM d")} -{" "}
              {format(new Date(endDate), "MMM d, yyyy")}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <UserGroupIcon className="h-4 w-4 mr-2" />
            <span>{availableSlots} spots left</span>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <CurrencyDollarIcon className="h-4 w-4 mr-2" />
            <span>${price.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-4">
          <Link
            to={`/trips/${_id}`}
            className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
