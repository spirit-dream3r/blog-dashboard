export interface Post {
    title: string,
    permalink: string,
    category: {
        categoryId: string,
        category: string
    },
    excerpt: string,
    imgSrc: string,
    content: string,
    isFeatured: boolean,
    views: number,
    createdAt: Date,
    status: string 
}