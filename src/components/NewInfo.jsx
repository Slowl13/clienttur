import { dataStorage, navStorage, tempIdStorage } from "../store";
import TourCard from './Card'
import "../styles/NewInfo.css"

export default function NewInfo({ type }){
    const { tursArray, newsArray } = dataStorage();
    const { setNavState } = navStorage();
    const { setTempId } = tempIdStorage();



    return(
        <>
        <h2 style={{textAlign: "center", marginTop:"24px"}}>{type === "tours" ? "Новые предложения" : "Последние новости"}</h2>
        <div className="new-info-container">
            {type === "tours" && tursArray.map((elem, key) => 
                { if (key < 3) return <TourCard type={type} hotelName={elem.hotel_name} price={elem.price} imageSrc={elem.img_path} cityName={elem.city} event={() => {setNavState("tourblock"); setTempId(elem.idTour)}}></TourCard>})
            }
            {type === "news" && newsArray.map((elem,key) => 
                { if (key < 3) return <TourCard type={type} imageSrc={elem.image_path} title={elem.title} date={elem.published_at} event={() => {setNavState("newsblock"); setTempId(elem.idNews)}}></TourCard>})
            }
        </div>
        <button className="btn" style={{margin:"0 auto"}} onClick={type === "tours" ? ()=>{setNavState("catalog"); window.scrollTo(0, 0);} : ()=>{setNavState("news"); window.scrollTo(0, 0);}}>{type === "tours" ? "Все туры" : "Все новости"}</button>
        </>
    )
}
   
