import Series from "../models/Series.model.js";

export const getAllSeries = async (_req, res) => {
  try {
    const data = await Series.find();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getSeriesByCode = async (req, res) => {
  try {
    const doc = await Series.findOne({ code: req.params.code.toUpperCase() });
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: doc });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const upsertSeries = async (req, res) => {
  try {
    const code = req.params.code.toUpperCase();
    const doc = await Series.findOneAndUpdate(
      { code },
      { ...req.body, code },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: doc });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
