// Worker is used to crawl each products detail info

import puppeteer from 'puppeteer'

;(async () => {
    try {
        const browser = await puppeteer.launch({ headless: true })

        const page = await browser.newPage()
        page.setDefaultNavigationTimeout(0)

        await page.setUserAgent(
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'
        )
        await page.goto('https://tiki.vn/laptop/c8095?page=1')

        const selectors = await page.evaluate(() => {

        },)
    } catch (error) {
        console.log(error.message);
    }
})()