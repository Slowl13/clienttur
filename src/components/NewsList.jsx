import { useState } from "react";
import { dataStorage, navStorage, tempIdStorage } from "../store";
import "../styles/NewsList.css";

export default function NewsList() {
  const { newsArray } = dataStorage();
  const { setNavState } = navStorage();
  const { setTempId } = tempIdStorage();

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(newsArray.length / itemsPerPage);
  const pagedNews = newsArray.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));

  return (
    <div className="news-list">
      {pagedNews.map((elem) => (
        <div className="news-row" key={elem.idNews} onClick={() => {setNavState("newsblock"); setTempId(elem.idNews)}}>
          <img
            className="news-thumbnail"
            src={`http://localhost:3000${elem.image_path}`}
            alt={elem.title}
          />
          <div className="news-body">
            <div className="news-header">
              <div className="news-title">{elem.title}</div>
              <div className="news-date">
                {new Date(elem.published_at).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
            <div className="news-description">
              {elem.description.slice(0, 120)}...
              <span className="read-more"> нажмите, чтобы прочитать</span>
            </div>
          </div>
        </div>
      ))}

      <div className="pagination">
        <button onClick={handlePrev} disabled={page === 1}>
          Назад
        </button>
        <span>{page} / {totalPages}</span>
        <button onClick={handleNext} disabled={page === totalPages}>
          Далее
        </button>
      </div>
    </div>
  );
} 
