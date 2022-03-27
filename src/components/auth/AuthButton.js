import { useAuth } from './context';
import { logout } from './service';
import className from 'classnames';
import { Link } from 'react-router-dom';
import './authButton.css';

function AuthButton() {
  const { isLogged, handleLogout: onLogout } = useAuth();

  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return isLogged ? (
    <button className={'header-button btn1'} onClick={handleLogoutClick}>
      Logout
    </button>
  ) : (
    <button
      as={Link}
      to="/login"
      variant="primary"
      className={'header-button btn1'}
    >
      Login
    </button>
  );
}

export default AuthButton;
