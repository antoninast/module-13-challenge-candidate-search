import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  const currentPage = useLocation().pathname;

  return (
    <div className='nav-bar'>
      <div className='nav-bar-item'>
        <Link
          to='/'
          className={currentPage === '/' ? 'nav-link active': 'nav-link'}
        > Home
        </Link>
      </div>
      <div className='nav-bar-item'>
        <Link
          to='/SavedCandidates'
          className={currentPage === '/SavedCandidates' ? 'nav-link active': 'nav-link'}
        > Potential Candidates
        </Link>
      </div>
    </div>
  )
};

export default Nav;
