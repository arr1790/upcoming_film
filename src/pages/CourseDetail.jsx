// src/pages/CourseDetail.jsx
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { courseId } = useParams();
  const course = {
    id: courseId,
    title: 'Curso de React',
    description: 'Aprende React desde cero.',
    content: 'Contenido detallado del curso...',
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">{course.title}</h2>
      <p className="text-lg text-gray-600 mb-4">{course.description}</p>
      <p className="text-gray-700">{course.content}</p>
    </div>
  );
};

export default CourseDetail;
