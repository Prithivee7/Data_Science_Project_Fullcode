import React, {useState} from 'react';
import axios from 'axios';
import AllPagesPDFViewer from "./pdfviewJ";
import Highlighter from "react-highlight-words";

function Job_Recommendation() {
  const [uploadFile, setuploadFile] = useState();
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState();
  const [jobNumber, setJobNumber] = useState(0);
  const [matchedSkills, setMatchedSkills] = useState(['Work Experience']);

  const fileUpload = (event) => {
    setuploadFile(event.target.files[0]);
    setFlag(false);
    setData();
  }

  const buttonClick = (event) => {
    const num = event.target.value-1;
    setJobNumber(num);
    setMatchedSkills(data['Matched Skills'][num]);
  }

  const job_data = (num) => {
    const array = [];
    for(var key in data){
      if (key !== 'Matched Skills' && key !== 'index'){
        // array.push(<h4>{key} : {data[key][num]}</h4>);
        array.push(<h4><Highlighter
          highlightClassName="YourHighlightClass"
          searchWords={matchedSkills}
          autoEscape={true}
          textToHighlight={key + " : " + data[key][num]}
        /></h4>);
      }
    }
    if (array.length === 0) {
      return [<h4>Loading Job Details...</h4>]
    }
    return array;
  }

  const getButtonsUsingForLoop = (num) => {
    const array = []

    for(var i = 1; i <= num; i++){
      array.push(<button className="buttons black" value={i} onClick={buttonClick}>{i}</button>)
    }

    return array
  }

  const onUpload = () => {
    const formData = new FormData();
    
    formData.append("File", uploadFile, uploadFile.name);

    axios.post("http://localhost:5000/jobRecommendation", formData)
         .then((response) => {
           setData(response.data);
           setMatchedSkills(response.data['Matched Skills'][0]);
         })
         .catch((error) => {
           alert('Something Went Wrong');
         });
    setFlag(true);
  }

  const download = () => {
    fetch('http://localhost:5000/sampleResume', {method:'POST',responseType:'arraybuffer'})
        .then(response => response.arrayBuffer())
        .then((buffer) => {
          const blob = new Blob([buffer], { type: 'application/pdf' });
          let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'Resume.pdf';
					a.click();
          alert('Success');
        })
        .catch(error => alert('Something Went Wrong'));
  }

  return (
    <div>
      <h1 style={{textAlign:'center',margin:'20px',fontFamily:'Comic Sans MS, Garamond, Arial'}}>Job Recommendation System</h1>
      <br></br>
      <div className="submitContainer">
        <input className="upload-box" type="file" name="file" onChange={fileUpload} />
        <button className="submit black" type="submit" onClick={onUpload}>Submit</button>
        <h3 style={{marginLeft: "600px"}}>Download Sample Resume:  </h3>
        <button className="submit black" type="submit" onClick={download}>Download</button>
      </div>
      <br></br>
      <br></br>
      {flag ? <div className="buttonsContainer" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>{getButtonsUsingForLoop(10)}</div> : <div></div>}
      <br></br>
      <br></br>
      <div style={{display: "flex", flexDirection: "row"}}>
        {flag ? <AllPagesPDFViewer skills={matchedSkills} pdf={uploadFile} /> : <div></div>}
        {flag ? <div style={{width:'600px'}}>{job_data(jobNumber)}</div> : <div></div>}
      </div>
    </div>
  );
  
}

export default Job_Recommendation;
