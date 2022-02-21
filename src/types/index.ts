export type Game = {
  datePlayed: string
  word: string
  guess: number
  time: string
  win: boolean
  board: BoardType
}

export type BoardType = Array<{
  row: number
  word: string
  indices: {
    [key: number]: string
  }
}>
