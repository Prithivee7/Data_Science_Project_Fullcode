import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Highlighter from "react-highlight-words";

const Resume_Form = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [location, setLocation] = useState();
    const [company, setCompany] = useState();
    const [role, setRole] = useState();
    const [experience, setExperience] = useState();
    const [ug, setUg] = useState();
    const [pg, setPg] = useState();
    const [doctorate, setDoctorate] = useState();
    const [IT_Skills, setIT_Skills] = useState();
    const [languages, setLanguages] = useState();
    const [summary, setSummary] = useState();
    const [workExperience, setWorkExperience] = useState();
    const [flag, setFlag] = useState(false);
    const [data, setData] = useState();
    const [jobNumber, setJobNumber] = useState(0);
    const [matchedSkills, setMatchedSkills] = useState(['Work Experience']);

    useEffect(() => {
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });
    }, [flag])
    
    const getButtonsUsingForLoop = (num) => {
        const array = []
    
        for(var i = 1; i <= num; i++){
          array.push(<button className="buttons black" value={i} onClick={buttonClick}>{i}</button>)
        }
    
        return array
    }

    const buttonClick = (event) => {
        const num = event.target.value-1;
        setJobNumber(num);
        setMatchedSkills(data['Matched Skills'][num]);
    }

    const job_data = (num) => {
        const array = [];
        for(var key in data){
            if (key !== 'Matched Skills' && key !== 'index' && key !== 'Link'){
            array.push(<h4 style={{textAlign:'justify'}}><Highlighter
                highlightClassName="YourHighlightClass"
                searchWords={matchedSkills}
                autoEscape={true}
                textToHighlight={key + " : " + data[key][num]}
            /></h4>);
            }
        }
        if (array.length > 0) {
            array.push(<h4>{"Naukri Link: "}<a href={data["Link"][num]}>{data["Link"][num]}</a></h4>);
        }
        if (array.length === 0) {
            return [<h4>Loading Job Details...</h4>]
        }
        return array;
    }

    const resume_data = () => {
        const array = [];
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"Name : " + name}/></h4>);
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"Email : " + email}/></h4>);
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"Location : " + location}/></h4>);
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"Company : " + company}/></h4>);
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"Role : " + role}/></h4>);
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"Experience : " + experience}/></h4>);
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"UG : " + ug}/></h4>);
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"PG : " + pg}/></h4>);
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"Doctorate : " + doctorate}/></h4>);
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"IT Skills : " + IT_Skills}/></h4>);
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"Languages : " + languages}/></h4>);
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"Summary : " + summary}/></h4>);
        array.push(<h4 style={{textAlign:'justify'}}><Highlighter highlightClassName="YourHighlightClass" searchWords={matchedSkills} autoEscape={true} textToHighlight={"Work Experience : " + workExperience}/></h4>);
        return array;
    }

    const afterSubmit = (event) => {
        event.preventDefault();
        let data = {name: name, email: email, location: location, company: company, role: role, experience: experience, ug: ug, pg: pg, doctorate: doctorate,
                    IT_Skills: IT_Skills, languages: languages, summary: summary, workExperience: workExperience};
        axios.post("http://localhost:5000/resumeForm", data)
             .then((response) => {
                // console.log(response);
                setData(response.data);
                setMatchedSkills(response.data['Matched Skills'][0]);
                setFlag(true);
             })
             .catch((error) => {
                alert('Something went wrong! Check the format of the resume form and try again');
             });
    }

    return (
        <div>
            {flag ? <div>
                        <h1 style={{textAlign:'center',margin:'20px',fontFamily:'Comic Sans MS, Garamond, Arial'}}>Job Recommendation System</h1>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className="buttonsContainer" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>{getButtonsUsingForLoop(10)}</div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <div style={{width:'45%', marginRight:'100px'}}>{resume_data()}</div>
                            <div style={{width:'45%'}}>{job_data(jobNumber)}</div>
                        </div>
                    </div>
                :
                <div>
                    <h1 style={{textAlign:'center',margin:'20px',fontFamily:'Comic Sans MS, Garamond, Arial'}}>Resume</h1>
                    <br></br>
                    <br></br>
                    <form style={{fontFamily:'Garamond, Arial', marginLeft:"28%"}} onSubmit={afterSubmit}>
                        {/* <div style={{fontFamily:'Garamond, Arial', marginLeft:"28%"}}> */}
                            <h2>Name</h2>
                            <input type="text" name="name" placeholder="Name" onChange={(e) => setName(e.target.value)} required></input>
                            <h2>Email</h2>
                            <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required></input>
                            <h2>Current Location</h2>
                            <input type="text" name="location" placeholder="Location" onChange={(e) => setLocation(e.target.value)} required></input>
                            <h5>Eg: Hyderabad, Bengaluru, Pune, etc.</h5>
                            <h2>Current Company</h2>
                            <input type="text" name="company" placeholder="Company" onChange={(e) => setCompany(e.target.value)} required></input>
                            <h5>Eg: Amazon, Tata Consultancy Services, NA(No Value) etc.</h5>
                            <h2>Current Role</h2>
                            <input type="text" name="role" placeholder="Role" onChange={(e) => setRole(e.target.value)} required></input>
                            <h5>Eg: Software Developer, Data Analyst, NA(No Value) etc.</h5>
                            <h2>Total Experience</h2>
                            <input type="text" name="experience" placeholder="Experience" onChange={(e) => setExperience(e.target.value)} required></input>
                            <h5>Eg: 1 Year 5 Months, 5 Years, NA(No Value) etc.</h5>
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
                            <h2>IT Skills(with experience)</h2>
                            <input type="text" name="IT_Skills" placeholder="IT Skills" onChange={(e) => setIT_Skills(e.target.value)} required></input>
                            <h5>Eg: Python(1 year(s) 5 month(s)), Java(2 year(s) 7 month(s)), Data Science(3 year(s)), etc.</h5>
                            <h2>Languages Known</h2>
                            <input type="text" name="languages" placeholder="Languages Known" onChange={(e) => setLanguages(e.target.value)} required></input>
                            <h5>Eg: English, Hindi, Telugu, etc.</h5>
                            <h2>Summary</h2>
                            <textarea type="text" name="summary" placeholder="Summary" onChange={(e) => setSummary(e.target.value)} required></textarea>
                            <h2>Work Experience</h2>
                            <textarea type="text" name="workExperience" placeholder="Work Experience" onChange={(e) => setWorkExperience(e.target.value)} required></textarea>
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

export default Resume_Form;
