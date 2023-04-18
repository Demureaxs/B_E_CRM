import { useContext, useState } from 'preact/hooks';
import { useEffect } from 'preact/hooks';
import { IUser, WeddingContext } from '../../context/WeddingsContext';

function AddWedding() {
  const [planner, setPlanner] = useState('');
  const [name, setName] = useState('');
  const [budget, setBudget] = useState(0);
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [guests, setGuests] = useState(0);
  const [foodAndBeverage, setFoodAndBeverage] = useState('');
  const [decoration, setDecoration] = useState('');
  const [production, setProduction] = useState('');
  const [videographer, setVideographer] = useState('');
  const [photographer, setPhotographer] = useState('');
  const [vendorProgress, setVendorProgress] = useState('');

  const { refetchData, agents } = useContext(WeddingContext);

  async function handleSave() {
    const agentId = agents.find((agent) => agent.displayName === planner)?._id;
    console.log(agentId);
    const wedding = {
      agent: planner,
      agentId: agentId,
      name: name,
      budget: budget,
      email: email,
      date: date,
      venue: venue,
      guests: guests,
      foodAndBeverage: foodAndBeverage,
      decoration: decoration,
      production: production,
      videographer: videographer,
      photographer: photographer,
      vendorProgress: vendorProgress,
    };

    try {
      const url = `http://192.168.18.7:8000/api/v1/weddings`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wedding),
      });

      if (response.ok) {
        const data = await response.json();

        console.log('Wedding Saved');
        refetchData();
      }
      setPlanner('');
      setName('');
      setBudget(0);
      setEmail('');
      setDate('');
      setVenue('');
      setGuests(0);
      setFoodAndBeverage('');
      setDecoration('');
      setProduction('');
      setVideographer('');
      setPhotographer('');
      setVendorProgress('');
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(event: Event, setState: any) {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    setState(value);
  }

  const formattedBudget = budget.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

  return (
    <div className='flex gap-6 h-full w-full space-y-4  overflow-y-scroll scrollbar-none'>
      <div className='bg-base-100 space-y-4 h-fit p-6 flex-1 mx-auto rounded'>
        <p className='text-xs '>Agent:</p>
        <select
          defaultValue={'Agent1'}
          name='agent'
          value={planner}
          onChange={(event) => handleChange(event, setPlanner)}
          className='focus:outline-none text-sm w-full px-2 py-1'
          placeholder='Select Agent'
        >
          {agents &&
            agents.map((agent) => {
              return (
                <option key={agent._id} value={agent.displayName}>
                  {agent.displayName}
                </option>
              );
            })}
        </select>
        <Input
          label='Name'
          type='text'
          placeholder='Wedding Name'
          onChange={(event: any) => handleChange(event, setName)}
        />
        <Input
          label='Email'
          type='email'
          placeholder='Email'
          onChange={(event: any) => handleChange(event, setEmail)}
        />
        <Input
          label='Budget'
          type='number'
          placeholder='Budget'
          onChange={(event: any) => handleChange(event, setBudget)}
        />
        <Input
          label='Date'
          type='date'
          placeholder='Date'
          onChange={(event: any) => handleChange(event, setDate)}
        />
        <Input
          label='venue'
          type='text'
          placeholder='Venue'
          onChange={(event: any) => handleChange(event, setVenue)}
        />
        <Input
          label='Guests'
          type='number'
          placeholder='Guests'
          onChange={(event: any) => handleChange(event, setGuests)}
        />
        <Input
          label='Food and Beverage'
          type='text'
          placeholder='Food and Beverage'
          onChange={(event: any) => handleChange(event, setFoodAndBeverage)}
        />
        <Input
          label='Decoration'
          type='text'
          placeholder='Decoration'
          onChange={(event: any) => handleChange(event, setDecoration)}
        />
        <Input
          label='Production'
          type='text'
          placeholder='Production'
          onChange={(event: any) => handleChange(event, setProduction)}
        />
        <Input
          label='Videographer'
          type='text'
          placeholder='Videographer'
          onChange={(event: any) => handleChange(event, setVideographer)}
        />
        <Input
          label='Photographer'
          type='text'
          placeholder='Photographer'
          onChange={(event: any) => handleChange(event, setPhotographer)}
        />
        {/* <Input
          label='Vendor Progress'
          type='text'
          placeholder='Vendor Progress'
          onChange={(event: any) => handleChange(event, setVendorProgress)}
        /> */}
        <div className='text-sm w-full flex justify-end'>
          <button
            onClick={handleSave}
            className='bg-success/80 text-neutral rounded px-2 py-1 mt-10'
          >
            Add Wedding
          </button>
        </div>
      </div>
      <div className='flex-1'>
        <h1>I am an information section</h1>
      </div>
    </div>
  );
}

function Input({ label, type, placeholder, value, onChange }: any) {
  return (
    <>
      <p className='text-xs'>{label}:</p>
      <input
        type={type}
        className='w-full px-2 py-1 focus:outline-none focus:border-b focus:border-blue-600 text-sm'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default AddWedding;
