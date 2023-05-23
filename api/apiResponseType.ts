import type { GET_ARTICLES, GET_ARTICLE_DETAIL, GET_TAGS } from './URLConstants'
import type { Article, ArticleDetail, Tag } from './responseEntity'

export interface ResponseType {
  [GET_ARTICLES]: Article[]
  [GET_ARTICLE_DETAIL]: ArticleDetail
  [GET_TAGS]: Tag[]
  [key: string]: any
}
