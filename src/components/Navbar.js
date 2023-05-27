import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const NavBar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext();

  const handleClick = () => {
    logout()
  }

  return (
    <div className = "nav-container">
      <nav className = "nav-list">
        <Link to="/" className = "nav-item">
          <span>HOME</span>
        </Link>
        <Link to="/shelves" className = "nav-item">
          <span>READS</span>
        </Link>
        <Link to="/loaning" className = "nav-item">
          <span>BORROW</span>
        </Link>
        <Link to="/people" className = "nav-item">
          <span>PEOPLE</span>
        </Link>
        {!user && (<div><Link to="/login" className = "nav-item">
                          <span>LOGIN</span>
                        </Link>
                        <span className="login-spacer">•</span>
                        <Link to="/signup" className = "nav-item">
                          <span>SIGNUP</span>
                        </Link>
                  </div>)}
        {user && (
            <div>
              {/* <Link to="/account" className = "nav-item">
                <span>ACCOUNT</span>
              </Link>
              <span className="login-spacer">•</span> */}
              <Link to="/" className = "nav-item" onClick={handleClick}>
                <span>LOGOUT</span>
              </Link>
            </div>
          )}
          </nav>
    </div>
  );
};

export default NavBar;


