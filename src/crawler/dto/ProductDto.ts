export interface ShopeeDataResponseDto {
    item_basic: ShopeeItemBasicDto
    itemid: number
    shopid: number
}

export interface ShopeeItemBasicDto {
    itemid: number
    shopid: number
    name: string
    image: string
    currency: string
    stock: number
    status: number
    ctime: number
    item_status: string
    price: number
    price_min: number
    price_max: number
    price_min_before_discount: number
    price_max_before_discount: number
    price_before_discount: number
    shop_location: string
}
