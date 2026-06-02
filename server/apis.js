/**
 * Central API route registry.
 *
 * Use this file to keep route prefixes in one place.
 */

const API_BASE = "/api";

export const API_ROUTES = {
  HEALTH: "/",
  AUTH: `${API_BASE}/auth`,
  CATEGORIES: `${API_BASE}/categories`,
  SUB_CATEGORIES: `${API_BASE}/sub-categories`,
  COMPONENT_TYPES: `${API_BASE}/component-types`,
  COMPONENTS: `${API_BASE}/components`,
  PRODUCTS: `${API_BASE}/products`,
  UPLOAD: `${API_BASE}/upload`,
  ATTRIBUTES: `${API_BASE}/attributes`,
  PROJECTS: `${API_BASE}/projects`,
  BLOGS: `${API_BASE}/blogs`,
  LEADS: `${API_BASE}/leads`,
  USERS: `${API_BASE}/users`,
  JOBS: `${API_BASE}/jobs`,
  JOB_APPLICATIONS: `${API_BASE}/job-applications`,
  FAQS: `${API_BASE}/faqs`,
  TESTIMONIALS: `${API_BASE}/testimonials`,
  SERIES: `${API_BASE}/series`,
  MEDIA: `${API_BASE}/media`,
  BANNERS: `${API_BASE}/banners`,
};

export default API_ROUTES;
