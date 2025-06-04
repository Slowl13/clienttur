import { dataStorage } from "../store";
import "../styles/NewsBlock.css"

export default function NewsBlock({ id }) {
  const { newsArray } = dataStorage();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  let obj = {}

  for(let elem of newsArray){
    if (elem.idNews === id){obj = elem} 
  }

  return (
    <div className="news-block">
      <img src={`http://localhost:3000${obj.image_path}`} className="news-image" />
      <div className="news-content">
        <div className="news-title-block">{obj.title}</div>
        <div className="news-description">{obj.description}</div>
        <div className="news-date">{formatDate(obj.published_at)}</div>
      </div>
    </div>
  );
}