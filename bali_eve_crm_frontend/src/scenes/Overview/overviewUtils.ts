import { IWedding } from '../../context/WeddingsContext';

export function SortNearestThreeByDate(wedding: IWedding[]) {
  const newWedding = [...wedding];
  return newWedding
    .sort((a: IWedding, b: IWedding) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    })
    .filter((wedding: IWedding, index: any) => {
      return index < 3;
    });
}
