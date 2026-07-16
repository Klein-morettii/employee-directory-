import {Pool} from 'pg'

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

async function getUser(){
    const { rows } = await pool.query("SELECT * FROM employee_table")
    return rows
}

/* $1 here is  just a placeholder, can be used for anything */
async function createUser(employee){
    await pool.query("INSERT INTO employee_table (first_name, last_name, dob, phone_no, email, bio) VALUES ($1, $2, $3, $4, $5, $6)",
        [
            employee.first_name,
            employee.last_name,
            employee.dob,
            employee.phone_no,
            employee.email,
            employee.bio
        ]
    )
}

/* needed to get all the info to the updat view page */
async function getSingleUser(id){
    const { rows } = await pool.query("SELECT * FROM employee_table WHERE id=$1", 
        [id])
    return rows[0]
}

/* this on the other hand actually updates when user inputs data */
async function updateUser(id, employee){
    await pool.query ("UPDATE employee_table SET first_name=$1, last_name=$2, dob=$3, phone_no=$4, email=$5, bio=$6 WHERE id = $7",
        [
            employee.first_name,
            employee.last_name,
            employee.dob,
            employee.phone_no,
            employee.email,
            employee.bio,
            id
        ]
    )
}

async function deleteUser(id){
    await pool.query("DELETE FROM employee_table WHERE id=$1", [id])
}
export default {getUser, createUser, getSingleUser, updateUser, deleteUser}