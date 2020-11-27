import env from 'dotenv'

env.config()

export default {
    secret: process.env.SECRET || 'SECRET',
    expiresIn: process.env.EXPIRES || '1d',
}