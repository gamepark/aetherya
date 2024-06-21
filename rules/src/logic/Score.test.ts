import { KingdomCard } from '../material/KingdomCard'
import { LegendCard } from '../material/LegendCard'
import { score } from './Score'

const P = KingdomCard.Plain
const F = KingdomCard.Forest
const M = KingdomCard.Mountain
const S = KingdomCard.Swamp
const H = KingdomCard.Human
const E = KingdomCard.Elf
const N = KingdomCard.Dwarf
const G = KingdomCard.Goblin
const D = KingdomCard.Dragon
const L = KingdomCard.Portal

describe('Score tests', () => {
  test('No points', () => {
    const board = [
      [P, P, P, P],
      [P, P, P, P],
      [P, P, P, P],
      [P, P, P, P]
    ]
    const playerScore = score.detailedPlayerScoreFromGrid(board, [])
    expect(playerScore.elfPoints).toBe(0)
    expect(playerScore.dwarfPoints).toBe(0)
    expect(playerScore.humanPoints).toBe(0)
    expect(playerScore.goblinPoints).toBe(0)
    expect(playerScore.dragonPoints).toBe(0)
    expect(playerScore.legendPoints).toBe(0)
    expect(playerScore.conflictPoints).toBe(-0)
    expect(playerScore.total).toBe(0)
  })

  test('Tribes and lands', () => {
    const board = [
      [G, S, E, F],
      [S, P, P, P],
      [H, M, N, F],
      [P, P, S, P]
    ]
    const playerScore = score.detailedPlayerScoreFromGrid(board, [])
    expect(playerScore.elfPoints).toBe(1)
    expect(playerScore.dwarfPoints).toBe(2)
    expect(playerScore.humanPoints).toBe(2)
    expect(playerScore.goblinPoints).toBe(6)
    expect(playerScore.dragonPoints).toBe(0)
    expect(playerScore.legendPoints).toBe(0)
    expect(playerScore.conflictPoints).toBe(-0)
    expect(playerScore.total).toBe(11)
  })

  test('Conflicts', () => {
    const board = [
      [G, H, E, N],
      [N, H, N, N],
      [G, E, P, P],
      [G, G, P, P]
    ]
    const playerScore = score.detailedPlayerScoreFromGrid(board, [])
    expect(playerScore.elfPoints).toBe(0)
    expect(playerScore.dwarfPoints).toBe(0)
    expect(playerScore.humanPoints).toBe(0)
    expect(playerScore.goblinPoints).toBe(0)
    expect(playerScore.dragonPoints).toBe(0)
    expect(playerScore.legendPoints).toBe(0)
    expect(playerScore.conflictPoints).toBe(-14)
    expect(playerScore.total).toBe(-14)
  })

  test('Single non-domesticated dragon', () => {
    const board = [
      [P, P, P, P],
      [P, D, P, P],
      [P, P, P, P],
      [P, P, P, P]
    ]
    const playerScore = score.detailedPlayerScoreFromGrid(board, [])
    expect(playerScore.elfPoints).toBe(0)
    expect(playerScore.dwarfPoints).toBe(0)
    expect(playerScore.humanPoints).toBe(0)
    expect(playerScore.goblinPoints).toBe(0)
    expect(playerScore.dragonPoints).toBe(-3)
    expect(playerScore.legendPoints).toBe(0)
    expect(playerScore.conflictPoints).toBe(-0)
    expect(playerScore.total).toBe(-3)
  })

  test('2 non-domesticated dragons', () => {
    const board = [
      [P, P, P, P],
      [P, D, P, P],
      [P, P, P, P],
      [D, P, P, P]
    ]
    const playerScore = score.detailedPlayerScoreFromGrid(board, [])
    expect(playerScore.dragonPoints).toBe(-10)
    expect(playerScore.total).toBe(-10)
  })

  test('3 non-domesticated dragons', () => {
    const board = [
      [P, P, D, P],
      [P, D, P, P],
      [P, P, P, P],
      [D, P, P, P]
    ]
    const playerScore = score.detailedPlayerScoreFromGrid(board, [])
    expect(playerScore.dragonPoints).toBe(-18)
    expect(playerScore.total).toBe(-18)
  })

  test('4 non-domesticated dragons', () => {
    const board = [
      [P, P, D, P],
      [P, D, P, P],
      [P, P, D, P],
      [D, P, P, P]
    ]
    const playerScore = score.detailedPlayerScoreFromGrid(board, [])
    expect(playerScore.dragonPoints).toBe(-24)
    expect(playerScore.total).toBe(-24)
  })

  test('Single domesticated dragon', () => {
    const board = [
      [P, H, P, P],
      [P, D, P, P],
      [P, H, P, P],
      [P, P, P, P]
    ]
    const playerScore = score.detailedPlayerScoreFromGrid(board, [])
    expect(playerScore.humanPoints).toBe(10)
    expect(playerScore.dragonPoints).toBe(3)
    expect(playerScore.total).toBe(13)
  })

  test('2 domesticated dragons', () => {
    const board = [
      [P, E, P, P],
      [P, D, E, P],
      [N, P, P, P],
      [D, N, P, P]
    ]
    const playerScore = score.detailedPlayerScoreFromGrid(board, [])
    expect(playerScore.dragonPoints).toBe(10)
    expect(playerScore.total).toBe(10)
  })

  test('3 domesticated dragons', () => {
    const board = [
      [P, E, D, E],
      [E, D, P, P],
      [E, E, P, P],
      [D, E, P, P]
    ]
    const playerScore = score.detailedPlayerScoreFromGrid(board, [])
    expect(playerScore.dragonPoints).toBe(18)
    expect(playerScore.total).toBe(18)
  })

  test('4 impossible to domesticate dragons', () => {
    const board = [
      [E, E, D, E],
      [E, D, E, E],
      [E, E, D, E],
      [D, E, E, E]
    ]
    const playerScore = score.detailedPlayerScoreFromGrid(board, [])
    expect(playerScore.dragonPoints).toBe(12) // 3 domesticated dragons + 1 non-domesticated one
    expect(playerScore.total).toBe(12)
  })

  test('tie break', () => {
    const board = [
      [H, N, M, N],
      [H, D, N, M],
      [D, H, L, G],
      [H, D, S, G]
    ]
    const playerScore = score.detailedPlayerScoreFromGrid(board, [
      LegendCard.LinkedHumanElf,
      LegendCard.LinkedHumanDwarf
    ])
    expect(playerScore.total).toBe(30)
    expect(score.getTieBreaker(1, playerScore)).toBe(18)
    expect(score.getTieBreaker(2, playerScore)).toBe(10)
    expect(score.getTieBreaker(3, playerScore)).toBe(4)
    expect(score.getTieBreaker(4, playerScore)).toBe(3)
    expect(score.getTieBreaker(5, playerScore)).toBe(0)
    expect(score.getTieBreaker(6, playerScore)).toBe(-1)
    expect(score.getTieBreaker(7, playerScore)).toBe(-4)
  })

  // TODO - Portal tests
})
