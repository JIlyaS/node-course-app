const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/users');

router.get('/', ctrlUser.getUsers);
router.patch('/:id/permission', ctrlUser.getUserPermission);
router.delete('/:id', ctrlUser.deleteUser);

module.exports = router
