const { Recruit, User, Discipline, Task, TaskRecruit } = require("./models/index")

Discipline.bulkCreate([
    {
        description: "Development",
    },
    {
        description: "Project Manager",
    },
    {
        description: "Testing",
    },
    {
        description: "PDRC",
    },
    {
        description: "HR"
    }
])
    .then(() => {
        console.log("1/5 - Creaste las disciplinas")
        return User.create({
            name: "Martin",
            lastName: "Gonzalez",
            email: "m.gonzalez@endava.com",
            password: "123",
            disciplineId: 5,
            isAdmin: true
        })

    })
    .then(() => {
        console.log("2/5 - Creaste al usuario Admin")
        return Task.bulkCreate([
            {
                description: "Register corporate mail @endava.com",
            },
            {
                description: "Prepare work desk",
            },
            {
                description: "Assign Buddy",
            },
            {
                description: "Buddy meeting",
            },
            {
                description: "Kit welcome Endava "
            }
        ])

    })
    .then(() => {
        console.log("3/5 - Creaste el listado de tareas disponibles")
        return Recruit.create({
            name: "Laura",
            lastName: "Limon Molina",
            email: "l.limon@endava.com",
            entryDate: "2020/05/05",
            phone: 1131628276,
            DNI: 123456789,
            disciplineId: 1,
            userId: 1
        })
    })
    .then(() => {
        console.log("4/5 - Creaste un nuevo ingresante")
        return TaskRecruit.create({
            dueDate: "2020/05/01",
            comment: "requested to IT",
            state: "started",
            userId: 1,
            recruitId: 1,
            taskId: 1,
        })
            .then(() => {
                return TaskRecruit.create({
                    dueDate: "2020/05/01",
                    comment: "neet to buy a new one",
                    state: "blocked out",
                    userId: 1,
                    recruitId: 1,
                    taskId: 2
                })

            })
            .then(() => {
                return TaskRecruit.create({
                    dueDate: "2020/05/01",
                    userId: 1,
                    recruitId: 1,
                    taskId: 3
                })

            })
    })
    .then(() => console.log("5/5 - Creaste las tareas asignadas a un nuevo ingresante"))

