import api from "./api";
import type { EnquiryRequest } from "../types/enquiry";

export const createEnquiry = async (data: EnquiryRequest) => {
  const response = await api.post("/enquiries", data);
  return response.data;
};