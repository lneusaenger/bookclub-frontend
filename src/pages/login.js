import { useState } from "react"
import NavBar from "../components/Navbar"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
    setEmail('')
    setPassword('')
  }

  const goToSignup = () => {
    window.location.href = "/signup";
  };

  return (
    <div className = "auth-page">
        <NavBar/>
        <div className = "form-content">
    <form className="auth-form" onSubmit={handleSubmit}>
    <h3 className = "form-heading"><b>LOG IN</b></h3>
    <div className = "form-group">
        <input 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            placeholder="email"
            className = "form-control"
        />
    </div>
    <div className = "form-group">
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
        placeholder="password"
        className = "form-control"
      />
    </div>
      <button disabled = {isLoading} className = 'auth-btn'>Log in</button>
      {error && <div className="error">{error}</div>}
      <div>
        <span>Not a book club member yet?</span>
        <button style = {{color: 'black', fontFamily: 'Montserrat'}} onClick = {goToSignup}><b>Sign up here.</b></button>
      </div>
    </form>
    </div>
    </div>
  )
}

export default Login