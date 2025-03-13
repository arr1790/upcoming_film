const About = () => {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-4 sm:p-8">
      <div className="w-full mt-6 sm:mt-8">
          <img 
            src="/assets/banner-cines.jpg" 
            alt="Cartelera de cine" 
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
  
        <h1 className="mt-10 text-4xl font-bold mb-6">
          Quiénes Somos
        </h1>
        <p className="max-w-3xl text-base sm:text-lg text-gray-300 text-center mt-6 sm:mt-8 px-4">
          Bienvenido a <span className="text-blue-400 font-semibold">CINE 🎞️</span>, tu plataforma favorita para descubrir, 
          guardar y calificar películas. Nos apasiona el cine y queremos ofrecerte la mejor experiencia para encontrar nuevas películas, 
          explorar géneros y compartir tus favoritos con amigos.
        </p>
  
        {/* Nuestra Misión */}
        <div className="mt-6 sm:mt-8 w-full max-w-3xl px-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-400 text-center">
            Nuestra Misión
          </h2>
          <p className="text-gray-300 text-center mt-2 sm:mt-4 text-sm sm:text-base">
            Nuestra misión es conectar a los amantes del cine con el contenido que realmente disfrutan, 
            proporcionando información detallada sobre cada película y permitiendo crear listas de favoritos.
          </p>
        </div>
  
        {/* Contáctanos */}
        <div className="mt-6 sm:mt-8 w-full max-w-3xl px-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-400 text-center">
            Contáctanos
          </h2>
          <p className="text-gray-300 text-center mt-2 sm:mt-4 text-sm sm:text-base">
            Si tienes alguna pregunta o sugerencia, no dudes en escribirnos a{" "}
            <span className="text-yellow-400">contacto@cine.com</span>.
          </p>
        </div>
      </div>
    );
  };
  
  export default About;