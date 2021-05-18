import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import 'react-pdf/dist/umd/Page/AnnotationLayer.css';

export default function AllPages(props) {
  const [numPages, setNumPages] = useState(null);
  const [arr, setArr] = useState(props.skills);
  const width = '900';

  useEffect(() => {
    setArr(props.skills);
  }, [props]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const highlightPattern = (text, arr) => {
    var indexes = [];
    for (let i = 0; i < arr.length; i++) {
        const pattern = arr[i];

        var indexOccurence = text.indexOf(pattern, 0);

        while(indexOccurence >= 0) {
            indexes.push(indexOccurence.toString()+','+pattern.length.toString());

            indexOccurence = text.indexOf(pattern, indexOccurence + 1);
        }
    }
    for(let i = 0; i < indexes.length; i++) {
        // Finding the smallest number in the subarray
        let min = i;
        for(let j = i+1; j < indexes.length; j++){
            if(Number(indexes[j].split(',')[0]) < Number(indexes[min].split(',')[0])) {
                min=j; 
            }
        }
        if (min !== i) {
            // Swapping the elements
            let tmp = indexes[i]; 
            indexes[i] = indexes[min];
            indexes[min] = tmp;      
        }
    }
    var updated_indexes = [];
    if (indexes.length === 1) {
        updated_indexes = indexes;
    }
    for (let i = 0; i < indexes.length-1; i++) {
        let start1 = Number(indexes[i].split(',')[0]);
        let end1 = start1+Number(indexes[i].split(',')[1]);
        for (let j = i+1; j < indexes.length; j++) {
            let start2 = Number(indexes[j].split(',')[0]);
            let end2 = start2+Number(indexes[j].split(',')[1]);
            if (start2 < end1) {
                if (end2 > end1) {
                    end1 = end2;
                }
                if (j === indexes.length - 1) {
                    updated_indexes.push(start1.toString()+','+(end1-start1).toString());
                }
            } else {
                i = j;
                i = i - 1;
                updated_indexes.push(start1.toString()+','+(end1-start1).toString());
                if (j === indexes.length - 1) {
                    updated_indexes.push(start2.toString()+','+(end2-start2).toString());
                }
                break;
            }
        }
    }
    var output = [];
    let initial = 0;
    for (var i = 0; i < updated_indexes.length; i++) {
        if ((Number(updated_indexes[i].split(',')[0]) - initial) > 0) {
            output.push(text.substring(initial,Number(updated_indexes[i].split(',')[0])));
        }
        output.push(<mark>{text.substring(Number(updated_indexes[i].split(',')[0]),Number(updated_indexes[i].split(',')[0])+Number(updated_indexes[i].split(',')[1]))}</mark>);
        initial = Number(updated_indexes[i].split(',')[0])+Number(updated_indexes[i].split(',')[1]);
        if (i === updated_indexes.length - 1 && text.length - initial > 0){
            output.push(text.substring(initial));
        }
    }   
    return output;
  }

  const makeTextRenderer = arr => textItem => highlightPattern(textItem.str,arr);

//   const { pdf } = props;

  return (
    <Document
      file={props.pdf}
      // file={{url:"http://localhost:5000/getResume/Resume4619.pdf"}}
      // file={{url:props.pdf}}
      options={{ workerSrc: "/pdf.worker.js" }}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} width={width} customTextRenderer={makeTextRenderer(arr)}/>
      ))}
    </Document>
  );
}