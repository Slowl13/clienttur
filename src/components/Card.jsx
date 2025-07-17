import "../styles/Card.css"

export default function TourCard({ imageSrc, title, date, hotelName, price, cityName, type, event }){
  return (
    <div className="card">
      <img src={`http://localhost:3000${imageSrc}`} className="card-image" onClick={event} />
      {
        type === "tours" &&
        <div className="card-content" onClick={event}>
          <div className="city-name">{cityName}</div>
          <div className="card-sub-info">
            <div className="hotel-name">{hotelName}</div>
            <div className="price">{price + " руб."}</div>
          </div>
        </div>
      }
      {
        type === "news" && (
          <div className="card-content" onClick={event}>
            <div className="news-title-card">{title}</div>
            <div className="news-date-card">{new Date(date).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}</div>
          </div>
        )
      }
    </div>
  );
};

