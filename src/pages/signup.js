import { useState } from "react"
import NavBar from "../components/Navbar"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const {signup, error, isLoading} = useSignup()


  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password, name)
  }

  // Function to handle navigation to the Home page
  const goToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className = "auth-page">
    <NavBar/>
    <div className = "form-content">
    <form className="auth-form" onSubmit={handleSubmit}>
    <h3 className = "form-heading"><b>SIGN UP</b></h3>
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
            type="name" 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
            placeholder="name"
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
      <button disabled={isLoading} className = 'auth-btn'>Sign up</button>
      {error && <div className="error">{error}</div>}
      <div>
        <span>Already a member?</span>
        <button style = {{color: 'black', fontFamily: 'Montserrat'}} onClick = {goToLogin}><b>Log in here.</b></button>
      </div>
    </form>
    </div>
    </div>
  )
}

export default Signup