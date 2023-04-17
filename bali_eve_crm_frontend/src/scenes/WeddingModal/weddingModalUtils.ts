import { WeddingContext } from '../../context/WeddingsContext';
import { useContext } from 'preact/hooks';

export async function saveWedding(wedding: any) {
  if (!wedding) return;

  const url = `http://192.168.18.7:8000/api/v1/weddings/${wedding._id}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wedding),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('Wedding updated successfully');
    const data = response.json();
    return data;
  } catch (error) {
    console.error('Error updating wedding:', error);
  }
}
