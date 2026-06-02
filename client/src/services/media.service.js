import { apiGet, apiPut, apiDelete } from '@/lib/apiConnector';
import { ENDPOINTS } from '@/lib/constants';
import { extractData, extractCollection } from '@/lib/apiResponse';

export const getAllMedia    = async ()            => extractCollection(await apiGet(ENDPOINTS.MEDIA));
export const renameMedia   = async (id, name)    => extractData(await apiPut(`${ENDPOINTS.MEDIA}/${id}`, { originalName: name }));
export const deleteMedia   = async (id)          => extractData(await apiDelete(`${ENDPOINTS.MEDIA}/${id}`));
export const getMediaUsage = async (id)          => extractCollection(await apiGet(`${ENDPOINTS.MEDIA}/${id}/usage`));
