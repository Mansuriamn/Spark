import React, { useEffect, useState } from "react";
import axios from 'axios';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/style/Practice.css"; // External CSS

export default function Practice() {
  async function Get(){
    try{
      let res=await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      console.log(res.data);
    }
    catch(err){
  console.log(err);
    }
  }
  useEffect(()=>{
    Get();
  })
  const practiceTopics = [
    {
      topic: "Path to Policiency",
      difficulty: "Intermediate",
      progress: "0",
      totalProblems: 22,
      about: "Enhance your problem-solving skills with more complex data structures and algorithms.",
    },
    {
      topic: "DSA Mastery",
      difficulty: "Beginner",
      progress: "25",
      totalProblems: 30,
      about: "Learn core data structures and algorithms from scratch with examples.",
    },
    {
      topic: "Advanced Challenges",
      difficulty: "Advanced",
      progress: "0",
      totalProblems: 18,
      about: "Challenge yourself with hard-level coding questions for competitive programming.",
    },
  ];

  const sectionTitles = [
    "Kodnest 75",
    "Advanced Algorithm Techniques",
    "SQL Power Play",
    "Algorithmic Journey",
    "Sorting Algorithms",
  ];
const [select, setSelect]=useState("All")
const handle = (e) => {
   console.log(e.target.value)
    setSelect(e.target.value);
  };
  return (
    <>
      <div className="filter-wrapper">
        <select className="filter-select" value={select} onChange={handle}>
          <option value="Difficulty">Select Difficulty</option>
          <option value="All">All</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {sectionTitles.map((title, idx) => (
        <div className="practice-container" key={idx}>
          <h2 className="practice-title">{title}</h2>
          <div className="card-grid">
            {practiceTopics.map((practice, index) => (
              <Card key={index} practice={practice} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

function Card({ practice }) {
  const difficultyColor = {
    Beginner: "#dcfce7",
    Intermediate: "#fef9c3",
    Advanced: "#fee2e2",
  };

  const difficultyTextColor = {
    Beginner: "#15803d",
    Intermediate: "#92400e",
    Advanced: "#b91c1c",
  };

  return (
    <div className="practice-card">
      <div className="card-header">
        <div className="card-information">
          <div className="trophy">
            <i className="fa-solid fa-trophy"></i>
          </div>
          <div>
            <h3 className="practice-topic">{practice.topic}</h3>
            <span
              className="badge difficulty-badge"
              style={{
                backgroundColor: difficultyColor[practice.difficulty],
                color: difficultyTextColor[practice.difficulty],
              }}
            >
              {practice.difficulty}
            </span>
          </div>
          <div className="progress-summary">
            <h3 className="practice-topic">{practice.progress}%</h3>
            <p className="progress-label">Progress</p>
          </div>
        </div>
      </div>

      <div className="card-body">
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
              role="progressbar"
              aria-valuenow={practice.progress}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
        <div className="Practice-buttons">
          <button className="view-button">
            <i className="fa-solid fa-book-open-reader"></i> View Problems
          </button>
          <button className="Continue-button">
            <i className="fa-solid fa-arrow-right"></i> Continue
          </button>
        </div>
      </div>
    </div>
  );
}
