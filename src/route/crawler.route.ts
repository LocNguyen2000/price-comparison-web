import express from 'express'
import { getProductUris, recordSelector } from '../crawler/crawler.controller'

const router = express.Router()

router.post('/scrape', getProductUris)
router.post('/record', recordSelector)
// router.post('/worker', runWorker)

export default router
