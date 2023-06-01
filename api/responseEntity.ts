export interface Article {
  _id: string
  abstract: string
  author: string
  createdAt: number
  title: string
}
export interface ArticleDetail extends Article {
  content: string
  tags: Tag[]
}
export interface Tag {
  _id: string
  tagName: string
}
export interface Demo {
  _id: string
  link: string
  poster: string
  desc: string
}
