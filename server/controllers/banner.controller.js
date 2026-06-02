import Banner from "../models/Banner.model.js";

export const getAllBanners = async (_req, res) => {
  try {
    const data = await Banner.find();
    res.status(200).json({ success: true, data });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

export const getBannerByPage = async (req, res) => {
  try {
    const doc = await Banner.findOne({ page: req.params.page });
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: doc });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

export const upsertBanner = async (req, res) => {
  try {
    const { image, video, title, subtitle } = req.body;
    const doc = await Banner.findOneAndUpdate(
      { page: req.params.page },
      { image, video, title, subtitle },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: doc });
  } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};
