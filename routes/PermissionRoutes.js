const express = require("express");
const router = express.Router();
const permission = require("../controller/PermissionController");
const verify = require("../middleware/verifyToken")
router.post('/submit',verify,permission.permissionHandler)
router.get('/list',permission.permissionListHandler)
module.exports = router;