import Job from "../models/Job.model.js";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./crud.factory.js";

export const createJob   = createOne(Job);
export const getAllJobs   = getAll(Job);
export const getJobById  = getOne(Job);
export const updateJob   = updateOne(Job);
export const deleteJob   = deleteOne(Job);

export const getActiveJobs = async (_req, res) => {
  try {
    const jobs = await Job.find({ status: "active" }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
