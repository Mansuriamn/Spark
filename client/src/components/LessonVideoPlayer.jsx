// 📁 components/LessonVideoPlayer.jsx
import React from 'react';

const LessonVideoPlayer = ({ videos }) => {
  if (!videos || videos.length === 0) return <p>No videos available.</p>;

  return (
    <div className="space-y-6">
      {videos.map((video, index) => (
        <div key={index}>
          <h3 className="text-xl font-semibold">{video.title}</h3>
          <video
            src={video.url}
            controls
            width="100%"
            className="rounded shadow"
          />
          {video.description && <p className="text-sm mt-1">{video.description}</p>}
        </div>
      ))}
    </div>
  );
};

export default LessonVideoPlayer;
