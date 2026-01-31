import CareerRole from '../../models/careersPage/careerRoleModel.js';

// CREATE ROLE
export const createCareerRole = async (req, res) => {
  try {
    const { role, location } = req.body;

    if (!role || !location) {
      return res.status(400).json({ message: 'Role and location required' });
    }

    const newRole = await CareerRole.create({ role, location });

    res.status(201).json({
      message: 'Role created successfully',
      role: newRole,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL ROLES
export const getCareerRoles = async (req, res) => {
  const roles = await CareerRole.find({ isActive: true }).sort({
    createdAt: -1,
  });
  res.json(roles);
};

// DELETE ROLE
export const deleteCareerRole = async (req, res) => {
  await CareerRole.findByIdAndDelete(req.params.id);
  res.json({ message: 'Role deleted' });
};
