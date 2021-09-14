export interface ShopeeResponseDto {
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
    status: number
    ctime: number
    item_status: string
    price: number
    price_min: number
    price_max: number
    shop_location: string
}
