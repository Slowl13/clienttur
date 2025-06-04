import { dataStorage } from "../store";
import "../styles/TourBlock.css";

export default function TourBlock({ id }) {
  const { tursArray } = dataStorage();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  let tour = {};

  for (let item of tursArray) {
    if (item.idTour === id) {
      tour = item;
    }
  }

  return (
    <div className="tour-block">
      <img
        src={`http://localhost:3000${tour.img_path}`}
        alt={tour.hotel_name}
        className="tour-image"
      />
      <div className="tour-content">
        <div className="tour-header">
          <div className="tour-hotel-name">{tour.hotel_name}</div>
          <div className="tour-stars">{tour.star_rating}★</div>
        </div>
        <div className="tour-location">
          {tour.country}, {tour.city}
        </div>
        <div className="tour-description">{tour.description}</div>
        <div className="tour-details">
          <div>Количество человек: {tour.max_ppl}</div>
          <div>Количество ночей: {tour.nights}</div>
          <div>Дата вылета: {formatDate(tour.departure_date)}</div>
        </div>
        <div className="tour-price">Стоимость: {tour.price} ₽</div>
      </div>
    </div>
  );
}