import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/style/Practice.css"; // import the external CSS file

export default function Practice() {
         const practiceTopics = [
                  {
                           topic: "Path to Policiency",
                           difficulty: "Intermediate",
                           progress: "0",
                           totalProblems: 22,
                           about:
                                    "Enhance your problem-solving skills with more complex data structures and algorithms.",
                  },
                  {
                           topic: "DSA Mastery",
                           difficulty: "Beginner",
                           progress: "25",
                           totalProblems: 30,
                           about:
                                    "Learn core data structures and algorithms from scratch with examples.",
                  },
                  {
                           topic: "Advanced Challenges",
                           difficulty: "Advanced",
                           progress: "0",
                           totalProblems: 18,
                           about:
                                    "Challenge yourself with hard-level coding questions for competitive programming.",
                  },
         ];

         return (
                  <div className="practice-container">
                           <h2 className="practice-title">Practice Topics</h2>
                           <div className="card-grid">
                                    {practiceTopics.map((practice, index) => (
                                             <Cards key={index} practice={practice} />
                                    ))}
                           </div>
                  </div>
         );
}

function Cards({ practice }) {
  return (
    <div className="practice-card">
         
      <div className="card-header">
        
        <div className="card-information">
        <div className="trophy">
          <i className="fa-solid fa-trophy" aria-hidden="true"></i>
        </div>
          <div>
            <h3 className="practice-topic">{practice.topic}</h3>
            <span className="badge difficulty-badge">{practice.difficulty}</span>
          </div>
          <div style={{display:"flex",flexDirection:"column"}} >
            <h3 className="practice-topic">{practice.progress}%</h3>
            <p className="progress-label">Progress</p>
          </div>
        </div>
      </div>
      <div className="Practice-buttons">
        <h3>Total Problems</h3>
        <h3>{practice.totalProblems}</h3>
      </div>
      <p className="practice-about">{practice.about}</p>
      <div className="progress-container">
        <span className="progress-label">{practice.progress}%</span>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${practice.progress}%` }}
            aria-valuenow={practice.progress}
            aria-valuemin="0"
            aria-valuemax="100"
            role="progressbar"
          ></div>
        </div>
      </div>
      <div className="Practice-buttons">
        <button
          className="view-button"
          aria-label="View problems"
          role="button"
        >
          <i className="fa-solid fa-book-open-reader" aria-hidden="true"></i> View Problems
        </button>
        <button
          className="Continue-button"
          aria-label="Continue practice"
          role="button"
        >
          <i className="fa-solid fa-arrow-right" aria-hidden="true"></i> Continue
        </button>
      </div>
    </div>
  );
}
