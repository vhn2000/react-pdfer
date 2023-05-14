import{ useRef, useState } from 'react';
import {usePdf} from './pdfreader';

function App() {

  const viewerRef = useRef(null);
  const { pdfProxy, pdfPage } = usePdf(
    'i-9.pdf',
    viewerRef,
  );

  return (
    <div style={{display: "felx", justifyContent:"center", width:"100%"}}>
      {!pdfProxy && <span>Loading...</span>}
      <div ref={viewerRef} style={{ position: "absolute" }}>
        <div className="pdfViewer" />
      </div>
    </div>
  );
}

export default App;
