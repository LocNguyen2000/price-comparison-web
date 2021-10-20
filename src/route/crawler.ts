import express, { Request, Response } from 'express'

import { scraper } from '../crawler/scraper'
import { recorder } from '../crawler/recorder'
import { logger } from '../utils/logger'
import { getData } from '../utils/helper'

const router = express.Router()

router.get('/scrape', async (req: Request, res: Response) => {
    try {   
        logger.info('Start Scraper')
        scraper()
    } catch (error) {
        res.status(500).json(error.message)
    }
})
router.post('/record', async (req: Request, res: Response) => {
    logger.info('Start Recorder')
    try {
        const { url } = req.body
        logger.info(url)
        recorder(url).then(() => {
            let selectorsPath = './output/selectors.json'
            const data = getData(selectorsPath) as string[]
            console.log(data)

            res.status(201).json(data)
            logger.info(`${data}`)
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
})

export default router
