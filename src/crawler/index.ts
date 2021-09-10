import { WebCrawler } from './WebCrawler'
import { AxiosResponse } from 'axios'
import { ShopeeDataResponseDto } from './dto/ProductDto'

try {
    const webCrawlerService = new WebCrawler()

    let i = 0
    let max = 60
    let apis: string[] = []

    while (i <= max) {
        const shopeeApi = `https://shopee.vn/api/v4/search/search_items?by=relevancy&limit=20&match_id=11036015&newest=${i}&order=desc&page_type=search&scenario=PAGE_SUB_CATEGORY&version=2`
        apis.push(shopeeApi)
        i += 20
    }

    apis.map(async (api: string) => {
        webCrawlerService.setCrawlApi(api)
        const response: AxiosResponse = await webCrawlerService.crawl()

        const data = response.data.items as ShopeeDataResponseDto[]
    })
} catch (error) {
    console.log(error)
}
