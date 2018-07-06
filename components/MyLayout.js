import React from 'react'

import { Provider } from 'react-redux'
import store from '../store/store'

import Head from './Head'
import Nav from './Nav'

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
              <style jsx global>{`
                body {
                  color: #505759;
                }
              `}</style>  
            </div>
          </Provider>
        );
      }
    ;}
  );
}

export default MyLayout
