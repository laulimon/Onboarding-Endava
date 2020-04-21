const express = require('express');
const router = express.Router();
const recruits = require("./recruit")
const users = require("./user")
const tasks = require("./task")
const disciplines = require("./discipline")
const taskRecruit = require("./taskRecruit")

router.use("/api/user", users)
router.use("/api/recruit", recruits)
router.use("/api/task", tasks)
router.use("/api/taskRecruit", taskRecruit)
router.use("/api/discipline", disciplines)


module.exports = router