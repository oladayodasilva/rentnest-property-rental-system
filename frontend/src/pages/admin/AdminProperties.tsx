import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { getProperties } from "../../api/propertyApi";
import { deleteProperty } from "../../api/adminApi";
import type { Property } from "../../types/property";

const AdminProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const data = await getProperties();
      setProperties(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Delete this property?");

    if (!confirmDelete) return;

    await deleteProperty(id);
    fetchProperties();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Properties</h1>

        <Link
          to="/admin/properties/new"
          className="rounded-lg bg-black px-5 py-2 text-white"
        >
          Add Property
        </Link>
      </div>

      {loading ? (
        <p className="mt-6">Loading properties...</p>
      ) : (
        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Location</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {properties.map((property) => (
                <tr key={property.id} className="border-t">
                  <td className="p-4">{property.title}</td>
                  <td className="p-4">{property.location}</td>
                  <td className="p-4">
                    ₦{Number(property.price).toLocaleString()}
                  </td>
                  <td className="p-4">{property.status}</td>
                  <td className="flex gap-3 p-4">
                    <Link
                      to={`/admin/properties/${property.id}/edit`}
                      className="text-blue-600"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(property.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProperties;