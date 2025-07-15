import PropTypes from 'prop-types';

function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{course.title}</h3>
            <p className="text-sm text-gray-500">by {course.instructor}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            course.type === 'Free' 
              ? 'bg-green-100 text-green-800'
              : 'bg-purple-100 text-purple-800'
          }`}>
            {course.type === 'Free' ? 'Free' : `$${course.price}`}
          </span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">{course.description}</p>

        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {course.rating}
          </span>
          <span>•</span>
          <span>{course.students.toLocaleString()} students</span>
          <span>•</span>
          <span>{course.duration}</span>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
            {course.category}
          </span>
          <a
            href={course.enrollmentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Enroll Now
          </a>
        </div>
      </div>
    </div>
  );
}

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    instructor: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    students: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number,
    enrollmentLink: PropTypes.string.isRequired,
  }).isRequired,
};

export default CourseCard;
