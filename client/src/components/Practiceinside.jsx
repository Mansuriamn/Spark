import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, Code, Trophy, Target, Zap } from 'lucide-react';
import Footer from './Footer';

const initialProblems = [
  { id: 1, title: "Online Stock Span", status: "Not Attempted", difficulty: "Medium", category: "Stack" },
  { id: 2, title: "Daily Temperatures", status: "Not Attempted", difficulty: "Medium", category: "Stack" },
  { id: 3, title: "Non-Overlapping Intervals", status: "Not Attempted", difficulty: "Medium", category: "Greedy" },
  { id: 4, title: "Minimum Number of Arrows to Burst Balloons", status: "Not Attempted", difficulty: "Medium", category: "Greedy" },
  { id: 5, title: "Unique Paths", status: "Not Attempted", difficulty: "Medium", category: "Dynamic Programming" },
  { id: 6, title: "Longest Common Subsequence", status: "Not Attempted", difficulty: "Medium", category: "Dynamic Programming" },
  { id: 7, title: "Best Time to Buy and Sell Stock", status: "Not Attempted", difficulty: "Easy", category: "Array" },
  { id: 8, title: "Edit Distance", status: "Not Attempted", difficulty: "Hard", category: "Dynamic Programming" },
  { id: 9, title: "Word Search", status: "Not Attempted", difficulty: "Medium", category: "Backtracking" },
  { id: 10, title: "Letter Combinations of a Phone Number", status: "Not Attempted", difficulty: "Medium", category: "Backtracking" }
];

const PathToProficiency = () => {
  const [problems, setProblems] = useState(initialProblems);
  const [filter, setFilter] = useState('All');

  const solvedCount = problems.filter(p => p.status === 'Solved').length;
  const progressPercentage = Math.round((solvedCount / problems.length) * 100);

  const filteredProblems = problems.filter(problem => {
    if (filter === 'Solved') return problem.status === 'Solved';
    if (filter === 'Unsolved') return problem.status === 'Not Attempted';
    return true;
  });

  const handleSolve = (problemId) => {
    setProblems(prevProblems => {
      const updatedProblems = prevProblems.map(problem => 
        problem.id === problemId 
          ? { ...problem, status: 'Solved' }
          : problem
      );
      console.log('Updated problems:', updatedProblems);
      return updatedProblems;
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Stack': 'bg-blue-50 text-blue-700',
      'Greedy': 'bg-purple-50 text-purple-700',
      'Dynamic Programming': 'bg-indigo-50 text-indigo-700',
      'Array': 'bg-orange-50 text-orange-700',
      'Backtracking': 'bg-pink-50 text-pink-700'
    };
    return colors[category] || 'bg-gray-50 text-gray-700';
  };

  return (
   <>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-600 rounded-xl shadow-lg">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Path to Proficiency</h1>
              <p className="text-gray-600 mt-1">Master complex algorithms and data structures</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Trophy className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{solvedCount}</p>
                <p className="text-sm text-gray-600">Solved</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{problems.length - solvedCount}</p>
                <p className="text-sm text-gray-600">Remaining</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{progressPercentage}%</p>
                <p className="text-sm text-gray-600">Progress</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Code className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{problems.length}</p>
                <p className="text-sm text-gray-600">Total Problems</p>
              </div>
            </div>
          </div>
        </div>

        {/* progress Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Overall Progress</h3>
              <p className="text-gray-600">Keep going! You're making great progress.</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-indigo-600">{progressPercentage}%</p>
              <p className="text-sm text-gray-500">Complete</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-purple-600 h-full rounded-full transition-all duration-700 ease-out transform"
              style={{ 
                width: `${progressPercentage}%`,
                transition: 'width 0.7s ease-out'
              }}
            ></div>
          </div>
        </div>

        {/* filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["All", "Unsolved", "Solved"].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === tab 
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-200" 
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {tab} ({tab === 'All' ? problems.length : tab === 'Solved' ? solvedCount : problems.length - solvedCount})
            </button>
          ))}
        </div>

        {/*Problems Table*/}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          {/*Desktop View*/}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Problem</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProblems.map((problem, index) => (
                  <tr key={problem.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{problem.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(problem.category)}`}>
                        {problem.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {problem.status === "Solved" ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Solved</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-500">
                          <XCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Not Attempted</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {problem.status !== "Solved" && (
                        <button
                          onClick={() => handleSolve(problem.id)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          Solve
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/*Mobile View*/}
          <div className="lg:hidden">
            {filteredProblems.map((problem, index) => (
              <div key={problem.id} className="p-4 border-b border-gray-200 last:border-b-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-gray-900 text-sm leading-tight">{problem.title}</h3>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(problem.category)}`}>
                    {problem.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  {problem.status === "Solved" ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Solved</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-500">
                      <XCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Not Attempted</span>
                    </div>
                  )}
                  
                  {problem.status !== "Solved" && (
                    <button
                      onClick={() => handleSolve(problem.id)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      Solve
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">No problems match your current filter.</p>
          </div>
        )}
      </div>
    </div>
    <Footer/>
   </>
  );
};

export default PathToProficiency;