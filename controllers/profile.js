const path = require('path');
const fs = require('fs');
const formidable = require('formidable');

const { validation } = require('../lib/validation');

const User = require('../models/User');

module.exports.getProfile = async (req, res, next) => {

  try {
    const user = await User.findById(String(req.user._id)).populate('permission');
    return res.json({
          id: user._id,
          username: user.username,
          firstName: user.firstName,
          surName: user.surName,
          middleName: user.middleName,
          image: user.image,
          permission: user.permission.permission,
      });
  } catch (err) {
    console.error(err);
  }  
}

module.exports.updateProfile = (req, res, next) => {
  let updateUser = {};
  const form = new formidable.IncomingForm();

  const upload = path.join('./public', 'upload');
  form.uploadDir = path.join(process.cwd(), upload);

  form.parse(req, async function (err, fields, files) {
    if (err) {
      return next(err);
    }

    const valid = validation(fields, files);

    if (valid.err) {
      if (Object.keys(files).length !== 0) {
        fs.unlinkSync(files.avatar.path);
      }
      console.error(valid.status);
      res.status(400).json({message: valid.status});
    }

    updateUser = {
      firstName: fields.firstName,
      surName: fields.surName,
      middleName: fields.middleName, 
      oldPassword: fields.oldPassword,
      newPassword: fields.newPassword,
    }

    if (Object.keys(files).length !== 0) {
      const fileName = path.join(process.cwd(), 'public/assets/img/users/', files.avatar.name);
      fs.renameSync(files.avatar.path, fileName);
      updateUser.image = path.join('./assets/img/users/', files.avatar.name);
    }
    try {
      const user = await User.findByIdAndUpdate({_id: String(req.user._id)}, updateUser, {new: true, runValidators: true}).populate('permission');
      return res.json({
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        surName: user.surName,
        middleName: user.middleName,
        image: user.image,
        permission: user.permission.permission,
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({message: 'Ошибка обновления данных пользователя!'});
    }
  });
}
