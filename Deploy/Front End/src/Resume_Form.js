import React, {useState} from 'react';

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

    const afterSubmit = (event) => {
        event.preventDefault();
        console.log("Name: "+name);
        console.log("Email: "+email);
        console.log("Location: "+location);
        console.log("Company: "+company);
        console.log("Role: "+role);
        console.log("Experience: "+experience);
        console.log("UG: "+ug);
        console.log("PG: "+pg);
        console.log("Doctorate: "+doctorate);
        console.log("IT Skills: "+IT_Skills);
        console.log("Languages: "+languages);
        console.log("Summary: "+summary);
        console.log("Work Experience: "+workExperience);
    }

    return (
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
                    <h2>IT Skills</h2>
                    <input type="text" name="IT_Skills" placeholder="IT Skills" onChange={(e) => setIT_Skills(e.target.value)} required></input>
                    <h5>Eg: Python, Java, Data Science, etc.</h5>
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
    );
}

export default Resume_Form;
