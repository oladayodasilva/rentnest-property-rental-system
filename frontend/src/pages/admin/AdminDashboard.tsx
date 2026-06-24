import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { getProperties } from "../../api/propertyApi";
import { getEnquiries } from "../../api/adminApi";
import type { Property } from "../../types/property";
import type { Enquiry } from "../../api/adminApi";

const AdminDashboard = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const propertyData = await getProperties();
        const enquiryData = await getEnquiries();

        setProperties(propertyData);
        setEnquiries(enquiryData);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const available = properties.filter((p) => p.status === "AVAILABLE").length;
  const rented = properties.filter((p) => p.status === "RENTED").length;
  const newEnquiries = enquiries.filter((e) => e.status === "NEW").length;

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      {loading ? (
        <p className="mt-6">Loading dashboard...</p>
      ) : (
        <>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Total Properties</p>
              <h2 className="mt-2 text-3xl font-bold">{properties.length}</h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Available</p>
              <h2 className="mt-2 text-3xl font-bold">{available}</h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Rented</p>
              <h2 className="mt-2 text-3xl font-bold">{rented}</h2>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">New Enquiries</p>
              <h2 className="mt-2 text-3xl font-bold">{newEnquiries}</h2>
            </div>
          </div>

          <div className="mt-10 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Recent Enquiries</h2>

            <div className="mt-4 space-y-3">
              {enquiries.slice(0, 5).map((enquiry) => (
                <div key={enquiry.id} className="rounded-lg border p-4">
                  <p className="font-semibold">{enquiry.customerName}</p>
                  <p className="text-sm text-gray-600">
                    {enquiry.propertyTitle}
                  </p>
                  <p className="mt-1 text-sm">{enquiry.status}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;