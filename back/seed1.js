const { User } = require("./models/index")

// SEED USERS //
User.create({
    //id: 1,
    name: "Celeste",
    lastName: "Colamarino",
    email: "celeste@endava.com",
    password: "123",
    disciplineId: 1,
    isAdmin:true
})
User.create({
    //id: 2,
    name: "Ignacio",
    lastName: "Rodriguez Villasuso",
    email: "nacho@endava.com",
    password: "123",
    disciplineId: 2
})
User.create({
    //id: 3,
    name: "Martin",
    lastName: "Gonzalez",
    email: "martin@endava.com",
    password: "123",
    disciplineId: 3
})
User.create({
    //id: 4,
    name: "Fernanda",
    lastName: "Fernanda",
    email: "fernanda@endava.com",
    password: "123",
    disciplineId: 4
})

// ------------------------------------- //
