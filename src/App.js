import React, { useState, useEffect } from "react";
import JobInfo from "./JobInfo";

const url = "https://course-api.com/react-tabs-project";

function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  const fetchJobs = async () => {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => setJobs(data));
    setTimeout(() => {
      setLoading(false);
    }, 0);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    );
  }
  
  return (
    <section className="section">
      <div className="title">
        <h2>Experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {jobs.map((job, index) => {
            return (
              <button
                key={job.id}
                className={`job-btn ${index === value && "active-btn"}`}
                onClick={() => setValue(index)}
              >
                {job.company}
              </button>
            );
          })}
        </div>
        <JobInfo {...jobs[value]}/>
      </div>
      <button type="button" className="btn">
        more info
      </button>
    </section>
  );
}

export default App;
