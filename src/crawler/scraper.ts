// Scraper is used to crawl list of products in each shop

import puppeteer, { Browser } from 'puppeteer'

import datas from './data/links.json'
import { CrawlDetailDto } from './dto/CrawlDetailDto'
import { saveFile } from './utils/index'

let urls: CrawlDetailDto[] = []
let DetailProductsUrls: any[] = []

;(async () => {
    console.log('Getting Shop URLs')

    for (let data of datas) {
        const { selector, shop } = data
        const { startPage, stopPage, path, endSlash } = data.params
        let i = startPage
        while (i <= stopPage) {
            let pathWithParam = data.url + path + i

            if (endSlash) pathWithParam += '/'

            console.log(pathWithParam);
            
            i++
            let url: CrawlDetailDto = {
                path: pathWithParam,
                shop,
                selector,
            }
            urls.push(url)
        }
    }    
})()

;(async () => {
    console.log('-----------')
    console.log('Getting Detail Products URLs')

    try {
        const browser = await puppeteer.launch({ headless: false })

        const page = await browser.newPage()
        page.setDefaultNavigationTimeout(0)

        await page.setUserAgent(
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'
        )
        for (let url of urls) {
            const { path, selector, shop } = url

            console.log(`Scraping from ${shop}: ${path}`)

            await page.goto(path, { waitUntil: 'networkidle2' })

            await page.setViewport({
                width: 1560,
                height: 1000,
            })
            await page.waitForSelector(selector, { timeout: 2000 })

            const results: string[] = await page.evaluate((selector) => {
                let productsUrls: any[] = []

                const selectorProduct = selector
                let htmls = document.querySelectorAll(selectorProduct)

                htmls.forEach((html: any) => {
                    if (html.href) productsUrls.push(html.href)
                    console.log(html.href)
                })
                return productsUrls
            }, selector)

            results.map((url: string) => {
                DetailProductsUrls.push(url)
            })

            await saveFile(DetailProductsUrls, 'detailUrl.json')
        }
        await browser.close()
    } catch (error) {
        console.log(error.message)
    }
})()
