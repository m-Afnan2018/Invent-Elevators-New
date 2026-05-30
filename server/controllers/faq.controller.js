import FAQ from "../models/FAQ.model.js";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./crud.factory.js";

export const createFAQ = createOne(FAQ);
export const getAllFAQs = getAll(FAQ);
export const getFAQById = getOne(FAQ);
export const updateFAQ  = updateOne(FAQ);
export const deleteFAQ  = deleteOne(FAQ);
