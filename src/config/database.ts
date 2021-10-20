import { Pool } from 'pg'
import config from './index'

export const crawlerDB = new Pool({
    user: config.psUsername,
    host: config.psHost,
    password: config.psPassword,
    database: config.crawlerDB,
    port: Number(config.crawlerPort)
})
