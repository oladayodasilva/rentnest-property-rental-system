import api from "./api";
import type { Property, PropertyStatus } from "../types/property";

export interface PropertyRequest {
  title: string;
  description: string;
  location: string;
  address: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  price: number;
  status: PropertyStatus;
  imageUrl: string;
}

export interface Enquiry {
  id: number;
  propertyId: number;
  propertyTitle: string;
  propertyLocation: string;
  propertyImageUrl: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  message: string;
  inspectionDate: string;
  inspectionTime: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const createProperty = async (data: PropertyRequest): Promise<Property> => {
  const response = await api.post("/properties", data);
  return response.data;
};

export const updateProperty = async (
  id: string,
  data: PropertyRequest
): Promise<Property> => {
  const response = await api.put(`/properties/${id}`, data);
  return response.data;
};

export const deleteProperty = async (id: number) => {
  await api.delete(`/properties/${id}`);
};

export const getEnquiries = async (): Promise<Enquiry[]> => {
  const response = await api.get("/enquiries");
  return response.data;
};

export const updateEnquiryStatus = async (id: number, status: string) => {
  const response = await api.patch(`/enquiries/${id}/status`, null, {
    params: { status },
  });

  return response.data;
};