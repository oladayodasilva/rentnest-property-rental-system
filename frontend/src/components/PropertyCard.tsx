import { Link } from "react-router-dom";
import type { Property } from "../types/property";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <img
        src={property.imageUrl}
        alt={property.title}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            {property.status.replace("_", " ")}
          </span>

          <span className="text-sm text-gray-500">
            {property.propertyType.replace("_", " ")}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900">
          {property.title}
        </h3>

        <p className="mt-2 text-gray-600">{property.location}</p>

        <p className="mt-3 font-bold text-gray-900">{formattedPrice}</p>

        <div className="mt-3 flex gap-4 text-sm text-gray-600">
          <span>{property.bedrooms} bed</span>
          <span>{property.bathrooms} bath</span>
        </div>

        <Link
          to={`/properties/${property.id}`}
          className="mt-5 inline-block rounded-lg bg-black px-5 py-2 text-white"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;