import { describe, expect, it } from 'vitest'
import { Treap } from '../src/treap'

describe('Treap', () => {
  it('should support getPrev', () => {
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
  })
})
