import { navStorage, userInfo } from "../store"
import "../styles/PanelHeader.css"


export default function PanelHeader({ type }){
    const { setIsLoggin } = userInfo();
    const { setNavState } = navStorage();

    return (
        <header style={{display:"flex", padding:"20px", gap:"30px", flexDirection:"column", alignItems:"flex-end"}}>
            <button onClick={setIsLoggin}>Выйти</button>
            <nav style={{
                width: "80%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                border: "1px solid black",
                padding: "10px 40px",
                margin: "0 auto"
            }}>
                <div style={{ flex: 1, textAlign: "center" }}>
                    <a onClick={() => setNavState("main")}>Туры</a>
                </div>
                <div style={{ flex: 1, textAlign: "center" }}>
                    <a onClick={() => setNavState("news")}>Новости</a>
                </div>
                <div style={{ flex: 1, textAlign: "center" }}>
                    <a onClick={() => setNavState("users")}>Пользователи</a>  
                </div>
                <div style={{ flex: 1, textAlign: "center" }}>
                    <a onClick={() => setNavState("clients")}>Заявки</a>
                </div>
            </nav>
        </header>
    )
}