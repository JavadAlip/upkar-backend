import PlotLayout from "../../models/projectPage/plotLayoutModel.js";
import { uploadImageToCloudinary } from "../../config/cloudinaryUpload.js";

export const createPlotLayout = async (req, res) => {
  try {
    const { icons } = req.body;

    // Parse icon text data (heading, subheading)
    const parsedIcons = typeof icons === "string" ? JSON.parse(icons) : icons || [];

    // Upload main image
    let mainImageUrl = "";
    if (req.files?.mainImage?.[0]) {
      const uploaded = await uploadImageToCloudinary(
        req.files.mainImage[0].buffer,
        "plotLayouts/main"
      );
      mainImageUrl = uploaded.secure_url;
    }

    // Upload unlimited icons
    const uploadedIcons = [];
    if (req.files?.icons) {
      for (let i = 0; i < req.files.icons.length; i++) {
        const uploaded = await uploadImageToCloudinary(
          req.files.icons[i].buffer,
          "plotLayouts/icons"
        );
        uploadedIcons.push({
          icon: uploaded.secure_url,
          heading: parsedIcons[i]?.heading || "",
          subheading: parsedIcons[i]?.subheading || "",
        });
      }
    }

    // Create a new layout (no restriction on count)
    const layout = await PlotLayout.create({
      mainImage: mainImageUrl,
      icons: uploadedIcons,
    });

    res.status(201).json({
      message: "Plot layout created successfully",
      layout,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


// Get Plot Layouts
export const getPlotLayout = async (req, res) => {
  try {
    const layouts = await PlotLayout.find(); 
    if (!layouts || layouts.length === 0)
      return res.status(404).json({ message: "No plot layouts found" });

    res.status(200).json(layouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updatePlotLayout = async (req, res) => {
  try {
    const { id } = req.params;
    const { icons } = req.body;
    const parsedIcons = typeof icons === "string" ? JSON.parse(icons) : icons || [];

    const layout = await PlotLayout.findById(id);
    if (!layout) return res.status(404).json({ message: "Plot layout not found" });

    // Update mainImage if new file uploaded
    if (req.files?.mainImage?.[0]) {
      const uploaded = await uploadImageToCloudinary(
        req.files.mainImage[0].buffer,
        "plotLayouts/main"
      );
      layout.mainImage = uploaded.secure_url;
    }

    const updatedIcons = [...layout.icons]; 

    if (req.files?.icons) {
      for (let i = 0; i < req.files.icons.length; i++) {
        const uploaded = await uploadImageToCloudinary(
          req.files.icons[i].buffer,
          "plotLayouts/icons"
        );
        updatedIcons.push({
          icon: uploaded.secure_url,
          heading: parsedIcons[i]?.heading || "",
          subheading: parsedIcons[i]?.subheading || "",
        });
      }
    }

    // Update headings/subheadings for existing icons if changed
    for (let i = 0; i < parsedIcons.length; i++) {
      if (updatedIcons[i]) {
        updatedIcons[i].heading = parsedIcons[i].heading || updatedIcons[i].heading;
        updatedIcons[i].subheading = parsedIcons[i].subheading || updatedIcons[i].subheading;
      }
    }

    layout.icons = updatedIcons;

    await layout.save();

    res.status(200).json({
      message: "Plot layout updated successfully",
      layout,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};



// Delete Plot Layout
export const deletePlotLayout = async (req, res) => {
  try {
    const { id } = req.params;

    const layout = await PlotLayout.findById(id);
    if (!layout)
      return res.status(404).json({ message: "No layout found" });

    await PlotLayout.findByIdAndDelete(id);

    res.status(200).json({ message: "Plot layout deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
