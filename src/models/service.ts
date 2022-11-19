export class Service {
    constructor(
        id:string,
        short_description:string,
        detail_description:string,
        category: number,
        seller: string,
        price: string,
        additional: {title:string, description:string}[]
    ) { }
}