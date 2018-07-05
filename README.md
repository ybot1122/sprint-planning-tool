This is a sprint planning tool for teams that use fibonacci point system.

## Table of Contents

- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [npm run dev](#npm-run-dev)
  - [npm run build](#npm-run-build)
  - [npm run start](#npm-run-start)
- [Using CSS](#using-css)
- [Adding Components](#adding-components)
- [Fetching Data](#fetching-data)

## Folder Structure

After creating an app, it should look something like:

```
my-app/
  README.md
  package.json
  next.config.js
  components/
    Head.js
    Nav.js
    etc
  pages/
    index.js
    about.js,
    room.js
  actions/
    actions.js
  api/
    api.js
  constants/
    routes.js
    etc
  reducers/
    bootstrap.js
  store/
    store.js
  static/
    favicon.ico
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any errors in the console.

### `npm run build`

Builds the app for production to the `.next` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run start`

Starts the application in production mode.
The application should be compiled with \`next build\` first.

See the section in Next docs about [deployment](https://github.com/zeit/next.js/wiki/Deployment) for more information.

## Using CSS

[`styled-jsx`](https://github.com/zeit/styled-jsx) is bundled with next to provide support for isolated scoped CSS. The aim is to support "shadow CSS" resembling of Web Components, which unfortunately [do not support server-rendering and are JS-only](https://github.com/w3c/webcomponents/issues/71).

```jsx
export default () => (
  <div>
    Hello world
    <p>scoped!</p>
    <style jsx>{`
      p {
        color: blue;
      }
      div {
        background: red;
      }
      @media (max-width: 600px) {
        div {
          background: blue;
        }
      }
    `}</style>
  </div>
)
```

Read more about [Next's CSS features](https://github.com/zeit/next.js#css).

## Adding Components

We recommend keeping React components in `./components` and they should look like:

### `./components/simple.js`

```jsx
const Simple = () => (
  <div>Simple Component</div>
)

export default Simple // don't forget to export default!
```

### `./components/complex.js`

```jsx
import { Component } from 'react'

class Complex extends Component {
  state = {
    text: 'World'
  }

  render () {
    const { text } = this.state
    return <div>Hello {text}</div>
  }
}

export default Complex // don't forget to export default!
```

## Fetching Data

You can fetch data in `pages` components using `getInitialProps` like this:

### `./pages/stars.js`

```jsx
const Page = (props) => <div>Next stars: {props.stars}</div>

Page.getInitialProps = async ({ req }) => {
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const json = await res.json()
  const stars = json.stargazers_count
  return { stars }
}

export default Page
```

For the initial page load, `getInitialProps` will execute on the server only. `getInitialProps` will only be executed on the client when navigating to a different route via the `Link` component or using the routing APIs.

_Note: `getInitialProps` can **not** be used in children components. Only in `pages`._

Read more about [fetching data and the component lifecycle](https://github.com/zeit/next.js#fetching-data-and-component-lifecycle)
