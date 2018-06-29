import React from 'react';

import Head from './head'
import Nav from './nav'

const MyLayout = (Page) => {
  return (
    class MyLayout extends React.Component {
      render () {
        return (
          <div>
            <Head title="Home" />
            <Nav />
            <Page />
          </div>
        );
      }
    ;}
  );
}

export default MyLayout;
