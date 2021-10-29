export interface CrawlDetailDto {
    path: string
    selector: string
}

export interface CrawlerBaseInfo {
    baseUrl: string
    pathPrefix: string
    pathSuffix: string
    startPage: number
    endPage: number
    selector: CrawlStrategy
}

interface CrawlStrategy {
    linkSelector: string
    productSelectors: string[]
}
