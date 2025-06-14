import { useState, useEffect } from "react";
import { dataStorage, navStorage, tempIdStorage } from "../store";
import "../styles/TourList.css";

export default function TourList({ country, city, date, nights, ppl }) {
  const { tursArray } = dataStorage();
  const { setNavState } = navStorage();
  const { setTempId } = tempIdStorage();

  const [filters, setFilters] = useState({
    country: country || "",
    city: city || "",
    date: date || "",
    nights: nights || "",
    ppl: ppl || "",
    stars: "",
    price: "",
  });
  const [page, setPage] = useState(1);
  const [filteredTurs, setFilteredTurs] = useState(tursArray);
  const itemsPerPage = 5;

  const applyFilters = () => {
    const filtered = tursArray.filter((tour) => {
      return (
        (!filters.country || tour.country.toLowerCase().includes(filters.country.toLowerCase())) &&
        (!filters.city || tour.city.toLowerCase().includes(filters.city.toLowerCase())) &&
        (!filters.date || tour.departure_date === filters.date) &&
        (!filters.nights || tour.nights === Number(filters.nights)) &&
        (!filters.ppl || tour.max_ppl === Number(filters.ppl)) &&
        (!filters.stars || tour.star_rating === Number(filters.stars)) &&
        (!filters.price || tour.price <= Number(filters.price))
      );
    });
    setFilteredTurs(filtered);
    setPage(1);
  };

  useEffect(() => {
    applyFilters();
  }, [tursArray]);

  const handleSearch = () => {
    applyFilters();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const totalPages = Math.ceil(filteredTurs.length / itemsPerPage);
  const pagedTurs = filteredTurs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));
  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="tour-layout">
      <div className="tour-filters">
        <input
          name="country"
          placeholder="Страна"
          value={filters.country}
          onChange={handleChange}
        />
        <input
          name="city"
          placeholder="Город"
          value={filters.city}
          onChange={handleChange}
        />
        <input
          name="stars"
          placeholder="Звездность"
          value={filters.stars}
          onChange={handleChange}
        />
        <input
          name="ppl"
          placeholder="Кол-во человек"
          value={filters.ppl}
          onChange={handleChange}
        />
        <input
          name="nights"
          placeholder="Кол-во ночей"
          value={filters.nights}
          onChange={handleChange}
        />
        <input
          name="date"
          placeholder="Дата вылета"
          type="date"
          value={filters.date}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Бюджет"
          value={filters.price}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Поиск</button>
      </div>

      <div className="tour-list">
        {pagedTurs.length === 0 && <div className="tour-card" style={{width:"100%", textAlign:"center"}}>Туры не найдены!</div>}
        {pagedTurs.map((elem) => (
          <div className="tour-card" key={elem.idTour} onClick={() => {setNavState("tourblock"); setTempId(elem.idTour)}} >
            <div className="tour-card-header">
              <div className="tour-hotel-name">{elem.hotel_name}</div>
              <div className="tour-location">{elem.country}, {elem.city}</div>
            </div>
            <div className="tour-card-body">
              <img
                className="tour-thumbnail large"
                src={`http://localhost:3000${elem.img_path}`}
                alt={elem.hotel_name}
              />
              <div className="tour-details">
                <div className="tour-meta">
                  <div><strong>Дата вылета:</strong> {formatDate(elem.departure_date)}</div>
                  <div><strong>Кол-во человек:</strong> {elem.max_ppl}</div>
                  <div><strong>Кол-во ночей:</strong> {elem.nights}</div>
                  <div><strong>Звезды:</strong> {elem.star_rating}</div>
                </div>
                <div className="tour-description">
                  {elem.description.slice(0, 100)}...
                  <span className="read-more"> нажмите, чтобы прочитать</span>
                </div>
              </div>
              <div className="tour-price">{elem.price + " руб."}</div>
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
    </div>
  );
}