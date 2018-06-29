import React from 'react'
import { Provider } from 'react-redux'
import store from '../store/store'

import Head from './head'
import Nav from './nav'

const MyLayout = (Page) => {
  return (
    class MyLayout extends React.Component {
      render () {
        return (
          <Provider store={store}>
            <div>
              <Head title="Home" />
              <Nav />
              <Page />
            </div>
          </Provider>
        );
      }
    ;}
  );
}

export default MyLayout
