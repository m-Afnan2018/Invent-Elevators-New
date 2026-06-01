import { apiGet, apiPut } from '@/lib/apiConnector';
import { ENDPOINTS } from '@/lib/constants';
import { extractData } from '@/lib/apiResponse';

export const getAllSeriesCMS = async ()           => extractData(await apiGet(ENDPOINTS.SERIES_CMS));
export const getSeriesByCode = async (code)       => extractData(await apiGet(`${ENDPOINTS.SERIES_CMS}/${code}`));
export const upsertSeriesCMS = async (code, data) => extractData(await apiPut(`${ENDPOINTS.SERIES_CMS}/${code}`, data));
