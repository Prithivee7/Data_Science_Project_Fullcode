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
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: '15rem'}}>
            <button style={{ marginRight: '5rem' }} onClick={resumeButton} >Upload Resume</button>
            <button onClick={jobButton} >Upload Job Requirement</button>
        </div>
    );
}

export default Main;