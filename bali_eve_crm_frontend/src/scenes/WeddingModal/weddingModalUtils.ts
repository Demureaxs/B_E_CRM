import { WeddingContext } from '../../context/WeddingsContext';
import { useContext } from 'preact/hooks';
import API_URL from '../../env';

export async function saveWedding(wedding: any) {
  if (!wedding) return;

  const url = `${API_URL}/api/v1/weddings/${wedding._id}`;

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
