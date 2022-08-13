import { describe, expect, it } from 'vitest'
import { Treap } from '../src/treap'

describe('Treap', () => {
  it('should work', () => {
    const treap = new Treap(undefined, -1e5, 1e5)
    treap.insert(1)
    treap.insert(10)
    treap.insert(3)
    expect(treap.getPrev(10)).toEqual(3)
    treap.insert(4)
    expect(treap.getPrev(10)).toEqual(4)
    expect(treap.getPrev(1)).toEqual(-1e5)
    expect(treap.getNext(10)).toEqual(1e5)
    expect(treap.getNext(4)).toEqual(10)
    // treap.print()
    expect(treap.getRankByValue(4)).toEqual(3)
    expect(treap.getRankByValue(1)).toEqual(1)
    expect(treap.getRankByValue(100)).toEqual(4)
    expect(treap.size).toEqual(4)

    expect(treap.getValueByRank(1)).toEqual(1)
    expect(treap.getValueByRank(2)).toEqual(3)
    expect(treap.getValueByRank(3)).toEqual(4)
    expect(treap.getValueByRank(4)).toEqual(10)
    expect(treap.getValueByRank(5)).toEqual(1e5)

    treap.insert(4)
    expect(treap.size).toEqual(5)
    expect(treap.getValueByRank(3)).toEqual(4)
    expect(treap.getValueByRank(4)).toEqual(4)
    expect(treap.getValueByRank(5)).toEqual(10)

    treap.remove(4)
    expect(treap.size).toEqual(4)
    expect(treap.getValueByRank(3)).toEqual(4)
    expect(treap.getValueByRank(4)).toEqual(10)
    expect(treap.getValueByRank(5)).toEqual(1e5)
    expect(treap.getRankByValue(5)).toEqual(3)

    expect([...treap.values()]).toEqual([1, 3, 4, 10])
    treap.insert(4)
    expect([...treap.values()]).toEqual([1, 3, 4, 4, 10])
  })
})
