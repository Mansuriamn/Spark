import React, { useState } from 'react';
import Footer from '../components/Footer';
import { Plus, X, Trash2 } from 'lucide-react';

export default function Quiz() {
  const QuizeData = {
    title: 'Sample Quiz',
    level: 'Beginner',
    description: 'This is a sample quiz description.',
  };

  const [Show, setShow] = useState(false);

  const [QuestionData, setQuestionData] = useState({
    question: '',
    level: '',
    url: '',
  });

  const [Collection, setCollection] = useState([]);

  const AddedQuestion = () => {
    setShow(true);
  };

  const handleInputChange = (e) => {
    setQuestionData({ ...QuestionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCollection([...Collection, QuestionData]);
    setQuestionData({ question: '', level: '', url: '' });
    setShow(false);
  };

  const cancelForm = () => {
    setShow(false);
  };

  const deleteQuestion = (index) => {
    const updated = [...Collection];
    updated.splice(index, 1);
    setCollection(updated);
  };

  return (
    <>
      <div style={{ marginTop: '10px' }} className="flex flex-col items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-md w-[90%]">
          <h1 className="text-2xl font-bold mb-4 text-center">{QuizeData.title}</h1>

          <p className="text-gray-600">Level: {QuizeData.level}</p>
          <p className="text-gray-600">{QuizeData.description}</p>

          {!Show && (
            <div className="flex items-center justify-center mt-4">
              <button
                style={{ marginTop: '15px' }}
                type="button"
                onClick={AddedQuestion}
                className="w-[20%] bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Plus size={18} />
                <span>Add Question</span>
              </button>
            </div>
          )}

          {/* Form for Question, Level, URL */}
          <form
            onSubmit={handleSubmit}
            className={`mt-4 ${Show ? 'block' : 'hidden'}`}
          >
            <div className="relative">
              <input
                type="text"
                name="question"
                placeholder="Enter question"
                value={QuestionData.question}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg mt-4"
                required
              />
              <button
                type="button"
                onClick={cancelForm}
                className="absolute top-6 right-2 text-gray-500 hover:text-red-600"
              >
                <X />
              </button>
            </div>

            <select
              name="level"
              value={QuestionData.level}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg mt-4"
              required
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <input
              type="url"
              name="url"
              placeholder="Enter related URL"
              value={QuestionData.url}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg mt-4"
              required
            />

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-lg mt-4"
            >
              Submit
            </button>
          </form>

          {/* Table for Questions */}
          {Collection.length > 0 && (
            <div className="mt-8 overflow-x-auto">
              <h3 className="text-xl font-semibold mb-4 text-center">
                Submitted Questions
              </h3>
              <table className="w-full border border-gray-300 text-sm">
                <thead className="bg-purple-100 text-gray-800">
                  <tr>
                    <th className="border p-2 text-left">#</th>
                    <th className="border p-2 text-left">Question</th>
                    <th className="border p-2 text-left">Level</th>
                    <th className="border p-2 text-left">URL</th>
                    <th className="border p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Collection.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">{item.question}</td>
                      <td className="border p-2">{item.level}</td>
                      <td className="border p-2">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Link
                        </a>
                      </td>
                      <td className="border p-2">
                        <button
                          onClick={() => deleteQuestion(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
     <div className='mt-10'>
       <Footer />
     </div>
    </>
  );
}
