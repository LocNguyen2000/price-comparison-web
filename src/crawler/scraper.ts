// Scraper is used to crawl list of products in each shop

import puppeteer from 'puppeteer'

import { logger } from '../utils/logger'
import { saveFile } from '../utils/helper'
import { CrawlDetailDto, CrawlerBaseInfo } from './dto/scraper.dto'

const generateURLs = (datas: CrawlerBaseInfo[]) => {
    let urls: CrawlDetailDto[] = []

    logger.info('[scraper] generating URLs from base')

    for (let data of datas) {
        const { startPage, endPage, pathPrefix, pathSuffix } = data
        const { linkSelector } = data.selector

        let i = startPage
        while (i <= endPage) {
            let pathWithParam = data.baseUrl + pathPrefix + i + pathSuffix

            logger.info(`[scraper] ${pathWithParam}`)
            i++
            let url: CrawlDetailDto = {
                path: pathWithParam,
                selector: linkSelector,
            }
            urls.push(url)
        }
    }
    return urls
}

export const scrapeUris = async (infos: CrawlerBaseInfo[]) => {
    let URLs = generateURLs(infos)
    let DetailProductsUrls: string[] = []

    logger.info('-----------')
    logger.info('[scraper] Getting Detail Products URLs')

    try {
        const browser = await puppeteer.launch({ headless: true })

        const page = await browser.newPage()
        page.setDefaultNavigationTimeout(0)

        await page.setUserAgent(
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'
        )
        for (let url of URLs) {
            const { path, selector } = url

            logger.info(`[scraper] Scraping at: ${path}`)

            await page.goto(path, { waitUntil: 'networkidle2' })

            await page.setViewport({
                width: 1560,
                height: 1000,
            })
            await page.waitForSelector(selector, { timeout: 3000 })

            const results: string[] = await page.evaluate((selector) => {
                let productsUrls: any[] = []

                const selectorProduct = selector
                let htmls = document.querySelectorAll(selectorProduct)

                htmls.forEach((html: any) => {
                    if (html.href) productsUrls.push(html.href)
                })
                return productsUrls
            }, selector)

            results.map((url: string) => {
                DetailProductsUrls.push(url)
            })

            await saveFile(DetailProductsUrls, 'detail_urls.json')
        }
        await browser.close()
    } catch (error) {
        logger.error(error.message)
        throw error.message
    }
}