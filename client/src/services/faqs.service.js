import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/apiConnector';
import { ENDPOINTS } from '@/lib/constants';
import { extractData } from '@/lib/apiResponse';

export const getFAQs    = async ()      => extractData(await apiGet(ENDPOINTS.FAQS));
export const getFAQById = async (id)    => extractData(await apiGet(`${ENDPOINTS.FAQS}/${id}`));
export const createFAQ  = async (data)  => extractData(await apiPost(ENDPOINTS.FAQS, data));
export const updateFAQ  = async (id, d) => extractData(await apiPut(`${ENDPOINTS.FAQS}/${id}`, d));
export const deleteFAQ  = async (id)    => apiDelete(`${ENDPOINTS.FAQS}/${id}`);
