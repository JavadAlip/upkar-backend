import Team from '../../models/aboutusPage/teamModel.js';
import { uploadImageToCloudinary } from '../../config/cloudinaryUpload.js';

export const createTeamMember = async (req, res) => {
  try {
    const { memberName, memberPosition } = req.body;

    if (!memberName || !memberPosition) {
      return res
        .status(400)
        .json({ success: false, message: 'Name and position are required' });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: 'Member image is required' });
    }

    const imgRes = await uploadImageToCloudinary(
      req.file.buffer,
      'team/members'
    );

    const member = await Team.create({
      memberName,
      memberPosition,
      memberImage: imgRes.secure_url,
    });

    res.status(201).json({
      success: true,
      message: 'Team member created successfully',
      member,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllTeamMembers = async (req, res) => {
  try {
    const members = await Team.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, members });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { memberName, memberPosition } = req.body;

    const member = await Team.findById(id);
    if (!member)
      return res
        .status(404)
        .json({ success: false, message: 'Team member not found' });

    if (memberName) member.memberName = memberName;
    if (memberPosition) member.memberPosition = memberPosition;

    if (req.file) {
      const imgRes = await uploadImageToCloudinary(
        req.file.buffer,
        'team/members'
      );
      member.memberImage = imgRes.secure_url;
    }

    await member.save();
    res.status(200).json({
      success: true,
      message: 'Team member updated successfully',
      member,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Team.findById(id);
    if (!member)
      return res
        .status(404)
        .json({ success: false, message: 'Team member not found' });

    await Team.deleteOne({ _id: id });
    res
      .status(200)
      .json({ success: true, message: 'Team member deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
