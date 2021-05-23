import React, {useState} from 'react';
import axios from 'axios';
import AllPagesPDFViewer from "./pdfviewR";
import Highlighter from "react-highlight-words";

function Resume_Recommendation() {

    const [uploadFile, setuploadFile] = useState();
    const [jobRequirement, setJobRequirement] = useState();
    const [flag, setFlag] = useState(false);
    const [data, setData] = useState();
    const [jobNumber, setJobNumber] = useState(0);
    const [resumeFile, setResumeFile] = useState();
    const [files, setFiles] = useState();
    const [matchedSkills, setMatchedSkills] = useState(['Work Experience']);

    const fileUpload = (event) => {
        setuploadFile(event.target.files[0]);
        setFlag(false);
    }

    const buttonClick = (event) => {
        const num = event.target.value-1;
        console.log(num);
        setJobNumber(num);
        setMatchedSkills(data['Matched Skills'][num]);
        setResumeFile(files[num]);
    }

    const job_data = () => {
        const array = [];
        for(var key in jobRequirement){
            if (key !== 'Matched Skills' && key !== 'index'){
                // array.push(<h4>{key} : {data[key][num]}</h4>);
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
        array.push(<button value={i} onClick={buttonClick}>{i}</button>)
        }

        return array
    }

    // const setResume = () => {
    //     // console.log(files);
    //     // axios.post("http://localhost:5000/getResume/"+files[jobNumber])
    //     axios.post("http://localhost:5000/getResume/Resume1.pdf")
    //          .then((response) => {
    //              console.log(response);
    //              setResumeFile(response.data);
    //          })
    //          .catch((error) => {
    //              console.log(error);
    //          })
    // }

    const onUpload = () => {
        const formData = new FormData();
        
        formData.append("File", uploadFile, uploadFile.name);

        axios.post("http://localhost:5000/resumeRecommendation", formData)
             .then((response) => {
                console.log(response.data);
                setData(response.data);
                setJobRequirement(response.data['data']);
                setFiles(response.data['Files']);
                setResumeFile(response.data['Files'][0]);
                setMatchedSkills(response.data['Matched Skills'][0]);
             })
             .catch((error) => {
                console.log(error);
             });
        setFlag(true);
    }

    return (
        <div>
            <h1 style={{textAlign:'center'}}>Resume Recommendation System</h1>
            <input type="file" name="file" onChange={fileUpload} />
            <input type="submit" value="Submit" onClick={onUpload} />
            <br></br>
            <br></br>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                {getButtonsUsingForLoop(10)}
            </div>
            <br></br>
            <br></br>
            {/* <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}> */}
            <div style={{display: "flex", flexDirection: "row"}}>
                {flag ? <AllPagesPDFViewer skills={matchedSkills} pdf={resumeFile} /> : <h6></h6>}
                {flag ? <div style={{width:'600px'}}>{job_data()}</div> : <h1></h1>}
            </div>
        </div>
    );  
}

export default Resume_Recommendation;