// copied from vue: https://github.com/vuejs/core/blob/3be4e3cbe34b394096210897c1be8deeb6d748d8/packages/shared/src/general.ts#L90-L112
function cacheStringFunction<T extends (str: string) => string>(fn: T): T {
  const cache: Record<string, string> = Object.create(null)
  return ((str: string) => {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }) as T
}

// inspired from vueuse: https://github.com/ilyaliao/vueuse/blob/a54c4b46e0122e3bf48a624abf6151793dbe32ce/packages/shared/utils/port.ts#L13-L16
const camelizeUnderscoreRE = /_(\w)/g
export const camelizeUnderscore = cacheStringFunction((str: string): string => {
  return str.replace(camelizeUnderscoreRE, (_, c) => (c ? c.toUpperCase() : ''))
})
