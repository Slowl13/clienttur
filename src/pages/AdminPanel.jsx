import { useEffect } from "react";
import LogIn from "../components/LogIn";
import PanelHeader from "../components/PanelHeader";
import { userInfo, dataStorage } from "../store"
import PanelMain from "../components/PanelMain";

export default function AdminPanel(){
    const { isLoggin, token } = userInfo()
    const { setArray } = dataStorage()

    useEffect(() => {
        async function getAdminData() {
            const res = await fetch("http://localhost:3000/api/admin/users/get", 
                {
                    method: "POST",
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({adminToken: token})
                })
            const data = await res.json()
            setArray("usersArray", data)
        }

        async function getTursData() {
            const res = await fetch("http://localhost:3000/api/admin/turs/get")
            const data = await res.json()
            setArray("tursArray", data)
        }

        async function getNewsData() {
            const res = await fetch("http://localhost:3000/api/admin/news/get")
            const data = await res.json()
            setArray("newsArray", data)
        }

        isLoggin && getAdminData()
        isLoggin && getTursData()
        isLoggin && getNewsData()
    }, [isLoggin])

    return(
        isLoggin ? 
        <div>
            <PanelHeader type={"admin"}/>
            <PanelMain/>
        </div> : 
        <LogIn type="admin"></LogIn> 
    )
}