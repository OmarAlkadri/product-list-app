export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    upvote: number;
    downvote: number;
    imageUrl: string;
    limit: number;
    discount?: number;
    productType?: string;
    visible?: boolean;
}

export interface ImageProps {
    previews?: string
    selectedFileName?: string

}