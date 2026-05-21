import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/apiConnector';
import apiConnector from '@/lib/apiConnector';

const JOBS = '/api/jobs';
const APPS = '/api/job-applications';

// ── Jobs ──────────────────────────────────────────────────────────
export const getActiveJobs      = ()           => apiGet(`${JOBS}/active`);
export const getAllJobs          = ()           => apiGet(JOBS);
export const getJobById         = (id)         => apiGet(`${JOBS}/${id}`);
export const createJob          = (data)       => apiPost(JOBS, data);
export const updateJob          = (id, data)   => apiPut(`${JOBS}/${id}`, data);
export const deleteJob          = (id)         => apiDelete(`${JOBS}/${id}`);

// ── Applications ─────────────────────────────────────────────────
export const getAllApplications  = ()           => apiGet(APPS);
export const getApplicationById = (id)         => apiGet(`${APPS}/${id}`);
export const updateApplication  = (id, data)   => apiPut(`${APPS}/${id}`, data);
export const deleteApplication  = (id)         => apiDelete(`${APPS}/${id}`);

export const submitApplication = (formData) =>
  apiConnector.post(APPS, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
