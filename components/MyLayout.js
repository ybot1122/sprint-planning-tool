import React from 'react'
import openSocket from 'socket.io-client';

import { Provider } from 'react-redux'
import store from '../store/store'

import Head from './Head'
import Nav from './Nav'

const socket = openSocket('http://localhost:4200');

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
