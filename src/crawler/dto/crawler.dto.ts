export interface CrawlDetailDto {
    path: string
    shop: string
    selector: string
}

export interface CrawlerInfo {
    url: string
    params: CrawlPageParams
    strategy: CrawlStrategy
    shop: string
    origin: string
}
interface CrawlPageParams {
    path: string
    startPage: number
    stopPage: number
    endSlash: boolean
}
interface CrawlStrategy {
    productsList: string
    productsDetail: string
}
