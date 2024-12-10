import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import Top from './includes/Top';
import Header from './includes/Header';
import Spotlight from './includes/Spotlight';
import Footer from './includes/Footer';

function Home() {
  const spotlightRef = useRef(null);

  return (
    <>
      <Helmet>
        <title>Exclusive</title>
      </Helmet>
      <Top />
      <Header spotlightRef={spotlightRef} />
      <Spotlight spotlightRef={spotlightRef} />
      <Footer />
    </>
  );
}

export default Home;
