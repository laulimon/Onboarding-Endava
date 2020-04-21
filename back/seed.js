const { Recruit, User, Discipline, Task, TaskRecruit } = require("./models/index")

// SEED DISCIPLINES //
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
        description: "Pdrc",
    },
])
    .then(disciplines => {
        console.log("Creaste las disciplinas")
        User.create({
            name: "Martin",
            lastName: "Gonzalez",
            email: "m.gonzalez@endava.com",
            password: "123",
            disciplineId: 2
        })
    })
