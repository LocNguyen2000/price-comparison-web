import express from 'express'
import cors from 'cors'

import crawlerRoute from './route/crawler.route'

const port = 4000 || process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Crawler Service 
app.use('/crawler', crawlerRoute)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
