import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { AuthContext } from '../pages/AuthContext';
import { Trash2, ArrowLeft } from 'lucide-react';

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
 const [addForm, setAddForm] = useState({
  questionText: '',
  option1:'',  
  option2: '',
  option3: '',
  option4: '',
  answer: '',
  status: 'Not Solve',
});

  const { token } = useContext(AuthContext);

  console.log('Quiz page useParams id:', id); // Debug log

  useEffect(() => {
    if (!id) {
      setQuiz(null);
      setQuestions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/quizzes/${id}`);
        if (!res.ok) throw new Error('Failed to fetch quiz');
        const data = await res.json();
        setQuiz(data.quiz || data);
      } catch (err) {
        setQuiz(null);
      } finally {
        setLoading(false);
      }
    };
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/quizzes/${id}/questions`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch questions');
        const data = await res.json();
        console.log('Quiz questions API response:', data);
        let questionsArr = [];
        if (Array.isArray(data)) {
          questionsArr = data;
        } else if (Array.isArray(data.questions)) {
          questionsArr = data.questions;
        } else if (data.data && Array.isArray(data.data.questions)) {
          questionsArr = data.data.questions;
        } else if (data.data && Array.isArray(data.data)) {
          questionsArr = data.data;
        } else if (data.success && Array.isArray(data.questions)) {
          questionsArr = data.questions;
        }
        setQuestions(questionsArr);
      } catch (err) {
        setQuestions([]);
      }
    };
    fetchQuiz();
    fetchQuestions();
  }, [id]);

  const handleEditClick = (question) => {
    setEditingQuestionId(question._id || question.id);
    setEditForm({
      questionText: question.questionText,
      option1: question.option1,
      option2: question.option2,
      option3: question.option3,
      option4: question.option4,
      answer: question.answer,
      status: question.status,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (questionId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/quizzes/${id}/questions/${questionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error('Failed to update question');
      setEditingQuestionId(null);
      // Refresh questions
      const data = await res.json();
      setQuestions((prev) => prev.map(q => (q._id === questionId || q.id === questionId ? data : q)));
    } catch (err) {
      alert('Failed to update question');
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/quizzes/${id}/questions/${questionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Failed to delete question');
      // Refresh questions
      const qRes = await fetch(`http://localhost:5000/api/quizzes/${id}/questions`);
      const qData = await qRes.json();
      setQuestions(qData.questions || qData);
    } catch (err) {
      alert('Failed to delete question: ' + err.message);
    }
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!addForm.questionText || !addForm.option1 || !addForm.option2 || !addForm.option3 || !addForm.option4 || !addForm.answer) {
      alert('Please fill all fields');
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/quizzes/${id}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(addForm)
      });
      if (!res.ok) throw new Error('Failed to add question');
      setAddForm({ questionText: '', option1: '', option2: '', option3: '', option4: '', answer: '', status: 'Not Solve' });
      setShowAddForm(false);
      // Refresh questions
      const qRes = await fetch(`http://localhost:5000/api/quizzes/${id}/questions`);
      const qData = await qRes.json();
      setQuestions(qData.questions || qData);
    } catch (err) {
      alert('Failed to add question: ' + err.message);
    }
  };

  if (!id) return <div>Quiz ID is missing from the URL.</div>;
  if (loading) return <div>Loading...</div>;
  if (!quiz) return <div>Quiz not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-3xl mx-auto bg-white/80 rounded-2xl shadow-xl p-8 border border-white/20 relative">
        {/* Back Icon */}
        <button
          className="absolute top-4 left-4 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow text-gray-500 hover:text-purple-700 transition-colors border border-gray-200"
          onClick={() => navigate(-1)}
          title="Back"
          style={{ zIndex: 10 }}
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="sr-only">Back</span>
        </button>
        {/* Title below the icon with extra spacing */}
        <div className="mt-12 mb-2">
          <h2 className="text-2xl font-bold text-purple-800">{quiz ? quiz.title : 'Practice Question'}</h2>
        </div>
        <p className="mb-6 text-gray-700">{quiz ? quiz.description : ''}</p>
        <button
          className="mb-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium"
          onClick={() => setShowAddForm((prev) => !prev)}
        >
          {showAddForm ? 'Cancel' : 'Add Question'}
        </button>
        {showAddForm && (
          <form className="mb-6 bg-purple-50 p-4 rounded-xl" onSubmit={handleAddQuestion}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="questionText"
                placeholder="Question"
                value={addForm.questionText}
                onChange={handleAddInputChange}
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="option1"
                placeholder="Option 1"
                value={addForm.option1}
                onChange={handleAddInputChange}
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="option2"
                placeholder="Option 2"
                value={addForm.option2}
                onChange={handleAddInputChange}
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="option3"
                placeholder="Option 3"
                value={addForm.option3}
                onChange={handleAddInputChange}
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="option4"
                placeholder="Option 4"
                value={addForm.option4}
                onChange={handleAddInputChange}
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="answer"
                placeholder="Answer"
                value={addForm.answer}
                onChange={handleAddInputChange}
                className="p-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl font-medium"
            >
              Save Question
            </button>
          </form>
        )}
        <div className="overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4 text-center">Quiz Questions</h3>
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-purple-100 text-gray-800">
              <tr>
                <th className="border p-2 text-left">#</th>
                <th className="border p-2 text-left">Question</th>
                <th className="border p-2 text-left">Answer</th>
                <th className="border p-2 text-left">Status</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.length > 0 ? questions.map((item, index) => (
                <tr key={item._id || index} className="hover:bg-gray-50">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item.questionText}</td>
                  <td className="border p-2">{item.answer}</td>
                  <td className="border p-2">{item.status}</td>
                  <td className="border p-2 text-center">
                    <button onClick={() => handleDeleteQuestion(item._id || item.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="5" className="text-center text-gray-500">No questions added yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}
