// src/components/CourseCard.jsx
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-xl">
      <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
      <p className="text-gray-600 mt-2">{course.description}</p>
      <Link
        to={`/courses/${course.id}`}
        className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
      >
        Ver detalles
      </Link>
    </div>
  );
};

export default CourseCard;
