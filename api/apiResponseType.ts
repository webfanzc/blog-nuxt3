import type { GET_ARTICLES, GET_ARTICLE_DETAIL, GET_DEMOS, GET_TAGS } from './URLConstants'
import type { Article, ArticleDetail, Demo, Tag } from './responseEntity'

export interface ResponseType {
  [GET_ARTICLES]: (Article & { stage?: number })[]
  [GET_ARTICLE_DETAIL]: ArticleDetail
  [GET_TAGS]: Tag[]
  [GET_DEMOS]: Demo[]
  [key: string]: any
}
