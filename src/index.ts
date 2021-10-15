import express, { Request, Response } from 'express'

import { recorder } from './crawler/recorder'
import { scraper } from './crawler/scraper'

const port = 4000 || process.env.PORT
const app = express()

app.get('/api', (req: Request, res: Response) => {
    res.status(201).json('Hello World')
})

// Crawler Service
app.get('/api/scrape', async (req: Request, res: Response) => {
    res.status(201).json('Start Scraper')
    scraper()
})

// Crawler Service
app.get('/api/record', async (req: Request, res: Response) => {
    res.status(201).json('Start Recorder')
    recorder()
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
