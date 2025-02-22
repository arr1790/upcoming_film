// src/pages/Contact.jsx
const Contact = () => {
    return (
      <div className="p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Contacto</h2>
        <p className="text-lg text-gray-600 mb-4">
          Si tienes alguna pregunta, no dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte.
        </p>
        
        <div className="max-w-lg mx-auto">
          <form action="#" method="POST">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Tu nombre"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Tu correo electrónico"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Escribe tu mensaje"
              ></textarea>
            </div>
  
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Contact;
  