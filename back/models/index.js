const Task = require("./task");
const Discipline = require("./discipline");
const TaskRecruit = require("./taskRecruit");
const Recruit = require("./recruit");
const User = require("./user");


TaskRecruit.belongsTo(User);
TaskRecruit.belongsTo(Recruit);
TaskRecruit.belongsTo(Task);
Recruit.belongsTo(User);
Recruit.belongsTo(Discipline);
User.belongsTo(Discipline)
Task.belongsToMany(Discipline, { through: 'discipline_task' });
Discipline.belongsToMany(Task, { through: 'discipline_task' });

module.exports = { Task, Discipline, TaskRecruit, Recruit, User }