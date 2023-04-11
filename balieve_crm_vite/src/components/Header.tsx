import { WeddingContext } from '../utilities/weddingsContext';
import { useContext } from 'preact/hooks';

export default function Header(props: any) {
  const { user } = useContext(WeddingContext);

  function handleLogout() {
    async function logout() {
      const response = await fetch('http://localhost:8000/api/v1/logout');
      const data = await response.json();
      window.location.href = '/';
    }
    logout();
  }

  return (
    <header className="h-screen bg-gradient-to-br from-green-900 to-green-800 w-[300px] flex flex-col justify-between text-slate-100 rounded-l-xl">
      <div className="text-sm">
        <div className="flex items-center space-x-4 px-4 py-6 border-b border-gray-300">
          <div className="h-14 w-14 rounded-full overflow-hidden">
            <img src="/img/BaliEveLogo.webp" alt="Bali Eve Logo" />
          </div>
          <div>
            <h1 className="font-bold">Bali-Eve Dashboard</h1>
            <p>Info@balieveplanner.com</p>
          </div>
        </div>

        <nav className="list-none">
          <div
            onClick={props.handleNavClick}
            id="Overview"
            className="flex items-center border-b border-gray-300 p-4 space-x-4 cursor-pointer hover:opacity-80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
              />
            </svg>

            <li className="">Overview</li>
          </div>

          <div
            onClick={props.handleNavClick}
            id="Weddings"
            className="flex items-center border-b border-gray-300 p-4 space-x-4 cursor-pointer hover:opacity-80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>

            <li className="">Weddings</li>
          </div>

          <div
            onClick={props.handleNavClick}
            id="PaymentTimeline"
            className="flex items-center border-b border-gray-300 p-4 space-x-4 cursor-pointer hover:opacity-80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>

            <li>Payment Timeline</li>
          </div>

          <div
            onClick={props.handleNavClick}
            id="Tasks"
            className="flex items-center border-b border-gray-300 p-4 space-x-4 cursor-pointer hover:opacity-80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="{1.5}"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>

            <li>Tasks</li>
          </div>

          <div
            onClick={props.handleNavClick}
            id="AddWedding"
            className="flex items-center border-b border-gray-300 p-4 space-x-4 cursor-pointer hover:opacity-80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              />
            </svg>

            <li>Add Wedding</li>
          </div>

          <div
            onClick={props.handleNavClick}
            id="EditWedding"
            className="flex items-center border-b border-gray-300 p-4 space-x-4 cursor-pointer hover:opacity-80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>

            <li>Edit Wedding</li>
          </div>
        </nav>
      </div>

      <div className="flex items-center justify-between border-t border-gray-300 p-4 text-sm">
        <div className="flex space-x-4 items-center">
          <div className="h-12 w-12 bg-white rounded-full overflow-hidden">
            {user && user.photo ? (
              <img
                src={user.photo}
                alt="Profile"
                referrerpolicy="no-referrer"
              />
            ) : null}
          </div>
          <div className="flex flex-col justify-start items-start space-y-1">
            <h3 className="font-bold">{user && user.displayName}</h3>
            <button className="text-xs">{user && user.email}</button>
          </div>
        </div>
        <div className="cursor-pointer" onClick={handleLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}
