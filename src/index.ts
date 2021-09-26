import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { SearchService } from './es/search'

const port = 4000 || process.env.PORT
const app = express()

app.use(bodyParser.json())

app.get('/api', (req: Request, res: Response) => {
    res.status(201).json('Hello World')
})

// Crawler Service

app.get('/api/crawl', async (req: Request, res: Response) => {
    res.status(201).json('Start Crawler')
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
