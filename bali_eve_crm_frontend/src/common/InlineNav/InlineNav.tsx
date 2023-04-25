import { useContext, useEffect } from 'preact/hooks';
import { WeddingContext } from '../../context/WeddingsContext';
import API_URL from '../../env';

function InlineNav({ name, imageLink, searchTerm, setSearchTerm }: any) {
  const { user } = useContext(WeddingContext);

  async function handleLogout() {
    try {
      const response = await fetch(`${API_URL}/api/v1/logout`);
      if (response.ok) {
        const data = await response.json();
        console.log('Succeesfully logged out');
        window.location.href = '/';
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    console.log(user?.photo);
  }, [user]);

  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <a className='btn btn-ghost normal-case text-xl'>
          {name.replace('_', ' ')}
        </a>
      </div>
      <div className='flex-none gap-2'>
        <div className='form-control h-10 hidden sm:flex'>
          <input
            type='text'
            placeholder='Search'
            value={searchTerm}
            onInput={(event) => {
              if (event.target instanceof HTMLInputElement) {
                setSearchTerm(event.target.value);
              }
            }}
            onBlur={() => setSearchTerm('')}
            className='input input-bordered'
          />
        </div>
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full border border-base-300'>
              {/* Needs updating when layout done for the current user */}
              <img src={user?.photo} referrerpolicy='no-referrer' />
            </div>
          </label>
          <ul
            tabIndex={0}
            className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
          >
            <li>
              <a className='justify-between'>
                Profile
                <span className='badge'>New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li onClick={handleLogout}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InlineNav;
