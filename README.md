<div align="center">
  :hammer::wave:
  <h1>Bind 'Em All</h1>
  <p>Bind methods to given context.</p>
</div>

[![Build Status](https://travis-ci.org/tlareg/bind-em-all.svg?branch=master)](https://travis-ci.org/tlareg/bind-em-all)

## Install

```
$ npm install --save bind-em-all
```
or
```
$ yarn add bind-em-all
```

## Usage

### Example 1

```js
import bindEmAll from 'bind-em-all'

class Duck {
  constructor() {
    this.sound = 'QUAAAAACK!!!'

    bindEmAll(this, `
      makeSound
    `)
  }

  makeSound() {
    console.log(this.sound)
  }
}

const donald = new Duck()

// BEFORE
// setTimeout(donald.makeSound.bind(donald), 1000)

// AFTER
setTimeout(donald.makeSound, 1000)

//=>  'QUAAAAACK!!!'
```

### Example 2

```js
import React, { Component } from 'react'
import bindEmAll from 'bind-em-all'

class MyComponent extends Component {
  constructor() {
    // BEFORE

    // this.handleClick1 = this.handleClick1.bind(this)
    // this.handleClick2 = this.handleClick2.bind(this)
    // this.handleClick3 = this.handleClick3.bind(this)
    // this.handleEvent42 = this.handleEvent42.bind(this)
    // this.handleOrder69 = this.handleOrder69.bind(this)

    // AFTER

    bindEmAll(this, `
      handleClick1
      handleClick2
      handleClick3
      handleEvent42
      handleOrder69
    `)
  }

  handleClick1()  { /* using this ... */ }
  handleClick2()  { /* using this ... */ }
  handleClick3()  { /* using this ... */ }
  handleEvent42() { /* using this ... */ }
  handleOrder69() { /* using this ... */ }

  render() {
    return (
      <div>
        <button onClick={this.handleClick1}>CLICK!</button>
        { /* a lot of code using rest of event handlers */ }
      </div>
    )
  }
}
```

## API

```js
/**
 * Binds methods to given context.
 *
 * @param {Object} context - The context that will be bound to given methods.
 * @param {string[]|string} methods - The names of given context methods,
 * that will be bound with context.
 *
 * @returns {Object} context
 */
bindEmAll(context, methods)
```

## License

MIT © tlareg