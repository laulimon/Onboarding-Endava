const { User } = require("./models/index")

// SEED USERS //
User.create({
    name: "Celeste",
    lastName: "Colamarino",
    email: "celeste@endava.com",
    password: "123",
    disciplineId: 1,
    isAdmin: true
})
User.create({
    name: "Ignacio",
    lastName: "Rodriguez Villasuso",
    email: "nacho@endava.com",
    password: "123",
    disciplineId: 2
})
User.create({
    name: "Martin",
    lastName: "Gonzalez",
    email: "martin@endava.com",
    password: "123",
    disciplineId: 3
})
User.create({
    name: "Fernanda",
    lastName: "Fernanda",
    email: "fernanda@endava.com",
    password: "123",
    disciplineId: 4
})

// ------------------------------------- //
