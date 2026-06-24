import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import {
  getEnquiries,
  updateEnquiryStatus,
  type Enquiry,
} from "../../api/adminApi";

const statusOptions = [
  "NEW",
  "CONTACTED",
  "INSPECTION_SCHEDULED",
  "NEGOTIATION",
  "CLOSED",
  "REJECTED",
];

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const data = await getEnquiries();
      setEnquiries(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    await updateEnquiryStatus(id, status);
    fetchEnquiries();
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold">Enquiries</h1>

      {loading ? (
        <p className="mt-6">Loading enquiries...</p>
      ) : (
        <div className="mt-8 space-y-4">
          {enquiries.map((enquiry) => (
            <div key={enquiry.id} className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h2 className="text-xl font-bold">{enquiry.customerName}</h2>
                  <p className="text-gray-600">{enquiry.customerEmail}</p>
                  <p className="text-gray-600">{enquiry.customerPhone}</p>

                  <p className="mt-4 font-semibold">
                    Property: {enquiry.propertyTitle}
                  </p>

                  <p className="text-gray-600">{enquiry.propertyLocation}</p>

                  <p className="mt-4 text-gray-700">{enquiry.message}</p>

                  {enquiry.inspectionDate && (
                    <p className="mt-3 text-sm text-gray-600">
                      Inspection: {enquiry.inspectionDate}{" "}
                      {enquiry.inspectionTime}
                    </p>
                  )}
                </div>

                <select
                  value={enquiry.status}
                  onChange={(e) =>
                    handleStatusChange(enquiry.id, e.target.value)
                  }
                  className="rounded-lg border px-4 py-2"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          {enquiries.length === 0 && (
            <p className="rounded-xl bg-white p-6 text-gray-600">
              No enquiries yet.
            </p>
          )}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminEnquiries;