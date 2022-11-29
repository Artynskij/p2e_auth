export type Game = {
    id: number,
    image_of_game: string,
    title: string,
    description?:string,
    type_of_games: {
        id: number,
        title: string
    }
}
export type Seller = {
    id: number,
    username: string,
    user_rating: number,
    img: string
}
export type Service = {
    count:number,
    id: string,
    short_description: string,
    detail_description: string,
    category: number,
    seller: Seller,
    price: string,
    additional: { title: string, description: string }[]
}
export type Category = {
    slug: string;
    title: string;
    id: number;
    game: number;
    title_column: { title: string; choices: [] }[];
    description: string;
}
export type Deal = {
    product: string,
    price: string,
    count: string
}


export type Comment = {
    client: number,
    description: string,
    publish_date: string,
    service_of_seller: number,
    star: number
}
// export type LocationType = {
    //     category?: BreadcrumbsItemType | null;
//     game?: Game,
//     gameTitle?: string;
//     service: {
//         id: string,
//         short_description: string,
//         detail_description: string,
//         category: number,
//         seller: { id: number, username: string, user_rating: number, img: string },
//         price: string,
//         additional: { title: string, description: string }[]
//     };
//     activeCategory: {
//         slug: string;
//         title: string;
//         id: number;
//         game: number;
//         title_column: { title: string; choices: [] }[];
//         description: string;
//     };
// }