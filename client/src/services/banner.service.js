import { apiGet, apiPut } from '@/lib/apiConnector';
import { ENDPOINTS } from '@/lib/constants';
import { extractData } from '@/lib/apiResponse';

export const getAllBanners   = async ()           => extractData(await apiGet(ENDPOINTS.BANNERS));
export const getBannerByPage = async (page)       => extractData(await apiGet(`${ENDPOINTS.BANNERS}/${page}`)).catch(() => null);
export const upsertBanner    = async (page, data) => extractData(await apiPut(`${ENDPOINTS.BANNERS}/${page}`, data));
