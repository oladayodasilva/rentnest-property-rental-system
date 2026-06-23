import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";
import FilterBar from "../components/FilterBar";
import { getProperties, type PropertyFilters } from "../api/propertyApi";
import type { Property } from "../types/property";

const Properties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<PropertyFilters>({
    status: "AVAILABLE",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProperties(filters);
      setProperties(data);
    } catch {
      setError("Could not load properties. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleReset = async () => {
    setFilters({ status: "AVAILABLE" });

    try {
      setLoading(true);
      const data = await getProperties({ status: "AVAILABLE" });
      setProperties(data);
    } catch {
      setError("Could not reset properties.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Available Properties
          </h1>
          <p className="mt-3 text-gray-600">
            Search apartments by location, price, type, and bedrooms.
          </p>
        </div>

        <FilterBar
          filters={filters}
          setFilters={setFilters}
          onSearch={fetchProperties}
          onReset={handleReset}
        />

        {loading && (
          <p className="mt-8 text-gray-600">Loading properties...</p>
        )}

        {error && (
          <p className="mt-8 rounded-lg bg-red-100 p-4 text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && properties.length === 0 && (
          <p className="mt-8 rounded-lg bg-white p-6 text-gray-600">
            No properties found.
          </p>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Properties;