import express from 'express'
import routes from './routes'
import DatabaseConfig from './config/database/sequelize.config'

export class App {

    constructor() {
        this.server = express()
        this.url = process.env.URL || '0.0.0.0'
        this.port = process.env.PORT || '9000'
        this.nodeEnv = process.env.NODE_ENV || 'development'
        this.middleware()
        this.routes()
        this.listen()
    }

    getServer() {
        return this.server
    }

    middleware() {
        this.server.use(express.json())
    }

    routes() {
        this.server.use(routes)
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server running in ${this.nodeEnv} mode on http://${this.url}:${this.port}`)
        })
    }
}