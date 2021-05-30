import React, {useState} from 'react';
import axios from 'axios';
import AllPagesPDFViewer from "./pdfviewR";
import Highlighter from "react-highlight-words";

function Resume_Recommendation() {

    const [uploadFile, setuploadFile] = useState();
    const [jobRequirement, setJobRequirement] = useState();
    const [flag, setFlag] = useState(false);
    const [data, setData] = useState();
    const [resumeFile, setResumeFile] = useState();
    const [files, setFiles] = useState();
    const [matchedSkills, setMatchedSkills] = useState(['Work Experience']);

    const fileUpload = (event) => {
        setuploadFile(event.target.files[0]);
        setFlag(false);
        setJobRequirement();
        setResumeFile();
    }

    const buttonClick = (event) => {
        const num = event.target.value-1;
        setMatchedSkills(data['Matched Skills'][num]);
        setResumeFile(files[num]);
    }

    const job_data = () => {
        const array = [];
        for(var key in jobRequirement){
            if (key !== 'Matched Skills' && key !== 'index'){
                array.push(<h4><Highlighter
                highlightClassName="YourHighlightClass"
                searchWords={matchedSkills}
                autoEscape={true}
                textToHighlight={key + " : " + jobRequirement[key]}
                /></h4>);
            }
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

    const download = () => {
        fetch('http://localhost:5000/sampleJob', {method:'POST',responseType:'arraybuffer'})
            .then(response => response.arrayBuffer())
            .then((buffer) => {
              const blob = new Blob([buffer], { type: 'application/json' });
              let url = window.URL.createObjectURL(blob);
                        let a = document.createElement('a');
                        a.href = url;
                        a.download = 'Job Requirement.json';
                        a.click();
              alert('Success');
            })
            .catch(error => alert('Something Went Wrong'));
    }

    const onUpload = () => {
        const formData = new FormData();
        
        formData.append("File", uploadFile, uploadFile.name);

        axios.post("http://localhost:5000/resumeRecommendation", formData)
             .then((response) => {
                setData(response.data);
                setJobRequirement(response.data['data']);
                setFiles(response.data['Files']);
                setResumeFile(response.data['Files'][0]);
                setMatchedSkills(response.data['Matched Skills'][0]);
             })
             .catch((error) => {
                alert('Something Went Wrong');
             });
        setFlag(true);
    }

    return (
        <div>
            <h1 style={{textAlign:'center',margin:'20px',fontFamily:'Comic Sans MS, Garamond, Arial'}}>Resume Recommendation System</h1>
            <br></br>
            <div className="submitContainer">
                <input className="upload-box" type="file" name="file" onChange={fileUpload} />
                <button className="submit black" type="submit" onClick={onUpload}>Submit</button>
                <h3 style={{marginLeft: "600px"}}>Download Sample Job Requirement:  </h3>
                <button className="submit black" type="submit" onClick={download}>Download</button>
            </div>
            <br></br>
            <br></br>
            {flag ? <div className="buttonsContainer" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>{getButtonsUsingForLoop(10)}</div> : <div></div>}
            <br></br>
            <br></br>
            <div style={{display: "flex", flexDirection: "row"}}>
                {flag ? <AllPagesPDFViewer skills={matchedSkills} pdf={resumeFile} /> : <div></div>}
                {flag ? <div style={{width:'600px'}}>{job_data()}</div> : <div></div>}
            </div>
        </div>
    );  
}

export default Resume_Recommendation;