import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { getPropertyById } from "../../api/propertyApi";
import { updateProperty, type PropertyRequest } from "../../api/adminApi";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<PropertyRequest>({
    title: "",
    description: "",
    location: "",
    address: "",
    propertyType: "APARTMENT",
    bedrooms: 1,
    bathrooms: 1,
    price: 0,
    status: "AVAILABLE",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;

      const property = await getPropertyById(id);

      setFormData({
        title: property.title,
        description: property.description,
        location: property.location,
        address: property.address,
        propertyType: property.propertyType,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        price: property.price,
        status: property.status,
        imageUrl: property.imageUrl,
      });
    };

    fetchProperty();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value =
      e.target.name === "bedrooms" ||
      e.target.name === "bathrooms" ||
      e.target.name === "price"
        ? Number(e.target.value)
        : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!id) return;

    await updateProperty(id, formData);
    navigate("/admin/properties");
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold">Edit Property</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-8 max-w-3xl space-y-4 rounded-xl bg-white p-6 shadow-sm"
      >
        <input
          name="title"
          placeholder="Property title"
          className="w-full rounded-lg border px-4 py-3"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full rounded-lg border px-4 py-3"
          rows={4}
          value={formData.description}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          className="w-full rounded-lg border px-4 py-3"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          name="address"
          placeholder="Address"
          className="w-full rounded-lg border px-4 py-3"
          value={formData.address}
          onChange={handleChange}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <select
            name="propertyType"
            className="rounded-lg border px-4 py-3"
            value={formData.propertyType}
            onChange={handleChange}
          >
            <option value="APARTMENT">Apartment</option>
            <option value="STUDIO">Studio</option>
            <option value="DUPLEX">Duplex</option>
            <option value="BUNGALOW">Bungalow</option>
            <option value="SELF_CONTAIN">Self Contain</option>
            <option value="COMMERCIAL">Commercial</option>
          </select>

          <select
            name="status"
            className="rounded-lg border px-4 py-3"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="AVAILABLE">Available</option>
            <option value="UNDER_INSPECTION">Under Inspection</option>
            <option value="RENTED">Rented</option>
            <option value="UNAVAILABLE">Unavailable</option>
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <input
            name="bedrooms"
            type="number"
            className="rounded-lg border px-4 py-3"
            value={formData.bedrooms}
            onChange={handleChange}
          />

          <input
            name="bathrooms"
            type="number"
            className="rounded-lg border px-4 py-3"
            value={formData.bathrooms}
            onChange={handleChange}
          />

          <input
            name="price"
            type="number"
            className="rounded-lg border px-4 py-3"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <input
          name="imageUrl"
          placeholder="Image URL"
          className="w-full rounded-lg border px-4 py-3"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        <button className="rounded-lg bg-black px-6 py-3 text-white">
          Update Property
        </button>
      </form>
    </AdminLayout>
  );
};

export default EditProperty;