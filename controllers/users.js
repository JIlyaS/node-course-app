const User = require('../models/User');
const Permission = require('../models/Permission');

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).populate('permission').exec();
    const updatedUsers = users.map((user) => ({
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      surName: user.surName,
      middleName: user.middleName,
      image: '',
      permission: user.permission.permission,
    }));
    res.json(updatedUsers);
  } catch (err) {
    console.error(err);
  }
}

module.exports.getUserPermission = async (req, res, next) => {
  const id = req.params.id;
  const permission = req.body.permission;
  try {
    const user = await User.findById(id);
    const updatedPermission = await Permission.findByIdAndUpdate({_id: String(user.permission)}, {$set: {permission: permission}}, {new: true, runValidators: true});
    res.json(updatedPermission.permission);
  } catch (err) {
    console.error(err);
  }
}


module.exports.deleteUser = async (req, res, next) => {
    const userId  = req.params.id;

    try {
      await User.findByIdAndDelete(userId);
      res.json(true);
    } catch (err) {
      console.error(err);
    }
}
