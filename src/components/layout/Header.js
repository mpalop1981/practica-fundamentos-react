import './header.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import AuthButton from '../auth/AuthButton';
import NewAdvertButton from '../adverts/NewAdvertButton/NewAdvertButton';

function Header() {
  return (
    <header className={classNames('header')}>
      <Link to="/">
        <div>DASHBOARD</div>
      </Link>
      <nav>
        <div>
          <NewAdvertButton>Publish</NewAdvertButton>
          <AuthButton>Log out</AuthButton>
        </div>
      </nav>
    </header>
  );
}

export default Header;
