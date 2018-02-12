import test from 'tape'
import bindEmAll from '../src/index'

class Duck {
  constructor(name) {
    this.name = name
  }

  introduce() {
    return `Hi I am ${this.name}!`
  }

  callWithThis(callback) {
    callback(this)
  }
}

const setup = () => {
  const donald = new Duck('Donald')
  const daisy = new Duck('Daisy')
  return { donald, daisy }
}

const format = (val) => {
  if (typeof val === 'string' && !val) {
    return 'empty string'
  }
  if(Array.isArray(val)) {
    return JSON.stringify(val)
  }
  return val
}

test('it must return given context', t => {
  const { donald } = setup()
  const result = bindEmAll(donald, 'introduce')

  t.equal(result, donald,
    'returned object should equal object given as context argument')

  t.end()
})

test('it should throw when context argument is not truthy object', t => {
  const notTruthyObjects = [0, 1, NaN, Infinity, null, undefined, '', '1', true, false]

  notTruthyObjects.forEach((o) => {
    t.throws(() => bindEmAll(o, 'methodName'),
      /bindEmAll expect argument "context" to be truthy object/,
      `should throw for ${format(o)}`)
  })

  t.end()
})

test('it should throw when methods argument is not truthy string and not array of truthy strings', t => {
  const { donald } = setup()
  const notTruthyStringOrArray = [0, 1, NaN, Infinity, null, undefined, '', true, false, {}]

  notTruthyStringOrArray.forEach(m => {
    t.throws(() => bindEmAll(donald, m),
      /bindEmAll expect argument "methods" to be truthy string or array of truthy strings/,
      `should throw for ${format(m)}`)
  })

  const arraysWithNotTruthyString = [
    ['introduce', '', 'callWithThis'],
    ...notTruthyStringOrArray.map(x => ['introduce', 'callWithThis', x])
  ]

  arraysWithNotTruthyString.forEach(m => {
    t.throws(() => bindEmAll(donald, m),
      /to be truthy string$/,
      `should throw for ${format(m)}`)
  })

  t.end()
})

test('it should throw when given method name is not method of given context', t => {
  const { donald } = setup()

  t.throws(() => bindEmAll(donald, 'notDuckMethod'),
    /bindEmAll expect "notDuckMethod" to be method on given context \(context constructor name: "Duck"\)/)

  t.end()
})

test('it should correctly bind context to method, that name is given in string', t => {
  const { donald, daisy } = setup()
  t.notEqual(donald.introduce(), donald.introduce.call(daisy),
    'result of method called with different context should not equal result of normal call')

  donald.callWithThis.call(daisy, (_this) => {
    t.equal(_this, daisy, '(as above)')
  })

  bindEmAll(donald, 'introduce')
  bindEmAll(donald, 'callWithThis')

  t.equal(donald.introduce(), donald.introduce.call(daisy),
    'after bindEmAll call, cannot change call context of method')

  donald.callWithThis.call(daisy, (_this) => {
    t.equal(_this, donald, '(as above)')
  })

  t.end()
})

test('it should correctly bind context to methods, that names are given in array', t => {
  const { donald, daisy } = setup()
  t.notEqual(donald.introduce(), donald.introduce.call(daisy),
    'result of method called with different context should not equal result of normal call')

  donald.callWithThis.call(daisy, (_this) => {
    t.equal(_this, daisy, '(as above)')
  })

  bindEmAll(donald, [
    'introduce',
    'callWithThis'
  ])

  t.equal(donald.introduce(), donald.introduce.call(daisy),
    'after bindEmAll call, cannot change call context of method')

  donald.callWithThis.call(daisy, (_this) => {
    t.equal(_this, donald, '(as above)')
  })

  t.end()
})

test('it should correctly bind context to methods, that names are given in multiline string', t => {
  const { donald, daisy } = setup()
  t.notEqual(donald.introduce(), donald.introduce.call(daisy),
    'result of method called with different context should not equal result of normal call')

  donald.callWithThis.call(daisy, (_this) => {
    t.equal(_this, daisy, '(as above)')
  })

  bindEmAll(donald, `
    introduce
    callWithThis
  `)

  t.equal(donald.introduce(), donald.introduce.call(daisy),
    'after bindEmAll call, cannot change call context of method')

  donald.callWithThis.call(daisy, (_this) => {
    t.equal(_this, donald, '(as above)')
  })

  t.end()
})
