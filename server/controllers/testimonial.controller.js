import Testimonial from "../models/Testimonial.model.js";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./crud.factory.js";

export const createTestimonial  = createOne(Testimonial);
export const getAllTestimonials  = getAll(Testimonial);
export const getTestimonialById = getOne(Testimonial);
export const updateTestimonial  = updateOne(Testimonial);
export const deleteTestimonial  = deleteOne(Testimonial);
