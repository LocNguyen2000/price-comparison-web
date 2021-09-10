import axios from 'axios'

export class WebCrawler {
    constructor(
        private crawlApi: string = '',
        private crawlProducts: any[] = []
    ) {}

    public setCrawlApi(api: string) {
        this.crawlApi = api
    }
    public getCrawlApi() {
        return this.crawlApi
    }

    public setCrawlProduct(products: any[]) {
        this.crawlProducts = products
    }
    public getCrawlProduct() {
        return this.crawlProducts
    }

    public async crawl() {
        try {
            const data = await axios.get(this.crawlApi)
            return data
        } catch (error) {
            throw error
        }
    }
}
