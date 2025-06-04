import "../styles/LogIn.css"
import { userInfo } from "../store"
import { useEffect, useState } from "react";

export default function LogIn( { type } ){

    const {setToken, setName, setIsLoggin, setUserId } = userInfo();

    const [loginValue, setLoginValue] = useState();
    const [passwordValue, setPasswordValue] = useState();

    const loginUpdate = (e) => {
        const currentValue = e.target.value;
        setLoginValue(currentValue)
    }

    const passwordUpdate = (e) => {
        const currentValue = e.target.value;
        setPasswordValue(currentValue)
    }

    async function sendAuthData() {

        const res = await fetch(
            `http://localhost:3000/api/login/${type}`,
            {
                method: "POST",
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({login: loginValue, password: passwordValue})
            }
            
        )

        if(await res.ok) {
            const data = await res.json()

            setName(await data.name)
            setToken(await data.token)
            setIsLoggin()
            setUserId(await data.id)
        }

    }

    return(
        <div className="main">
            <div className="login-div">
                <div className="login-field"><label>Логин:</label><input onChange={(e) => loginUpdate(e)}></input></div>
                <div className="login-field"><label>Пароль:</label><input type="password" onChange={(e) => passwordUpdate(e)}></input></div>
                <button onClick={sendAuthData} className="login-button">Войти</button>
            </div>
        </div>
    )
}