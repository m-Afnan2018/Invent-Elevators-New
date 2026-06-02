import { apiGet, apiPut } from '@/lib/apiConnector';
import { ENDPOINTS } from '@/lib/constants';
import { extractData } from '@/lib/apiResponse';

export const getAllBanners   = async ()           => extractData(await apiGet(ENDPOINTS.BANNERS));
export const upsertBanner    = async (page, data) => extractData(await apiPut(`${ENDPOINTS.BANNERS}/${page}`, data));

export const getBannerByPage = async (page) => {
  try {
    return extractData(await apiGet(`${ENDPOINTS.BANNERS}/${page}`));
  } catch {
    return null; // 404 or network error — caller uses fallback
  }
};
