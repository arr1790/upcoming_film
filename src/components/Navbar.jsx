// src/components/Navbar.jsx
import { Link } from 'react-router-dom';


 async function getSessionId() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjdmZjgxOGVlOTFjYjUyNWQ5NjQzYjc3NjAwNjA5NSIsIm5iZiI6MTc0MDIxODY4Ni4xLCJzdWIiOiI2N2I5YTEzZTU1ZGQ4MTJmYWQ0NjUyMjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.9UuuOiY9HJuW1wTprs9MEXmP0Cm1GJ7-3TwPC-DN2DQ'
    }
  };
  
   let res= await fetch('https://api.themoviedb.org/3/authentication/token/new?api_key=a67ff818ee91cb525d9643b776006095', options)
   let data = await res.json()
   console.log(data.request_token)
    window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=http://localhost:5173/`
   const options1 = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjdmZjgxOGVlOTFjYjUyNWQ5NjQzYjc3NjAwNjA5NSIsIm5iZiI6MTc0MDIxODY4Ni4xLCJzdWIiOiI2N2I5YTEzZTU1ZGQ4MTJmYWQ0NjUyMjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.9UuuOiY9HJuW1wTprs9MEXmP0Cm1GJ7-3TwPC-DN2DQ'
    },
    body: JSON.stringify({"request_token": data.request_token})
  };
  
   res = await fetch('https://api.themoviedb.org/3/authentication/session/new?api_key=a67ff818ee91cb525d9643b776006095', options1)
   data = await res.json()
   console.log(data.session_id)

  }


const Navbar = () => {



  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-between items-center text-white">
        <li>
          <Link to="/" className="hover:text-blue-400 ">Cine</Link>
          {/* <Link to="/" className="hover:text-blue-400 pl-4 w-8 h-8">Iniciar sesion</Link>
          <Link to="/" className="hover:text-blue-400 pl-4">Registrarse</Link> */}
          <p onClick={getSessionId}>Iniciar Sesion</p>
        </li>
         <li>      
          <img src="/camara.png" alt="Cine" className="w-8 h-8" />
        </li>
      </ul>
    </nav>
  );
  
};

export default Navbar;
