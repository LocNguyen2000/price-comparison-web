import express, { Request, Response } from 'express'
import cors from 'cors'

import { recorder } from './crawler/recorder'
import { scraper } from './crawler/scraper'
import { logger } from './utils/logger'
import { getData } from './utils/index'

const port = 4000 || process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Crawler Service 
// 1. scrape
app.get('/api/scrape', async (req: Request, res: Response) => {
    logger.info('Start Scraper')
    scraper()
})

// 2. record
app.post('/api/record', async (req: Request, res: Response) => {
    logger.info('Start Recorder')
    try {
        const { url } = req.body
        logger.info(url)
        recorder(url).then(() => {
            let selectorsPath = './output/selectors.json'
            const data =  getData(selectorsPath) as string[]
            console.log(data);
            
            res.status(201).json(data)
            logger.info(`${data}`)
        })
    } catch (error) {
        res.status(400).json(error)
    }

})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
