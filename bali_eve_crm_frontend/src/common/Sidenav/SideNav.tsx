import { useState } from 'preact/hooks';

function SideNav({ setNavTarget }: any) {
  return (
    <div className='border-r border-base-200 hidden lg:block'>
      <div className='drawer-side p-6'>
        <label htmlFor='my-drawer-2' className='drawer-overlay'></label>

        <CompanyInfo />

        <hr className=' mb-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-base-200 to-transparent opacity-25 dark:opacity-100' />

        <ul className='menu px-4 w-80 bg-base-100 text-base-content'>
          <SideNavLink setNavTarget={setNavTarget} name='Overview' />

          <SideNavLink setNavTarget={setNavTarget} name='Weddings' />

          <SideNavLink setNavTarget={setNavTarget} name='Tasks' />

          <SideNavLink setNavTarget={setNavTarget} name='Payments' />

          <SideNavLink setNavTarget={setNavTarget} name='Add Wedding' />

          <SideNavLink setNavTarget={setNavTarget} name='Edit Wedding' />
        </ul>
      </div>
    </div>
  );
}

function SideNavLink({
  name,
  setNavTarget,
}: {
  name: string;
  setNavTarget: any;
}) {
  return (
    <li onClick={() => setNavTarget(name.replace(' ', '_'))}>
      <h3>{name}</h3>
    </li>
  );
}

function CompanyInfo() {
  return (
    <div className='flex text-xs items-center space-x-4 mb-4'>
      <div className='h-14 w-14 rounded-full overflow-hidden border border-base-300'>
        <img src='/img/BaliEveLogo.webp' alt='Bali Eve Logo' />
      </div>

      <div>
        <h1 className='font-bold'>Bali Eve Dashboard</h1>
        <p>Info@balieveplanner.com</p>
      </div>
    </div>
  );
}

export default SideNav;
