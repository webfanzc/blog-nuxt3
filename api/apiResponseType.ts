import type { GET_ARTICLES, GET_ARTICLE_DETAIL } from './URLConstants'
import type { Article } from './responseEntity'

export interface ResponseType {
  [GET_ARTICLES]: Article[]
  [GET_ARTICLE_DETAIL]: Article
  [key: string]: any
}
