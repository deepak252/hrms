import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <h1 className="text-xl font-semibold tracking-wide text-gray-700">
            HRMS Lite
          </h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
