import * as dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

export default {
    port: process.env.PORT,
    psUsername: process.env.PS_USERNAME,
    psPassword: process.env.PS_PASSWORD,
    psHost: process.env.PS_HOST,
    crawlerDB: process.env.CRAWLER_DATABASE,
    crawlerPort: process.env.CRAWLER_PORT
}
