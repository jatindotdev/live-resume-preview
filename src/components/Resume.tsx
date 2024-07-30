import { useEffect, useState, type SVGProps } from 'react';
import { Document, type DocumentProps, Page, pdfjs } from 'react-pdf';
import { cn } from '../lib/utils.ts';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useResizeObserver } from '../lib/hooks/use-reszie-observer';

type ResumeProps = React.ComponentProps<'section'>;

export function Spinner(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <title>Spinner</title>
      <path
        fill="currentColor"
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        opacity=".25"
      />
      <path
        fill="currentColor"
        d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
      >
        <animateTransform
          attributeName="transform"
          dur="0.75s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        />
      </path>
    </svg>
  );
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const MAX_WIDTH = 768;
const PADDING = 16;

export default function Resume({ className, ...props }: ResumeProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const { width: windowWidth } = useResizeObserver();

  const newWidth = windowWidth - PADDING * 2;
  const [width, setWidth] = useState<number>(
    newWidth > MAX_WIDTH ? MAX_WIDTH : newWidth
  );

  const onDocumentLoadSuccess: DocumentProps['onLoadSuccess'] = ({
    numPages,
  }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    const newWidth = windowWidth - PADDING * 2;
    setWidth(newWidth > MAX_WIDTH ? MAX_WIDTH : newWidth);
  }, [windowWidth]);

  return (
    <section
      className={cn(
        'mx-auto mt-4 sm:mt-12 sm:mb-16 lg:mb-30 w-max h-max',
        className
      )}
      {...props}
    >
      <Document
        file={'jatin-resume.pdf'}
        className="aspect-[768/1087] space-y-4 sm:space-y-8"
        loading={
          <div
            className="aspect-[768/1087] flex justify-center rounded-md pt-20 shadow-uniform"
            style={{
              width,
            }}
          >
            <Spinner className="h-10 w-10 opacity-50" />
          </div>
        }
        externalLinkRel="noopener noreferrer"
        externalLinkTarget="_blank"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from({ length: numPages }, (_, i) => (
          <Page
            key={`page_${i + 1}`}
            pageNumber={i + 1}
            loading={
              <div
                className="aspect-[768/1087] flex justify-center rounded-md pt-20 shadow-uniform"
                style={{
                  width,
                }}
              >
                <Spinner className="h-10 w-10 opacity-50" />
              </div>
            }
            canvasBackground="#ffffff"
            width={width}
            _className="rounded-md shadow-uniform"
          />
        ))}
      </Document>
    </section>
  );
}
