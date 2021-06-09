import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AllPagesPDFViewer from "./pdfviewR";
import Highlighter from "react-highlight-words";

const Job_Form = () => {
    const[title, setTitle] = useState();
    const[company, setCompany] = useState();
    const[location, setLocation] = useState();
    const[email, setEmail] = useState();
    const[role, setRole] = useState();
    const[experience, setExperience] = useState();
    const[salary, setSalary] = useState();
    const [ug, setUg] = useState();
    const [pg, setPg] = useState();
    const [doctorate, setDoctorate] = useState();
    const[IT_Skills, setIT_Skills] = useState();
    const[job_description, setJobDescription] = useState();

    const[flag, setFlag] = useState(false);
    const [data, setData] = useState();
    const [resumeFile, setResumeFile] = useState();
    const [files, setFiles] = useState();
    const [matchedSkills, setMatchedSkills] = useState(['Work Experience']);

    useEffect(() => {
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });
    }, [flag])
    
    const buttonClick = (event) => {
        const num = event.target.value-1;
        setMatchedSkills(data['Matched Skills'][num]);
        setResumeFile(files[num]);
    }

    const job_data = () => {
        const array = [];
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"Job Title : " + title}/></h4>);
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"Company : " + company}/></h4>);
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"Location : " + location}/></h4>);
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"Email : " + email}/></h4>);
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"Role : " + role}/></h4>);
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"Experience : " + experience}/></h4>);
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"Salary : " + salary}/></h4>);
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"UG : " + ug}/></h4>);
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"PG : " + pg}/></h4>);
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"Doctorate : " + doctorate}/></h4>);
        array.push(<h4><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"IT Skills : " + IT_Skills}/></h4>);
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"Job Description : " + job_description}/></h4>);
        return array;
    }

    const getButtonsUsingForLoop = (num) => {
        const array = []

        for(var i = 1; i <= num; i++){
        array.push(<button className="buttons black" value={i} onClick={buttonClick}>{i}</button>)
        }

        return array
    }

    const afterSubmit = (event) => {
        event.preventDefault();
        let data = {title: title, company: company, location: location, email: email, role: role, experience: experience, salary: salary, ug: ug, pg: pg, doctorate: doctorate, IT_Skills: IT_Skills, job_description: job_description};
        axios.post("http://localhost:5000/jobForm", data)
             .then((response) => {
                // console.log(response);
                setData(response.data);
                setFiles(response.data['Files']);
                setResumeFile(response.data['Files'][0]);
                setMatchedSkills(response.data['Matched Skills'][0]);
                window.scrollTo({top: 0, behavior: "smooth"})
             })
             .catch((error) => {
                alert('Something went wrong! Check the format of the job form and try again');
             });
        setFlag(true);
    }

    return(
        <div>
            {flag ? <div>
                        <h1 style={{textAlign:'center',margin:'20px',fontFamily:'Comic Sans MS, Garamond, Arial'}}>Resume Recommendation System</h1>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className="buttonsContainer" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>{getButtonsUsingForLoop(10)}</div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <AllPagesPDFViewer skills={matchedSkills} pdf={resumeFile} />
                            <div style={{width:'600px'}}>{job_data()}</div>
                        </div>
                    </div>
                :
                <div>
                    <h1 style={{textAlign:'center',margin:'20px',fontFamily:'Comic Sans MS, Garamond, Arial'}}>Job Post</h1>
                    <br></br>
                    <br></br>
                    <form style={{fontFamily:'Garamond, Arial', marginLeft:"28%"}} onSubmit={afterSubmit}>
                        {/* <div style={{fontFamily:'Garamond, Arial', marginLeft:"28%"}}> */}
                            <h2>Job Title</h2>
                            <input type="text" name="title" placeholder="Job Title" onChange={(e) => setTitle(e.target.value)} required></input>
                            
                            <h2>Company</h2>
                            <input type="text" name="company" placeholder="Company" onChange={(e) => setCompany(e.target.value)} required></input>
                            <h5>Eg: Amazon, Tata Consultancy Services, NA(No Value) etc.</h5>
                            
                            <h2>Location</h2>
                            <input type="text" name="location" placeholder="Location" onChange={(e) => setLocation(e.target.value)} required></input>
                            <h5>Eg: Hyderabad, Bengaluru, Pune, etc.</h5>
                            
                            <h2>Email</h2>
                            <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required></input>
                            
                            <h2>Role</h2>
                            <input type="text" name="role" placeholder="Role" onChange={(e) => setRole(e.target.value)} required></input>
                            <h5>Eg: Software Developer, Data Analyst, NA(No Value) etc.</h5>
                            
                            <h2>Experience</h2>
                            <input type="text" name="experience" placeholder="Experience" onChange={(e) => setExperience(e.target.value)} required></input>
                            <h5>Eg: 0 - 2 Years, 3 - 5 Years, 0 - 1 Years, NA(No Value) etc.</h5>

                            <h2>Salary</h2>
                            <input type="text" name="salary" placeholder="Salary" onChange={(e) => setSalary(e.target.value)} required></input>
                            <h5>Eg: 1000000 - 2000000 P.A., Not Disclosed etc.</h5>
                            
                            <h2>Education</h2>
                            <h2>UG</h2>
                            <input type="text" name="ug" placeholder="UG" onChange={(e) => setUg(e.target.value)} required></input>
                            <h5>Eg: B.Tech in Computer Science, B.E in Electrical, etc.</h5>
                            
                            <h2>PG</h2>
                            <input type="text" name="pg" placeholder="PG" onChange={(e) => setPg(e.target.value)} required></input>
                            <h5>Eg: M.Tech in Data Science, MBA, NA(No Value) etc.</h5>
                            
                            <h2>Doctorate</h2>
                            <input type="text" name="doctorate" placeholder="Doctorate" onChange={(e) => setDoctorate(e.target.value)} required></input>
                            <h5>Eg: PhD, NA(No Value) etc.</h5>
                            
                            <h2>IT Skills</h2>
                            <input type="text" name="IT_Skills" placeholder="IT Skills" onChange={(e) => setIT_Skills(e.target.value)} required></input>
                            <h5>Eg: Python, Java, Data Science, etc.</h5>
                            
                            <h2>Job Description</h2>
                            <textarea type="text" name="job_description" placeholder="Job Description" onChange={(e) => setJobDescription(e.target.value)} required></textarea>
                            <br></br>
                            <div className="formSubmitContainer">
                                <button className="formSubmit black" type="submit">Submit</button>
                            </div>
                        {/* </div> */}
                    </form>
                </div>
            }
        </div>
    );
}

export default Job_Form;