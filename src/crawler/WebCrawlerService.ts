import { WebCrawler } from './WebCrawler'
import { AxiosResponse } from 'axios'
import { ShopeeResponseDto } from './dto/ShopeeProductDto'
import { TikiDataDto } from './dto/TikiProductDto'
import { ProductsDto } from './dto/ProductsDto'
import fs from 'fs'

export class WebCrawlerService {
    constructor(private webCrawler = new WebCrawler()) {}
    async startCrawler() {
        try {
            const shopeeLimit = 20,
                tikiLimit = 12
            let i = 0,
                j = 0
            let maxShopee = 60,
                maxTikiPage = 10
            let apis: string[] = []
            let outputProducts: ProductsDto[] = []

            while (i <= maxShopee) {
                const shopeeApi = `https://shopee.vn/api/v4/search/search_items?by=relevancy&limit=${shopeeLimit}&match_id=11036015&newest=${i}&order=desc&page_type=search&scenario=PAGE_SUB_CATEGORY&version=2`
                apis.push(shopeeApi)
                i += shopeeLimit
            }
            while (j <= maxTikiPage) {
                const tikiApi = `https://tiki.vn/api/personalish/v1/blocks/listings?limit=${tikiLimit}&include=sale-attrs,badges,product_links,brand,category,stock_item,advertisement&is_mweb=1&aggregations=1&trackity_id=6e22a2ee-f90e-f76e-a5c3-12c3992d027a&urlKey=laptop&categoryId=8095&category=8095&page=${j}`
                apis.push(tikiApi)
                j += 1
            }

            let itemCount = 0

            apis.map(async (api: string) => {
                this.webCrawler.setCrawlApi(api)
                const response: AxiosResponse = await this.webCrawler.crawl()

                if (response.data.hasOwnProperty('data')) {
                    const data = response.data.data as TikiDataDto[]

                    data.map((item: TikiDataDto) => {
                        console.log('----------')
                        console.log('Tiki')
                        console.log('Item id:', item.id)
                        console.log('Item name:', item.name)
                        console.log('Item price:', item.price)
                        itemCount++

                        outputProducts.push({
                            shop: 'Tiki',
                            itemid: item.id,
                            name: item.name,
                            price: item.price,
                        })
                    })
                } else if (response.data.hasOwnProperty('items')) {
                    const data = response.data.items as ShopeeResponseDto[]

                    data.map((item: ShopeeResponseDto) => {
                        console.log('----------')
                        console.log('Shopee')
                        console.log('Item id:', item.item_basic.itemid)
                        console.log('Shop id:', item.item_basic.shopid)
                        console.log('Item name:', item.item_basic.name)
                        console.log('Item Price:', item.item_basic.price)
                        itemCount++

                        outputProducts.push({
                            shop: 'Shopee',
                            itemid: item.item_basic.itemid,
                            name: item.item_basic.name,
                            price: item.item_basic.price / 100000,
                        })
                    })
                }
                console.log('Total:', itemCount)
                fs.writeFile(
                    './crawler/output/output.json',
                    JSON.stringify(outputProducts, null, 2),
                    (err) => {
                        if (err) console.log(err)
                    }
                )
            })
        } catch (error) {
            console.log(error)
        }
    }
}
