const express = require('express');
const { Task, TaskRecruit, User, Recruit } = require("../models/index")
const router = express.Router();
const Sequelize = require("sequelize")



router.post("/newTask", function (req, res, next) {
    Task.create(req.body)
        .then(() => Task.findAll()
            .then(tasksList => res.status(200).json(tasksList)))
        .catch(err => console.log(err)
        )
})

router.put("/edit/:id", function (req, res, next) {
    const taskId = req.params.id
    const newState = req.body.taskState
    const newComment = req.body.comment
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd

    TaskRecruit.update(
        { comment: newComment, state: newState, finishDate: (newState == "finished") ? today : null },
        { where: { id: taskId } }
    )
        .then(TaskRecruit.findAll({
            include: [
                { model: Recruit },
                { model: Task }
            ],
        }))
        .then((allTasks) => res.status(200).json(allTasks))
        .catch(next)
})

router.get('/', function (req, res, next) {
    TaskRecruit.findAll({
        include: [
            { model: Recruit },
            { model: Task }
        ],
    })
        .then((allTasks) => res.status(200).json(allTasks))
});

router.get("/myTasks/:id", function (req, res) {
    const Op = Sequelize.Op
    const id = req.params.id
    if (req.query.s) {
        TaskRecruit.findAll({
            include: [
                {
                    model: Recruit,
                },
                { model: Task }
            ],
            where: {
                userId: id,
            },
            order: [
                ['id', 'DESC'],
            ],
        })
        .then(tasks => tasks.filter(task => {
            let fullName = `${task.recruit.name} ${task.recruit.lastName}`
            let fullNameMin = fullName.toLowerCase()
            let query= req.query.s
            let queryMin = query.toLowerCase()
            return fullNameMin.includes(queryMin)
            }))
            .then(tasks => res.send(tasks))
    } else {
        TaskRecruit.findAll({
            include: [
                { model: Recruit },
                { model: Task }
            ],
            where: { userId: id },
            order: [
                ['id', 'DESC'],
            ],
        })
            .then(tasks => res.send(tasks))
    }
})

router.get("/myFinishedTasks/:id", function (req, res) {
    const Op = Sequelize.Op
    const id = req.params.id
    if (req.query.s) {
        TaskRecruit.findAll({
            include: [
                {
                    model: Recruit,
                },
                { model: Task }
            ],
            where: {
                userId: id,
                state: "finished"
            },
            order: [
                ['id', 'DESC'],
            ],
        })
        .then(tasks => tasks.filter(task => {
            let fullName = `${task.recruit.name} ${task.recruit.lastName}`
            let fullNameMin = fullName.toLowerCase()
            let query= req.query.s
            let queryMin = query.toLowerCase()
            return fullNameMin.includes(queryMin)
            }))
            .then(tasks => res.send(tasks))
    } else {
        TaskRecruit.findAll({
            include: [
                { model: Recruit },
                { model: Task }
            ],
            where: { userId: id, state: "finished" },
            order: [
                ['id', 'DESC'],
            ],
        })
            .then(tasks => res.send(tasks))
    }
})

router.get("/recruit/:id", function (req, res) {
    const id = req.params.id

    TaskRecruit.findAll({
        include: [
            { model: Task },
            { model: User }
        ],
        where: { recruitId: id },
        order: [
            ['id', 'DESC'],
        ],
    })
        .then(tasks => res.send(tasks))
})

router.get("/allTasks", (req, res) => {
    const Op = Sequelize.Op

    if (req.query.s) {
        TaskRecruit.findAll({
            include: [
                {model: Recruit},
                { model: Task },
                { model: User }
            ]
        })
            .then(tasks => tasks.filter(task => {
            let fullName = `${task.recruit.name} ${task.recruit.lastName}`
            let fullNameMin = fullName.toLowerCase()
            let query= req.query.s
            let queryMin = query.toLowerCase()
            return fullNameMin.includes(queryMin)
            }))
            .then(allTasks => res.status(200).json(allTasks))
    } else if (req.query.t) {
        TaskRecruit.findAll({
            include: [
                { model: Recruit },
                { model: Task },
                { model: User,}
            ]
        })
            .then(tasks => tasks.filter(task => {
            let fullName = `${task.user.name} ${task.user.lastName}`
            let fullNameMin = fullName.toLowerCase()
            let query= req.query.t
            let queryMin = query.toLowerCase()
            return fullNameMin.includes(queryMin)
            }))
            .then(allTasks => res.status(200).json(allTasks))
    } else {
        TaskRecruit.findAll({
            include: [
                { model: Recruit },
                { model: Task },
                { model: User }
            ]
        })
            .then(allTasks => res.status(200).json(allTasks))
    }

})

router.get("/allFinishedTasks", (req, res) => {
    const Op = Sequelize.Op

    if (req.query.s) {
        TaskRecruit.findAll({
            where:{ state: "finished"},
            include: [
                {model: Recruit},
                { model: Task },
                { model: User }
            ]
        })
            .then(tasks => tasks.filter(task => {
            let fullName = `${task.recruit.name} ${task.recruit.lastName}`
            let fullNameMin = fullName.toLowerCase()
            let query= req.query.s
            let queryMin = query.toLowerCase()
            return fullNameMin.includes(queryMin)
            }))
            .then(allTasks => res.status(200).json(allTasks))
    } else if (req.query.t) {
        TaskRecruit.findAll({
            where:{ state: "finished"},
            include: [
                { model: Recruit },
                { model: Task },
                { model: User,}
            ]
        })
            .then(tasks => tasks.filter(task => {
            let fullName = `${task.user.name} ${task.user.lastName}`
            let fullNameMin = fullName.toLowerCase()
            let query= req.query.t
            let queryMin = query.toLowerCase()
            return fullNameMin.includes(queryMin)
            }))
            .then(allTasks => res.status(200).json(allTasks))
    } else {
        TaskRecruit.findAll({
            where:{ state: "finished"},
            include: [
                { model: Recruit },
                { model: Task },
                { model: User }
            ]
        })
            .then(allTasks => res.status(200).json(allTasks))
    }

})

router.get("/tasksList", (req, res) => {
    const Op = Sequelize.Op

    if (req.query.s) {
        Task.findAll({
            where: {description: { [Op.iLike]: `%${req.query.s}%` }}
        })
        .then(tasksList => res.status(200).json(tasksList))
    } else {
        Task.findAll()
        .then(tasksList => res.status(200).json(tasksList))
    }
})


router.get("/:id", (req, res) => {
    const id = req.params.id
    TaskRecruit.findAll({
        include: [
            { model: Recruit },
            { model: Task }
        ],
        where: {
            id: id
        }


    })
        .then(task => res.send(task[0]))
})

router.post('/', function (req, res, next) {
    TaskRecruit.create(req.body)
        .then(nuevaTaskRec => {
            return Promise.all([
                nuevaTaskRec.setDiscipline(req.body.discipline),
                nuevaTaskRec.setUser(req.body.user),
                nuevaTaskRec.setRecruit(req.recruit)
            ])
        })
        .then((nuevaTaskRec) => res.status(201).json(nuevaTaskRec))
});

router.delete("/:id", (req, res, next) => {
    Task.findByPk(req.params.id)
        .then(task => {
            if (task) {
                task.destroy()
                    .then(() => res.sendStatus(204))
            } else {
                res.sendStatus(404)
            }

        })
        .catch(err => res.sendStatus(500))
})

router.delete("byRecruit/:recruitId", (req, res, next) => {
    TaskRecruit.findAll({
        where: {
            recruitId: req.params.recruitId,
        }
    })
        .then(tasks => {
            if (tasks) {
                tasks.destroy()
                    .then(() => res.sendStatus(204))
            } else {
                res.sendStatus(404)
            }

        })
        .catch(err => res.sendStatus(500))
})

router.put(`/editAvailableTask/:taskId`, (req, res, next) => {
    let taskId = req.params.taskId
    let newDescription = req.body.description
    Task.update({ description: newDescription }, { where: { id: taskId } })
        .then(Task.findAll()
            .then(tasksList => res.status(200).send(tasksList))
            .catch(err => res.sendStatus(500))
        )
        .catch(err => res.sendStatus(500))
})


module.exports = router



