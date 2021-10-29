import { Request, Response } from 'express'

import { getData } from '../utils/helper'
import { logger } from "../utils/logger"
import { CrawlerBaseInfo } from './dto/scraper.dto'
import { scrapeUris } from "./scraper"
import { recorder } from "./recorder"

export const getProductUris = async (req: Request, res: Response) => {
    try {
        const baseData = req.body as CrawlerBaseInfo
        
        await scrapeUris([ baseData ])
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const recordSelector = async (req: Request, res: Response) => {
    try {
        const { url } = req.body
        await recorder(url).then(() => {
            let selectorsPath = './output/selectors.json'
            const data = getData(selectorsPath) as string[]
            console.log(data)

            res.status(201).json(data)
            logger.info(`${data}`)
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const runWorker = async () => {

}
