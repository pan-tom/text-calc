export interface CalcItem {
  num: number
  pos: number
  len: number
}

export interface CalculationResult {
  calcs: CalcItem[]
  sum: number
}

interface MatchData {
  num: string
  pos: number
}

export type MakeCalculationFunction = (text: string) => CalculationResult

export const makeCalculation = (text: string): CalculationResult => {
  const regexp = new RegExp('(\\s|^)(\\-|\\+)\\d+((\\.|,)\\d{1,2})?', 'gmi')

  const matchesAll = text.matchAll(regexp)
  const matches: MatchData[] = Array.from(matchesAll, data => {
    return {
      num: data[0].trim(),
      pos: data.index + 1,
    }
  })

  const calcs: CalcItem[] = []
  const sum = matches.reduce((prev, currObj, index) => {
    const curr = parseFloat(currObj.num.replace(',', '.'))
    calcs[index] = {
      num: curr,
      pos: currObj.pos + 1,
      len: currObj.num.length - 1,
    }
    return prev + curr
  }, 0)

  return {
    calcs,
    sum,
  }
}
