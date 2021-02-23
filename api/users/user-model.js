const db = require('../../database/connection.js')


const find = () => {
    return db('users').select('id', 'username').orderBy('id')
}


const findBy = (filter) => {
    return db('users').where(filter).orderBy('id')
}


const findById = (id) => {
    return db('users').where({id}).first()
}


const add = async (user) => {
    const [id] = await db('users').insert(user, 'id')
    return findById(id)
}


module.exports = {
    find,
    findBy,
    findById,
    add
}