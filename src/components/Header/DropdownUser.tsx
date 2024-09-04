import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import UserOne from '../../images/user/user-01.png';
import { TokenPayload } from '../../App';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from './AuthContext';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<TokenPayload | null>(null);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth(); // Utilisez le contexte pour mettre à jour l'état d'authentification

  useEffect(() => {
    const token = localStorage.getItem('access_token'); // Retrieve token from localStorage
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token); // Decode token
        console.log('Decoded Token:', decoded); // Vérifiez la structure du jeton
        setUserInfo(decoded); // Store the decoded user information
      } catch (error) {
        console.error('Invalid token:', error);
        // Handle the invalid token case, e.g., redirect to login or clear token
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/');
      }
    }
  }, [navigate]);

  const logout = () => {
    // Supprime les tokens du localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Vérifie si les tokens sont supprimés
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    
    console.log('Stored accessToken:', accessToken);
    console.log('Stored refreshToken:', refreshToken);

    setUserInfo(null);
    setIsAuthenticated(false); // Met à jour l'état d'authentification

    // Redirect to SignIn page
    navigate('/');
  };

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        {userInfo && (
          <span className="hidden text-right lg:block">
            <span className="block text-sm font-medium text-black dark:text-white">
              {userInfo.firstName || 'User'} {/* Utiliser firstName */}
            </span>
            <span className="block text-xs">{userInfo.email || 'Email'}</span>
          </span>
        )}

        <span className="h-12 w-12 rounded-full">
          <img src={UserOne} alt="User" />
        </span>

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>

      {/* Dropdown Start */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <svg className="fill-current" width="22" height="22" viewBox="0 0 22 22">
                  <path d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z" fill="" />
                  <path d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z" fill="" />
                </svg>
                My Profile
              </Link>
            </li>
            <li>
              <Link to="/contacts" className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                <svg className="fill-current" width="22" height="22" viewBox="0 0 22 22">
                  <path d="M17.6687 1.44374C17.1187 0.893744 16.3937 0.618744 15.675 0.618744H7.42498C6.22185 0.618744 5.25935 1.61562 5.25935 2.75937V3.47187H4.29685C3.84998 3.47187 3.50623 3.81562 3.50623 4.26249C3.50623 4.70937 3.84998 5.05312 4.29685 5.05312H5.25935V6.51875H4.29685C3.88435 6.51875 3.50623 6.8625 3.50623 7.30937C3.50623 7.75624 3.84998 8.1 4.29685 8.1H5.25935V10.4187H4.29685C3.84998 10.4187 3.50623 10.7625 3.50623 11.2094C3.50623 11.6562 3.84998 12 4.29685 12H5.25935V13.8375H4.29685C3.84998 13.8375 3.50623 14.1812 3.50623 14.6281C3.50623 15.075 3.84998 15.4187 4.29685 15.4187H5.25935V16.4312H4.29685C3.88435 16.4312 3.50623 16.775 3.50623 17.2219C3.50623 17.6687 3.84998 18.0125 4.29685 18.0125H5.25935V19.25C5.25935 20.4187 6.22185 21.4156 7.42498 21.4156H15.675C17.2218 21.4156 18.4937 20.1437 18.5281 18.5969V3.47187C18.4937 2.68124 18.2187 1.95937 17.6687 1.44374ZM16.9469 18.5625C16.9469 19.2844 16.3625 19.8344 15.6406 19.8344H7.3906C7.04685 19.8344 6.77185 19.5594 6.77185 19.2156V17.875H8.6281C9.0406 17.875 9.41873 17.5312 9.41873 17.0844C9.41873 16.6375 9.07498 16.2937 8.6281 16.2937H6.77185V11.7906H8.6281C9.0406 11.7906 9.41873 11.4469 9.41873 11C9.41873 10.5875 9.07498 10.2094 8.6281 10.2094H6.77185V5.63749H8.6281C9.0406 5.63749 9.41873 5.29374 9.41873 4.84687C9.41873 4.43437 9.07498 4.05624 8.6281 4.05624H6.77185V2.75937C6.77185 2.37812 7.0531 2.09687 7.42498 2.09687H15.675C15.9719 2.09687 16.2344 2.22187 16.4312 2.44687C16.6281 2.67187 16.7531 2.93437 16.7531 3.26562V18.5969H16.9469V18.5625Z" fill="" />
                </svg>
                Contacts
              </Link>
            </li>
          </ul>

          <button
            className="block w-full bg-primary py-4 px-4 text-center text-white hover:bg-opacity-90"
            onClick={logout}
          >
            Sign Out
          </button>
        </div>
      )}
      {/* Dropdown End */}
    </ClickOutside>
  );
};

export default DropdownUser;
