import { formatDate } from "../../../common/utilities/utilityFunctions";
import { IWedding } from "../../../context/WeddingsContext";

function WeddingCardMini({ wedding: WeddingData }: { wedding: IWedding }) {
  return (
    <div
      id={WeddingData._id}
      className='col-span-2 bg-base-100 p-6 rounded space-y-2'
    >
      <p>
        <span className='font-bold'>Wedding of: </span>
        {WeddingData.name}
      </p>
      <p>
        <span className='font-bold'>Date: </span>
        {formatDate(WeddingData.date)}
      </p>
      <p>
        <span className='font-bold'>Email: </span>
        {WeddingData.email}
      </p>
      <p>
        <span className='font-bold'>Guests: </span>
        {WeddingData.guests}
      </p>
      <p>
        <span className='font-bold'>Venue: </span>
        {WeddingData.venue}
      </p>
      <p>
        <span className='font-bold'>Photographer: </span>
        {WeddingData.photographer}
      </p>
      <p>
        <span className='font-bold'>Videographer: </span>
        {WeddingData.videographer}
      </p>
      <p>
        <span className='font-bold'>F & B: </span>
        {WeddingData.foodAndBeverage}
      </p>
      <p>
        <span className='font-bold'>Vendor Progress: </span>
        {WeddingData.vendorProgress}
      </p>
    </div>
  );
}
export default WeddingCardMini;
