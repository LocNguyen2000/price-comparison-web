import express, { Request, Response } from 'express'

const port = 4000 || process.env.PORT
const app = express()

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
