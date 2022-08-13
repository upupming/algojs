/*
https://www.acwing.com/problem/content/134/

队列 qg 记下各个小组的顺序

*/
let input = ''

process.stdin.on('data', data => input += data)
process.stdin.on('end', () => {
  const lines = input.split('\n')
  let li = 0, t = 0
  while (true) {
    const n = Number(lines[li++])
    if (n === 0) break
    console.log(`Scenario #${++t}`)
    const g = {}

    for (let i = 0; i < n; i++) {
      const s = lines[li++].split(' ')
      for (let j = 1; j < s.length; j++) {
        g[s[j]] = i
      }
    }

    // n 个组的顺序是怎么样的，先建立的组在前面
    const qg = new Queue()
    // n 个组，每个组对应的队列
    const qs = Array(n).fill(0).map(() => new Queue())
    // 当前存在的所有组
    const gs = new Set()

    while (true) {
      const cmds = lines[li++].split(' ')
      console.assert(qg.size === gs.size)
      if (cmds[0] === 'ENQUEUE') {
        const x = cmds[1]
        console.assert(g[x] != null)
        // x 所在的组已经存在了，放在这个组的后面
        if (gs.has(g[x])) {
          qs[g[x]].push(x)
        } else {
          // 不存在 x 对应的组，新建一个组把 x 放进去
          qg.push(g[x])
          qs[g[x]].push(x)
          gs.add(g[x])
        }
      } else if (cmds[0] === 'DEQUEUE') {
        const fg = qg.front()
        const x = qs[fg].shift()
        if (qs[fg].size === 0) {
          qg.shift()
          gs.delete(fg)
        }
        console.log(x)
      } else {
        console.log()
        break
      }
    }
  }
})

var ListNode = class {
  constructor(val = null, next = null) {
    this.val = val;
    this.next = next;
  }
};
var Queue = class {
  constructor() {
    this._size = 0;
    this.head = this.tail = new ListNode();
  }
  get size() {
    return this._size;
  }
  push(value) {
    this.tail.next = new ListNode(value);
    this.tail = this.tail.next;
    this._size++;
  }
  back() {
    return this.tail.val;
  }
  shift() {
    if (!this._size)
      return null;
    const first = this.head.next;
    this.head.next = first.next;
    this._size--;
    if (this._size === 0)
      this.tail = this.head;
    return first.val;
  }
  front() {
    if (!this._size)
      return null;
    const first = this.head.next;
    return first.val;
  }
  *values() {
    let node = this.head.next;
    while (node) {
      yield node.val;
      node = node.next;
    }
  }
};
