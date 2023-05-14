import { useState, useEffect, useRef, RefObject } from 'react';
import {
    EventBus,
    PDFViewer,
    PDFLinkService,
  } from "pdfjs-dist/web/pdf_viewer";
  import "pdfjs-dist/build/pdf.worker.entry";
  import "pdfjs-dist/web/pdf_viewer.css";
import { PDFDocumentProxy, PDFPageProxy, getDocument } from 'pdfjs-dist';

export const usePdf = (url: string, viewerRef: RefObject<HTMLDivElement> | undefined) => {
    const [pdfProxy, setPdfProxy] = useState<PDFDocumentProxy>();
    const [pdfPage, setPdfPage] = useState<PDFPageProxy>();
    useEffect(() => {
        const pdfContent = getDocument({
          enableXfa: true,
          cMapPacked: false,
          
          url: url
        });
        pdfContent.promise
          .then((data: any) => setPdfProxy(data))
          .catch((reason) => console.log(reason));
      }, [url]);
    if (pdfProxy && viewerRef) {
        const eventBus = new EventBus();
        
        const linkService = new PDFLinkService({
          eventBus: eventBus,
        });
        const viewer = new PDFViewer({
          container: viewerRef.current as HTMLDivElement,
          eventBus: eventBus,
          linkService: linkService,
          textLayerMode: 2,
        });
    
        linkService.setDocument(pdfProxy);
        linkService.setViewer(viewer);
        viewer.setDocument(pdfProxy);
      }
  return { pdfProxy, pdfPage };
};