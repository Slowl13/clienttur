import ClientHeader from "../components/ClientHeader";
import NewInfo from "../components/NewInfo";
import ClientFooter from "../components/ClientFooter";
import NewsList from "../components/NewsList";
import NewsBlock from "../components/NewsBlock";
import { dataStorage, navStorage, tempIdStorage, filterStorage } from "../store";
import { useEffect, useState } from "react";
import TourList from "../components/TourList";
import TourBlock from "../components/TourBlock";
import ContactForm from "../components/ContactForm";

export default function MainPage(){
    const { setArray } = dataStorage()
    const { navState } = navStorage()
    const { tempId } = tempIdStorage()
    const { filterArr } = filterStorage()

     useEffect(() => {

        async function getTursData() {
            const res = await fetch("http://localhost:3000/api/data/turs/")
            const data = await res.json()
            setArray("tursArray", data)
        }

        async function getNewsData() {
            const res = await fetch("http://localhost:3000/api/data/news/")
            const data = await res.json()
            setArray("newsArray", data)
        }


        getTursData()
        getNewsData()
    }, [])

    return(
        <div className="page-container">
                <ClientHeader></ClientHeader>
                {navState === "main" && 
                <>
                    <NewInfo type={"tours"}></NewInfo>
                    <NewInfo type={"news"}></NewInfo>
                    <ContactForm></ContactForm>
                </>}
                {navState === "news" &&
                    <NewsList></NewsList>
                }
                {navState === "newsblock" &&
                    <NewsBlock id={tempId}></NewsBlock>
                }
                {navState === "catalog" &&
                    <TourList country={filterArr[0]} city={filterArr[1]} date={filterArr[2]} nights={filterArr[3]} ppl={filterArr[4]}></TourList>
                }
                {navState === "tourblock" &&
                    <TourBlock id={tempId}></TourBlock>
                }
                <ClientFooter></ClientFooter> 
        </div>
    )
}