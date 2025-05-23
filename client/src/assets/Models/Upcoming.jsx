import { FaClock } from 'react-icons/fa';


const courses = [
  {
    title: "Advanced JavaScript Programming",
    instructor: "David Miller",
    progress: 75,
    lastActivity: "2 days ago",
    image: "https://i.pinimg.com/736x/cd/34/8b/cd348b55d06f92d252109ad2784a9382.jpg",
  },
  {
    title: "React Mastery Bootcamp",
    instructor: "Sarah Lee",
    progress: 50,
    lastActivity: "5 days ago",
    image: "	https://i.pinimg.com/736x/cd/34/8b/cd348b55d06f92d252109ad2784a9382.jpg",
  },
  {
    title: "Advanced JavaScript Programming",
    instructor: "David Miller",
    progress: 75,
    lastActivity: "2 days ago",
    image: "	https://i.pinimg.com/736x/cd/34/8b/cd348b55d06f92d252109ad2784a9382.jpg",
  },
];

const UpcomingCourses = () => {
  return (

    

    <div className="mt-3 h-[100%] mx-auto rounded-2xl  border border-transparent bg-white">
     
      <div className="w-full">
        
        <div className="flex justify-between items-center mb-15 px-4">
          <h2 className="text-3xl font-bold">Upcoming Courses</h2>

        </div>

       
        <div className="flex flex-wrap justify-center gap-6 ">
          {courses.slice(0, 3).map((course, index) => (
            <div
              key={index}
              className="w-[300px] bg-white rounded-2xl  border  overflow-hidden"
            >
              <img src={course.image} alt="Course" className="w-full h-44 object-cover" />

              <div className="p-4">
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-gray-500">{course.instructor}</p>

                <div className="mt-4">
                  <p className="font-medium">
                    Progress : <span className="text-black font-semibold">{course.progress}%</span>{' '}
                    <span className="text-xs text-gray-500">Not Completed!</span>
                  </p>
                  <div className="w-full h-2 mt-1 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-red-500 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500 mt-3">
                  <FaClock className="mr-1" />
                  Last Activity : {course.lastActivity}
                </div>

                <button className="w-full bg-gray-100 py-2 mt-4 rounded-md font-medium hover:bg-gray-200">
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>

       
        <div className="flex justify-center mt-20">
          <button className="bg-gray-100 text-gray-900  px-25 py-3 rounded-b-md text-sm hover:bg-gray-200">
            View All Courses
          </button>
        </div>
      </div>
    </div>


  );
};

export default UpcomingCourses;
