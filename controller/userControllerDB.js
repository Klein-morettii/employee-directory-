import db from '../database/queries.js'
import {body, validationResult, matchedData} from 'express-validator'


/* batch of error msgs to be used */
const alphaErr = "must only contain letters."
const lengthErr = "must be between 1 and 15 characters."
const ageErr = "Cannot be in future"
const numLengthErr = "must be between 10 to 15 characters."
const emailErr = "must be a valid email."
const ageNan = "must be a number."

/* array of validation rules the form input has to go through */

const validatingUser = [
    body("first_name").trim()
        .isAlpha().withMessage(`First Name ${alphaErr}`)
        .isLength({min:1, max:15}).withMessage(`First Name ${lengthErr}`),

    body("last_name").trim()
        .isAlpha().withMessage(`First Name ${alphaErr}`)
        .isLength({min:1, max:15}).withMessage(`First Name ${lengthErr}`),

    body("dob")
        .isDate()
        .custom((value) =>{
            const dob = new Date(value)
            if(dob> new Date()){
                throw new Error(`Date of Birth ${ageErr}`)
            }
            return true;
        }),

    body("phone_no").trim()
            .isNumeric().withMessage(`Phone Number ${ageNan}`)
            .isLength({min:10, max:15}).withMessage(`Phone Number ${numLengthErr}`),

    body("email").trim()
            .isEmail().withMessage(`Email ${emailErr}`),

    body("bio").trim()

    ]


/* rest are the controllers that link forms and database or osmething */
async function getUserList(req, res){
    const users = await db.getUser()
    res.render("index", {
        title: "EMPLOYEE DIRECTORY",
        user: users
    })
}

function getCreateUserGet(req, res){
    res.render("create", {
        title: "CREATE USER"
    })
}

const getCreateUserPost = [
    validatingUser,
    async (req, res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).render("create", {
                title: "Create User",
                errors: errors.array()
            })
        }

        const { first_name, last_name, dob, phone_no, email, bio } = matchedData(req)
        await db.createUser({ first_name, last_name, dob, phone_no, email, bio })
        res.redirect("/")
    }
]

async function getUpdateUserGet(req, res){
    const user = await db.getSingleUser(Number(req.params.id))

    if(!user){
        res.status(400).send("user does not exist")
    }

    else{
        res.render("update", {
            title: "UPDATE USER",
            user
        })
    }
}
  
const getUpdateUserPost = [
    validatingUser,
    async (req, res)=>{
         const user = db.getSingleUser(Number(req.params.id))
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).render("update", {
                    title: "Update User",
                    user,
                    errors: errors.array()
                })
            }
        const {first_name, last_name, dob, phone_no, email, bio} = matchedData(req)
        console.log(req.body);
        console.log(matchedData(req));
        await db.updateUser(Number(req.params.id), {first_name, last_name, dob, phone_no, email, bio})
        res.redirect("/")
    }
]

async function usersDelete(req, res){
    await db.deleteUser(req.params.id)
    res.redirect("/")
}

export default { getUserList, getCreateUserGet, getCreateUserPost, getUpdateUserGet, getUpdateUserPost, usersDelete}