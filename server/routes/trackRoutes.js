import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  const tracks = [
    {
      key: 'front-end',
      title: 'Front-End',
      description: 'Front-end development focuses...',
      courses: 6,
      lessons: 18,
      duration: '25 hr, 30 minutes'
    },
    {
      key: 'back-end',
      title: 'Back-End',
      description: 'Back-end development involves...',
      courses: 5,
      lessons: 15,
      duration: '22 hr, 10 minutes'
    },
    {
      key: 'android',
      title: 'Android',
      description: 'Android development focuses...',
      courses: 4,
      lessons: 12,
      duration: '19 hr, 45 minutes'
    }
  ];
  res.json(tracks);
});

export default router;
