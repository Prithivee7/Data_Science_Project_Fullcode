import { useHistory } from 'react-router-dom';

function Main() {
    const history = useHistory();

    const resumeButton = () => {
        history.push('/job-recommendation')
    }

    const jobButton = () => {
        history.push('/resume-recommendation')
    }

    return (
        <div>
            <h1 style={{textAlign:'center', margin:'20px',fontFamily:'Comic Sans MS, Garamond, Arial'}}>Recommendation System</h1>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: '15rem'}}>
                {/* <button style={{ marginRight: '5rem' }} onClick={resumeButton}>Upload Resume</button> */}
                <div className="container">
                    <button className="skewBtn1 black" style={{ marginRight: '5rem' }} onClick={resumeButton}>Upload Resume</button>
                    <button className="skewBtn2 black" onClick={jobButton}>Upload Job Requirement</button>
                </div>
            </div>
        </div>
    );
}

export default Main;