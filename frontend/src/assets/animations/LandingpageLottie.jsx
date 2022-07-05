import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import LandingPageAnim from './landingpage.json';

const LandingpageLottie = () => {
  const LandingPage = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: LandingPage.current,
      render: 'svg',
      loop: false,
      autoplay: true,
      animationData:  LandingPageAnim,
    });
  }, []);

  return <div ref={LandingPage}></div>;
};

export default LandingpageLottie;
