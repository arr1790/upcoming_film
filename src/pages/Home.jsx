// src/pages/Home.jsx
import CourseCard from '../components/CourseCard';

const Home = () => {
  const courses = [
    { id: 1, title: 'Curso de React', description: 'Aprende React desde cero.' },
    { id: 2, title: 'Curso de JavaScript', description: 'Domina JavaScript para el desarrollo web.' },
    { id: 3, title: 'Curso de Python', description: 'Inicia con Python para la programación.' }
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Bienvenidos a nuestra Academia Online</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Home;
