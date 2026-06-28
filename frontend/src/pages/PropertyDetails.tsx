import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getPropertyById } from "../api/propertyApi";
import { createEnquiry } from "../api/enquiryApi";
import type { Property } from "../types/property";
import type { EnquiryRequest } from "../types/enquiry";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<EnquiryRequest>({
    propertyId: Number(id),
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    message: "",
    inspectionDate: "",
    inspectionTime: "",
  });

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await getPropertyById(id);
        setProperty(data);
        setFormData((prev) => ({
          ...prev,
          propertyId: data.id,
        }));
      } catch {
        setError("Could not load property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const formattedPrice =
    property &&
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(property.price);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      await createEnquiry(formData);

      navigate("/enquiry-success");
    } catch {
      setError("Could not submit enquiry. Please check your details.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main>
        <Navbar />
        <p className="p-8">Loading property...</p>
      </main>
    );
  }

  if (!property) {
    return (
      <main>
        <Navbar />
        <p className="p-8">Property not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <img
              src={property.imageUrl}
              alt={property.title}
              className="h-[420px] w-full rounded-2xl object-cover"
            />

            <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
              <h1 className="text-3xl font-bold text-gray-900">
                {property.title}
              </h1>

              <p className="mt-2 text-gray-600">{property.address}</p>

              <p className="mt-4 text-2xl font-bold text-gray-900">
                {formattedPrice}
              </p>

              <div className="mt-4 flex gap-4 text-gray-600">
                <span>{property.bedrooms} bedrooms</span>
                <span>{property.bathrooms} bathrooms</span>
                <span>{property.propertyType.replace("_", " ")}</span>
              </div>

              <p className="mt-6 leading-7 text-gray-700">
                {property.description}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">
              Request Inspection
            </h2>

            <p className="mt-2 text-gray-600">
              Fill this form and an agent will contact you.
            </p>

            {error && (
              <p className="mt-4 rounded-lg bg-red-100 p-3 text-red-700">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="text"
                name="customerName"
                placeholder="Full name"
                value={formData.customerName}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-3"
              />

              <input
                type="email"
                name="customerEmail"
                placeholder="Email address"
                value={formData.customerEmail}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-3"
              />

              <input
                type="text"
                name="customerPhone"
                placeholder="Phone number"
                value={formData.customerPhone}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-3"
              />

              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-lg border px-4 py-3"
              />

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="date"
                  name="inspectionDate"
                  value={formData.inspectionDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3"
                />

                <input
                  type="time"
                  name="inspectionTime"
                  value={formData.inspectionTime}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-black px-6 py-3 text-white disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PropertyDetails;