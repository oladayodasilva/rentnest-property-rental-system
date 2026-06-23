export type PropertyStatus =
  | "AVAILABLE"
  | "UNDER_INSPECTION"
  | "RENTED"
  | "UNAVAILABLE";

export type PropertyType =
  | "APARTMENT"
  | "STUDIO"
  | "DUPLEX"
  | "BUNGALOW"
  | "SELF_CONTAIN"
  | "COMMERCIAL";

export interface Property {
  id: number;
  title: string;
  description: string;
  location: string;
  address: string;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  price: number;
  status: PropertyStatus;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}