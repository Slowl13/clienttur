import "../styles/ClientHeader.css"
import { navStorage, filterStorage } from "../store";
import { useState } from "react";

export default function ClientHeader(){
    const { navState, setNavState } = navStorage();
    const { setFilterArray } = filterStorage();

    const [filters, setFilters] = useState({
        country: "",
        city: "",
        date: "",
        nights: "",
        ppl: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const useFilter = () => {
        let arr = [];

        for(let key in filters){
            arr.push(filters[key])
        }

        console.log(arr)

        setFilterArray(arr);
    }

    return (
        <header className="header">
        <div className="top">
            <div className="branding">
            <img src="../public/tourism-company-logo.svg" alt="Логотип" className="logo" onClick={() => setNavState("main")} />
            <div className="phone">+79123567890</div>
            </div>
            <div className="nav">
                <button className="btn" onClick={() => setNavState("catalog")} >Каталог</button>
                <button className="btn" onClick={() => setNavState("news")}>Новости</button>
            </div>
        </div>

        {navState === "main" && <form className="search-form">
            <input type="text" name="country" placeholder="Страна" value={filters.country} onChange={handleChange}/>
            <input type="text" name="city" placeholder="Город" value={filters.city} onChange={handleChange}/>
            <input type="date" name="date" placeholder="Дата вылета" value={filters.date} onChange={handleChange}/>
            <input type="number" name="nights" placeholder="Кол-во ночей" value={filters.nights} onChange={handleChange}/>
            <input type="number" name="ppl" placeholder="Кол-во человек" value={filters.ppl} onChange={handleChange} />
            <button type="submit" className="btn" onClick={() => {useFilter(); setNavState("catalog");}}>Найти</button>
        </form>}
        </header>
    );
};

