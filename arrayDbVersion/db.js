class usersStorage{
    constructor(){
        this.storage = []
        this.id = 0
    }

    addUser({firstName, lastName, age, phone, email, bio}){
        const id = this.id
        this.storage[id] = {id ,firstName, lastName, age, phone, email, bio}
        this.id++
        console.log(this.storage)
    }

    getUser(){
        return Object.values(this.storage)
    }

    getUsers(id){
        return this.storage[id]
    }

    updateUser(id, {firstName, lastName, age, phone, email, bio}){
        this.storage[id] = {id, firstName, lastName, age, phone, email, bio}
    }

    deleteUser(id){
        delete this.storage[id]
    }
    
}

const classInstance = new usersStorage()

export default classInstance