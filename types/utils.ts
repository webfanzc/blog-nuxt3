export type Last<T extends any[]> = T extends [...infer _, infer Last]
  ? Last
  : never
export type FuncParams<F> = F extends (...args: infer P) => any ? P : never
export type ObjectValues<T, U extends keyof T = keyof T> = T[U]
export type ObjectEntries<T, U extends keyof T = keyof T> = U extends infer Prop
  ? [Prop, T[U]]
  : never
export type ObjectKeys<T> = keyof T
export type Nullable<T> = T | null | undefined
export type JSONString<T> = string & T

export type PickType<S> = S extends JSONString<infer T> ? T : unknown
export type Awaited<T extends Promise<unknown>> = T extends Promise<infer X>
  ? X extends Promise<unknown>
    ? Awaited<X>
    : X
  : never
/**
 * UnionToIntersection<{ foo: string } | { bar: string }> =
 *  { foo: string } & { bar: string }.
 */
export type UnionToIntersection<U> = (
  U extends unknown ? (arg: U) => 0 : never
) extends (arg: infer I) => 0
  ? I
  : never

/**
 * LastInUnion<1 | 2> = 2.
 */
export type LastInUnion<U> = UnionToIntersection<
U extends unknown ? (x: U) => 0 : never
> extends (x: infer L) => 0
  ? L
  : never

/**
 * UnionToTuple<1 | 2> = [1, 2].
 */
export type UnionToTuple<U, Last = LastInUnion<U>> = [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, Last>>, Last]
export type IsUnion<T, B = T> = T extends B
  ? [B] extends [T]
      ? false
      : true
  : never
export type DeepExpand<T> = IsUnion<T> extends true
  ? UnionToTuple<T>[number]
  : T extends infer O
    ? O extends object
      ? { [P in keyof O]: DeepExpand<O[P]> }
      : O
    : never
