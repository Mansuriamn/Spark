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

  const [Question, setQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    answer: '',
  });

  const [Colection, setColection] = useState([]);

  const AddedQuestion = () => {
    setShow(true);
  };

  const handleInputChange = (e) => {
    setQuestion({ ...Question, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...Question.options];
    newOptions[index] = value;
    setQuestion({ ...Question, options: newOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setColection([...Colection, Question]);
    setQuestion({
      question: '',
      options: ['', '', '', ''],
      answer: '',
    });
    setShow(false);
  };

  const cancelForm = () => {
    setShow(false);
  };

  const deleteQuestion = (index) => {
    const updated = [...Colection];
    updated.splice(index, 1);
    setColection(updated);
  };

  return (
    <>
      <div
        style={{ marginTop:"10px" }}
        className="flex flex-col items-center justify-center"
      >
        <div className="bg-white p-4 rounded-lg shadow-md w-[90%]">
          <h1 className="text-2xl font-bold mb-4 text-center">{QuizeData.title}</h1>
          
          <p className="text-gray-600">Level: {QuizeData.level}</p>
          <p className="text-gray-600">{QuizeData.description}</p>

          {!Show && (
            <div
              className="flex items-center justify-center mt-4"
            >
              <button
                style={{ marginTop: "15px" }}
                type='button'
                onClick={AddedQuestion}
                className="w-[20%] bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Plus size={18} />
                <span>Add Question</span>
              </button>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className={`mt-4 ${Show ? 'block' : 'hidden'}`}
          >
            <div className="relative">
              <input
                type="text"
                name="question"
                placeholder="Enter question"
                value={Question.question}
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

            {Question.options.map((option, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mt-4"
                required
              />
            ))}

            <input
              type="text"
              name="answer"
              placeholder="Correct answer"
              value={Question.answer}
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

          {/* Table of submitted questions */}
          {Colection.length > 0 && (
            <div className="mt-8 overflow-x-auto">
              <h3 className="text-xl font-semibold mb-4 text-center">
                Submitted Questions
              </h3>
              <table className="w-full border border-gray-300 text-sm">
                <thead className="bg-purple-100 text-gray-800">
                  <tr>
                    <th className="border p-2 text-left">#</th>
                    <th className="border p-2 text-left">Question</th>
                    <th className="border p-2 text-left">Options</th>
                    <th className="border p-2 text-left">Answer</th>
                    <th className="border p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Colection.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">{item.question}</td>
                      <td className="border p-2">
                        {item.options.map((opt, i) => (
                          <div key={i}>{`${i + 1}) ${opt}`}</div>
                        ))}
                      </td>
                      <td className="border p-2">{item.answer}</td>
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
      {/* <Footer /> */}
    </>
  );
}
