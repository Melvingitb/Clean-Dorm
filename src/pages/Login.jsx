import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from '../components/Form'

function Login( { isLoggedIn } ) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/house", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Form />
    </>
  )
}

export default Login