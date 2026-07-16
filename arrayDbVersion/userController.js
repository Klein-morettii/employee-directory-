import usersStorage from '../database/db.js'
import { body, validationResult, matchedData } from 'express-validator' 

const alphaErr = "must only contain letters."
const lengthErr = "must be between 1 and 10 characters."
const ageErr = "must be between 18 and 75"
const ageNan = "must be a number."
const numLengthErr = "must be between 10 to 15 characters."
const emailErr = "must be a valid email."

const validateUser = [
    body("firstName").trim()
        .isAlpha().withMessage(`First Name ${alphaErr}`)
        .isLength({min:1, max:15}).withMessage(`First Name ${lengthErr}`),
    body("lastName").trim()
        .isAlpha().withMessage(`Last Name ${alphaErr}`)
        .isLength({min:1, max:15}).withMessage(`Last Name ${lengthErr}`),
    body("age").trim()
        .isNumeric().withMessage(`Age ${ageNan}`)
        .isInt({min:18, max: 75}),
    body("phone").trim()
        .isNumeric().withMessage(`Phone Number ${ageNan}`)
        .isLength({min:10, max:15}).withMessage(`Phone Number ${numLengthErr}`),
    body("email").trim()
        .isEmail().withMessage(`Email ${emailErr}`),
    body("bio").trim()

]

function getUserList(req, res){
    console.log(usersStorage.getUsers());
    res.render("index", {
        title: "EMPLOYEE DIRECTORY",
        user: usersStorage.getUser(),
    })
}

function getCreateUserGet(req, res){
    res.render("create", {
        title: "Create User",
    })
}
const getCreateUserPost = [
    validateUser,
    (req, res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).render("create", {
                title: "Create User",
                errors: errors.array()
            })
        }

        const { firstName, lastName, age, phone, email, bio } = matchedData(req)
        usersStorage.addUser({ firstName, lastName, age, phone, email, bio })
        res.redirect("/")
    }
]

function getUpdateUserGet(req, res){
    const user = usersStorage.getUsers(Number(req.params.id))

    console.log(req.params)
    console.log(user)

    if (!user) {
        return res.status(404).send("User not found")
    }

    res.render("update", {
        title: "Update User",
        user: user
    })

    console.log("URL ID:", req.params.id)
console.log("ALL USERS:", usersStorage.getUser())
console.log("FOUND USER:", usersStorage.getUsers(Number(req.params.id)))
}
const getUpdateUserPost = [
        validateUser,
        (req, res)=>{
            const user = usersStorage.getUsers(Number(req.params.id))
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).render("update", {
                    title: "Update User",
                    user,
                    errors: errors.array()
                })
            }
        const {firstName, lastName, age, phone, email, bio} = matchedData(req)
        usersStorage.updateUser(Number(req.params.id), {firstName, lastName, age, phone, email, bio})
        res.redirect("/")
    }
]

function usersDelete(req, res){
    usersStorage.deleteUser(req.params.id)
    res.redirect("/")
}

export default {getUserList, getCreateUserGet, getCreateUserPost, getUpdateUserGet, getUpdateUserPost, usersDelete}