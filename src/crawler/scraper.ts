import puppeteer from 'puppeteer';

import datas from './data/links.json'
import { CrawlDetailDto } from './dto/CrawlDetailDto'
import { saveFile } from './utils/index'

let urls: CrawlDetailDto[] = [];
let DetailProductsUrls: string[] = [];

(async() => {
    console.log('Getting Shop URLs');
    
    for (let data of datas ){
        const { selector, shop } = data
        const { startPage, stopPage, path } = data.params
        let i = startPage
        while (i <= stopPage){
            let pathWithParam = data.url + path + i
            i++
            let url: CrawlDetailDto = {
                path: pathWithParam,
                shop,
                selector
            }
            urls.push(url);
            console.log('Done');
            
        }
    }
})();

(async () => {
    console.log('-----------');
    console.log('Getting Detail Products URLs');

    try {
        const browser = await puppeteer.launch({ headless: false });
        
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
        
        for (let url of urls){
            const { path, selector, shop } = url

            console.log(`Scraping from ${shop}`);
            
            await page.goto( path, { waitUntil: "networkidle0" });
            await page.setViewport({
                width: 1560,
                height: 1000
            });
            await page.evaluate( ( selector, DetailProductsUrls ) => {                
                const selectorProduct = selector
                let htmls = document.querySelectorAll(selectorProduct);

                htmls.forEach((html: any) => {
                    if (html.href) DetailProductsUrls.push(html.href)
                    console.log(html.href);
                })
            }, selector, DetailProductsUrls )
        }
        await saveFile(DetailProductsUrls, 'detailUrl.txt')

        await browser.close();
        
    } catch (error) {
        console.log(error);
    }
})();