import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/apiConnector';
import { ENDPOINTS } from '@/lib/constants';
import { extractData } from '@/lib/apiResponse';

export const getTestimonials    = async ()      => extractData(await apiGet(ENDPOINTS.TESTIMONIALS));
export const getTestimonialById = async (id)    => extractData(await apiGet(`${ENDPOINTS.TESTIMONIALS}/${id}`));
export const createTestimonial  = async (data)  => extractData(await apiPost(ENDPOINTS.TESTIMONIALS, data));
export const updateTestimonial  = async (id, d) => extractData(await apiPut(`${ENDPOINTS.TESTIMONIALS}/${id}`, d));
export const deleteTestimonial  = async (id)    => apiDelete(`${ENDPOINTS.TESTIMONIALS}/${id}`);
