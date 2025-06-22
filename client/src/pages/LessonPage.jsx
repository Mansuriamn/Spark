import React, { useEffect, useState } from 'react';


const LessonPage = ({ lessonId }) => {
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    fetch(`/api/lessons/${lesson._id}`)
      .then(res => res.json())
      .then(data => setLesson(data));
  }, [lessonId]);

  if (!lesson) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
      <LessonVideoPlayer videos={lesson.videos} />
    </div>
  );
};

export default LessonPage;
