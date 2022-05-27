import { useMemo } from "react";
import {SelectedNomineesType, Nominee} from "./Ballot/Ballot"

interface CardProps {
  data: {
    title: string;
    photoUrL: string;
    id: string;
  };
  category: string;
  selectNewNominee: (newItem: Nominee) => void;
selected:SelectedNomineesType
}

const Card = ({
  data,
  category,
  selectNewNominee,
selected
}: CardProps) => {
  const handleVote = () => {
    selectNewNominee({category, data})
  }; 
const getNominee = useMemo(()=>{
  const selection = selected.find(
    (nominee)=>{
      return nominee.data.id === data.id
    } 
  )
  if(selection?.data.id === data.id){
    return true
  }
  else{
 return false
  }
}, [selected, data.id])
  return (
    <>
      <div 
      style={
          getNominee ? { backgroundColor: "#d5e8d4" } : { backgroundColor:"#dae8fc"}
      }
       className="card">
        <div className="card-image">
          <img src={data.photoUrL} alt={data.title} />
          <div
            className="blur"
            style={{ backgroundImage: `url(${data.photoUrL})` }}
          ></div>
        </div>

        <div className="card-title">
          <h3>{data.title}</h3>
        </div>
        <button onClick={handleVote} className="card-button">
          Vote
        </button>
      </div>
    </>
  );
};

export default Card;
