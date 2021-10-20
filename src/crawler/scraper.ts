// Scraper is used to crawl list of products in each shop

// TODO: define scraper table for DB crawler

import puppeteer from 'puppeteer'

import { logger } from '../utils/logger'
import { saveFile } from '../utils/helper'
import infos from './data/info.json'
import { CrawlDetailDto, CrawlerInfo } from './dto/crawler.dto'

const generateURLs = (datas: CrawlerInfo[]) => {
    let urls: CrawlDetailDto[] = []

    logger.info('[Scraper] Getting Shop URLs')

    for (let data of datas) {
        const { shop } = data
        const { startPage, stopPage, path, endSlash } = data.params
        const { productsList } = data.strategy

        let i = startPage
        while (i <= stopPage) {
            let pathWithParam = data.url + path + i

            if (endSlash) pathWithParam += '/'

            logger.info(pathWithParam)
            i++
            let url: CrawlDetailDto = {
                path: pathWithParam,
                selector: productsList,
                shop,
            }
            urls.push(url)
        }
    }
    return urls
}

export const scraper = async () => {
    let URLs = generateURLs(infos as CrawlerInfo[])
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
            const { path, selector, shop } = url

            logger.info(`[scraper] Scraping from ${shop}: ${path}`)

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
    }
}
