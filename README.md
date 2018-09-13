[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

⚛️ 🎲

# React Mchine

A React component that use the [mchine](https://github.com/HenriqueLimas/mchine) library to use state machine in your application.

## Why?
A state machine can be hard at first to use and understand, but using it as a React component could it be
easier to apply in your application. State machine are sexy and it will change how you think and develop a
Front-end application. Think more on your view's state instead of his transactions, this will reduce a lot
the `if`s and `else`s and make the code more maintanable.

## Install

### npm

```
npm install react-mchine
```

### Yarn

```
yarn add react-mchine
```

### How to use

#### Wrapping your Component

Wrap your component with a state machine schema using the `withMchine` function:

```js
import React from 'react';
import { withMchine } from 'react-mchine';
import stateMachine from './myStateMachine';

class Component extends React.Component {
  ...
}

export default withMchine(stateMachine)(Component);
```

The wrapped component will have a prop called `transition` that is a function that you can use to change states.

```js
class Component extends React.Component {
  handleLogin = () => {
    this.props.transition('login')
  }
}
```

This is an example of the state machine schema:

```js
// myStateMachine.js

const stateMachine = {
  initial: 'idle',
  states: {
    idle: {
      events: {
        login: {
          target: 'loading'
        }
      }
    },
    loading: {
      events: {
        success: {
          target: 'idle'
        }
      }
    }
  }
};

export default stateMachine;
```

#### Matching states

Inside your Wrapped component now you can use the `<State />` component to match the active state of the machine:

```js
...
import { withMchine, State } from 'react-mchine';

class Component extends React.Component {
  ...
  render() {
    return (
      <div>
        <State is="idle">
          Waiting you to click on
          <button onClick={this.handleLogin}>Login</button>
        </State>

        <State is="loading">
          <SomeFancyLoadingSpinner />
        </State>
      </div>
    )
  }
}
```

<hr />

### API

#### withMchine
##### args

- `stateMachine`: A mchine schema definition of your state machine (more information [here](https://github.com/HenriqueLimas/mchine))

##### returns

`C => WC`: A function to create the component `C` as a wrapped component `WC` with the state machine properties

<hr />

#### State
Component used to show the children with the matched state passed on the `is` property

##### props

- `is`: [string] State name chose that will show the children when the active state of the state machine match with this property

##### Example

This will show the `<LoadingSpinner />` component only when the current state is `loading`

```js
<State is="loading">
  <LoadingSpinner />
</State>
```

## Note
React Mchine use [mchine](https://github.com/HenriqueLimas/mchine) under the hood,
if you want to use [xstate](https://github.com/davidkpiano/xstate) instead you could
use [react-automata](https://github.com/MicheleBertoli/react-automata)
