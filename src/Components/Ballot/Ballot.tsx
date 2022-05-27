import {ReactComponent as Check} from "../../assets/check.svg"
import { ReactComponent as Close } from "../../assets/close.svg"
import { useState, useEffect } from "react";
import api from "../../Api/Api";
import Card from "../Card";


export type SelectedNomineesType = 
{
  category:string,
data:{
  id:string,
  title:string,
  photoUrL:string
}
}[]

export type Nominee = {
  category: string,
  data: {
    id: string,
    title: string,
    photoUrL: string
  }
}
const Ballot = () => {
  const [showModal, setShowModal]= useState(false)
  
  // query state
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  // selection state
  const [selectedNominees, setSelectedNominees] = useState<SelectedNomineesType | [] >([]);


  const selectNewNominee = (newItem: Nominee) => {
    const filteredSelection = selectedNominees.filter((oldItem: Nominee) => {
      return oldItem.category !== newItem.category;
    });
    setSelectedNominees([...filteredSelection, newItem])

  };
  useEffect(() => {
    api
      .getBallotData()
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((e: Error) => {
        if (e) {
          setIsLoading(false);
          setIsError(true);
          setError(e.message);
        }
      });
  }, []);
  // loading placeholder
  if (isLoading) {
    return (
      <div className="container">
        <h2>Loading...</h2>
      </div>
    );
  }
  // error placeholder
  if (isError) {
    return (
      <div className="container">
        <h2>Sorry something went wrong</h2>
        <h2>{error}</h2>
      </div>
    );
  }
  const handleSubmission = () =>{
    if(selectedNominees.length < 7){
      setError("Pls select one nominee from each category")
      setShowModal(!showModal)  
  
    }
    else{
      setError("")
      setShowModal(!showModal)    
    }

  }
  return (
    <div className="ballot">
      {data?.items.map((category: any) => (
        <section key={category.id} className="category">
          <h4 className="category-title">{category.title}</h4>
          <div className="category-items">
            {category.items.map((nominees: any) => (
              <Card
                key={nominees.id}
            
                selected={selectedNominees}
                selectNewNominee={selectNewNominee}
                category={category.title}
                data={nominees}
              />
            ))}
          </div>
        </section>
      ))}
      <button onClick={handleSubmission} className="submit-btn">Submit</button>
     { 
     showModal 
     ? ( <div onClick={()=>setShowModal(!showModal)} className="modal">
       <div className="modal-content">
              {
                error === ""
           
                  ? (<div onClick={() => setShowModal(!showModal)} className="close">
           <Close />
         </div>)
         : ""
              }
        { 
          error === ""
      ?  (<div className="check">
           <Check />
         </div>) 
         : ""
        }
         <h4 style={
           error !== "" ? {color:"red"} : {color:"#252525"}
         }>
           {
                  error === "" ? "Your vote has been submitted" : error
           }
       
         </h4>
       </div>
     </div>)
    : ""
    }
    </div>
  );
};

export default Ballot;
