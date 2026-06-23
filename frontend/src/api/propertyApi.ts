import api from "./api";
import type { Property } from "../types/property";

export interface PropertyFilters {
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  propertyType?: string;
  bedrooms?: string;
  status?: string;
}

export const getProperties = async (
  filters?: PropertyFilters
): Promise<Property[]> => {
  const response = await api.get("/properties", {
    params: filters,
  });

  return response.data;
};

export const getPropertyById = async (id: string): Promise<Property> => {
  const response = await api.get(`/properties/${id}`);
  return response.data;
};