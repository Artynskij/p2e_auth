import { Seller } from "./sellerModel";

export class Service {
    constructor(
        id:string,
        short_description:string,
        detail_description:string,
        category: number,
        seller: Seller,
        price: string,
        additional: {title:string, description:string}[]
    ) { }
}