import React, { useEffect, useRef } from 'react';

const AdComponent = () => {
  const scriptRef = useRef(null);

  useEffect(() => {
    const atOptions = {
      'key': '0aa932d00816b5aaeb08895d708a5fda',
      'format': 'iframe',
      'height': 90,
      'width': 728,
      'params': {}
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//www.topcreativeformat.com/0aa932d00816b5aaeb08895d708a5fda/invoke.js';

    scriptRef.current.appendChild(script);

    return () => {
      scriptRef.current.removeChild(script);
    };
  }, []);

  return <div ref={scriptRef} />;
};

export default AdComponent;
