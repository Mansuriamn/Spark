import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/style/Practice.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Practice() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/practiceinside");
  };

  const [practiceTopics] = useState([
  {
    topic: "Path to Proficiency",
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
  {
    topic: "Recursion Fundamentals",
    difficulty: "Beginner",
    progress: "10",
    totalProblems: 15,
    about: "Understand recursion through visual explanations and step-by-step code walkthroughs.",
  },
  {
    topic: "Sorting Algorithms",
    difficulty: "Intermediate",
    progress: "5",
    totalProblems: 20,
    about: "Master bubble, quick, merge, and heap sort through practical challenges.",
  },
  {
    topic: "Dynamic Programming",
    difficulty: "Advanced",
    progress: "0",
    totalProblems: 25,
    about: "Solve complex problems using optimal substructure and memoization.",
  },
  {
    topic: "Graph Theory Essentials",
    difficulty: "Intermediate",
    progress: "8",
    totalProblems: 18,
    about: "Explore BFS, DFS, and shortest path algorithms with real-world use cases.",
  },
  {
    topic: "String Manipulation",
    difficulty: "Beginner",
    progress: "3",
    totalProblems: 12,
    about: "Learn how to work efficiently with strings and character arrays.",
  },
  {
    topic: "Bit Manipulation",
    difficulty: "Intermediate",
    progress: "0",
    totalProblems: 10,
    about: "Dive into bitwise operations and how they help in algorithm optimization.",
  },
  {
    topic: "Greedy Algorithms",
    difficulty: "Intermediate",
    progress: "7",
    totalProblems: 14,
    about: "Learn to make the best local choice for optimal global results.",
  },
  {
    topic: "Backtracking Techniques",
    difficulty: "Advanced",
    progress: "0",
    totalProblems: 16,
    about: "Solve constraint-based problems using recursion and pruning.",
  },
  {
    topic: "Searching Algorithms",
    difficulty: "Beginner",
    progress: "10",
    totalProblems: 9,
    about: "Understand linear and binary search with variations in sorted arrays.",
  },
  {
    topic: "Linked List Mastery",
    difficulty: "Intermediate",
    progress: "4",
    totalProblems: 21,
    about: "Work with singly, doubly, and circular linked lists effectively.",
  },
  {
    topic: "Tree Traversals",
    difficulty: "Intermediate",
    progress: "0",
    totalProblems: 19,
    about: "Explore DFS, BFS, inorder, preorder, and postorder traversals.",
  },
  {
    topic: "Stack & Queue",
    difficulty: "Beginner",
    progress: "6",
    totalProblems: 13,
    about: "Understand and implement stack and queue data structures for various problems.",
  },
  {
    topic: "Sliding Window Problems",
    difficulty: "Advanced",
    progress: "2",
    totalProblems: 17,
    about: "Learn this powerful technique to solve array and string problems efficiently.",
  }
]);


  const [select, setSelect] = useState("All");

  const handle = (e) => {
    setSelect(e.target.value);
  };

  const filteredCollection =
    select === "All"
      ? practiceTopics
      : practiceTopics.filter((item) => item.difficulty === select);

  return (
    <>
      <div className="filter-wrapper">
        <select className="filter-select" value={select} onChange={handle}>
          <option value="All">All</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div className="practice-container">
        <h2 className="practice-title">Practice Topics</h2>
        <div className="card-grid">
          {filteredCollection.map((practice, index) => (
            <Card key={index} practice={practice} handleClick={handleClick} />
          ))}
        </div>
      </div>
    </>
  );
}

function Card({ practice, handleClick }) {
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
          {/* <span className="progress-label">{practice.progress}%</span> */}
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
          <button className="view-button" onClick={handleClick}>
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
