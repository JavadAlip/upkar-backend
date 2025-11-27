import AboutProject from '../../models/projectPage/aboutprojectModel.js';

export const createAboutProject = async (req, res) => {
  try {
    const {
      aboutHeading,
      aboutDescription,
      reRaising,
      reRadescription,
      noBrokerHeading,
      builderHeading,
    } = req.body;

    const aboutProject = new AboutProject({
      aboutHeading,
      aboutDescription,
      reRaising,
      reRadescription,
      noBrokerHeading,
      builderHeading,
    });

    await aboutProject.save();
    res
      .status(201)
      .json({ message: 'AboutProject content created', aboutProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAboutProjects = async (req, res) => {
  try {
    const aboutProjects = await AboutProject.find();
    res.status(200).json(aboutProjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAboutProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const aboutProject = await AboutProject.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!aboutProject)
      return res.status(404).json({ message: 'AboutProject not found' });

    res.status(200).json({ message: 'AboutProject updated', aboutProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAboutProject = async (req, res) => {
  try {
    const { id } = req.params;
    const aboutProject = await AboutProject.findByIdAndDelete(id);

    if (!aboutProject)
      return res.status(404).json({ message: 'AboutProject not found' });

    res.status(200).json({ message: 'AboutProject deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
