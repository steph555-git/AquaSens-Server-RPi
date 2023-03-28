const db = require('../app')

const getQueryFullName = async () => {
    try {
        const usersCollection = db.db.collection('users')

        const query = { username: 'horlogerie@alabonneheure.fr' }
        const user = await usersCollection.findOne(query)
        return user
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = getQueryFullName
