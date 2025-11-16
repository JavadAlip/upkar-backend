import PlotLayout from "../../models/projectPage/plotLayoutModel.js";
import { uploadImageToCloudinary } from "../../config/cloudinaryUpload.js";

// Add or Update Plot Layout (only one allowed)
export const createOrUpdatePlotLayout = async (req, res) => {
  try {
    // Parse JSON string data
    const { icons } = req.body;

    // Parse icon headings/subheadings
    const parsedIcons =
      typeof icons === "string" ? JSON.parse(icons) : icons || [];

    // Find existing layout
    let existingLayout = await PlotLayout.findOne();

    // Upload main image (if provided)
    let mainImageUrl = existingLayout?.mainImage;
    if (req.files?.mainImage?.[0]) {
      const result = await uploadImageToCloudinary(
        req.files.mainImage[0].buffer,
        "plotLayouts/main"
      );
      mainImageUrl = result.secure_url;
    }

    // Upload each icon image
    const uploadedIcons = [];
    if (req.files?.icons) {
      for (let i = 0; i < req.files.icons.length; i++) {
        const iconFile = req.files.icons[i];
        const uploadedIcon = await uploadImageToCloudinary(
          iconFile.buffer,
          "plotLayouts/icons"
        );
        uploadedIcons.push({
          icon: uploadedIcon.secure_url,
          heading: parsedIcons[i]?.heading || "",
          subheading: parsedIcons[i]?.subheading || "",
        });
      }
    } else {
      // If no new icon images uploaded, use existing ones
      uploadedIcons.push(...(parsedIcons || existingLayout?.icons || []));
    }

    // If record exists → update
    if (existingLayout) {
      existingLayout.mainImage = mainImageUrl;
      existingLayout.icons = uploadedIcons.length
        ? uploadedIcons
        : existingLayout.icons;
      await existingLayout.save();
      return res
        .status(200)
        .json({ message: "Plot layout updated successfully", layout: existingLayout });
    }

    const layout = await PlotLayout.create({
      mainImage: mainImageUrl,
      icons: uploadedIcons,
    });

    res.status(201).json({
      message: "Plot layout created successfully",
      layout,
    });
  } catch (error) {
    console.error("Error in createOrUpdatePlotLayout:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get Plot Layout
export const getPlotLayout = async (req, res) => {
  try {
    const layout = await PlotLayout.findOne();
    if (!layout)
      return res.status(404).json({ message: "No plot layout found" });
    res.status(200).json(layout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Plot Layout
export const deletePlotLayout = async (req, res) => {
  try {
    const layout = await PlotLayout.findOne();
    if (!layout)
      return res.status(404).json({ message: "No plot layout to delete" });

    await PlotLayout.deleteOne({ _id: layout._id });
    res.status(200).json({ message: "Plot layout deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
