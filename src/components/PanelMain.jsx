import { useEffect, useState } from "react";
import { dataStorage, navStorage, userInfo } from "../store"
import "../styles/Form.css"
import "../styles/PanelMain.css"

export default function PanelMain() {
    const { usersArray, newsArray, tursArray, setArray } = dataStorage();
    const { navState } = navStorage();
    const { token, userId } = userInfo()


    const [isHidden, setIsHidden] = useState(false);
    const [add, setAdd] = useState(false);
    const [posted, setPosted] = useState(false);
    const [edit, setEdit] = useState(false);

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

        getAdminData()
        getTursData()
        getNewsData()
    }, [posted])

    const [turFormData, setTurFormData] = useState({
        hotel_name: '',
        desc: '',
        max_ppl: '',
        star_rating: '',
        country: '',
        city: '',
        price: '',
        departure_date: '',
        nights: '',
        admin_token: '',
        tourId: ''
    });

    const [newsFormData, setNewsFormData] = useState({
        title: '',
        desc: '',
        admin_token: '',
        newsId: ''
    });

    const [userFormData, setUserFormData] = useState({
        name: '',
        role: 'agent', 
        login: '',
        password: ''
    });

    const [newsImg, setNewsImg] = useState(null);

    const [img, setImg] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTurFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleNewsChange = (e) => {
        const { name, value } = e.target;
        setNewsFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUserFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleFileChange = (e) => {
        setImg(e.target.files[0]);
    };

    const handleNewsFileChange = (e) => {
        setNewsImg(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('img', img);
        data.append('hotel_name', turFormData.hotel_name);
        data.append('desc', turFormData.desc);
        data.append('max_ppl', turFormData.max_ppl);
        data.append('star_rating', turFormData.star_rating);
        data.append('country', turFormData.country);
        data.append('city', turFormData.city);
        data.append('price', turFormData.price);
        data.append('departure_date', turFormData.departure_date);
        data.append('nights', turFormData.nights);
        data.append("adminToken", token)

        try {
    
        const response = await fetch('http://localhost:3000/api/admin/turs/add', {
            method: 'POST',
            body: data, 
        });

        setPosted(!posted)

        console.log('Успешно отправлено:', response.data);
            alert('Тур успешно добавлен!');
        } catch (error) {
        console.error('Ошибка при отправке:', error);
            alert('Ошибка при добавлении тура.');
        }
    };

    const handleSubmitNews = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("title", newsFormData.title);
        formData.append("desc", newsFormData.desc);
        formData.append("adminToken", token);
        formData.append('userId', userId);
        formData.append("img", newsImg);

        try {
            const response = await fetch("http://localhost:3000/api/admin/news/add", {
                method: "POST",
                body: formData
            });

            setPosted(!posted);
            alert("Новость успешно добавлена!");
        } catch (error) {
            console.error("Ошибка при добавлении новости:", error);
            alert("Ошибка при добавлении.");
        }
    };

    const handleSubmitUser = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/admin/users/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: userFormData.name,
                role: userFormData.role,
                login: userFormData.login,
                password: userFormData.password,
                adminToken: token
            })
            });

            const data = await response.json();

            if(response.ok){
            alert(data.message || "Пользователь успешно добавлен!");
            setPosted(!posted);
            setUserFormData({ name: '', role: 'agent', login: '', password: '' });
            } else {
            alert(data.error || "Ошибка при добавлении пользователя");
            }
        } catch (error) {
            console.error("Ошибка при добавлении пользователя:", error);
            alert("Ошибка при добавлении пользователя.");
        }
    };

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('img', img);
        data.append('hotel_name', turFormData.hotel_name);
        data.append('desc', turFormData.desc);
        data.append('max_ppl', turFormData.max_ppl);
        data.append('star_rating', turFormData.star_rating);
        data.append('country', turFormData.country);
        data.append('city', turFormData.city);
        data.append('price', turFormData.price);
        data.append('departure_date', turFormData.departure_date);
        data.append('nights', turFormData.nights);
        data.append("adminToken", token)
        data.append("tourId", turFormData.tourId)

        try {
    
        const response = await fetch('http://localhost:3000/api/admin/turs/edit', {
            method: 'POST',
            body: data, 
        });

        setPosted(!posted)
        setEdit(!edit)
        setTurFormData({
            hotel_name: '',
            desc: '',
            max_ppl: '',
            star_rating: '',
            country: '',
            city: '',
            price: '',
            departure_date: '',
            nights: '',
            admin_token: '',
            tourId: ''
        })

        console.log('Успешно отправлено:', response.data);
            alert('Тур успешно добавлен!');
        } catch (error) {
        console.error('Ошибка при отправке:', error);
            alert('Ошибка при добавлении тура.');
        }
    }

    const handleSubmitEditNews = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", newsFormData.title);
        formData.append("desc", newsFormData.desc);
        formData.append("adminToken", token);
        formData.append("newsId", newsFormData.newsId);
        formData.append('userId', userId);
        if (newsImg) {
            formData.append("img", newsImg);
        }

        try {
            const response = await fetch("http://localhost:3000/api/admin/news/edit", {
                method: "POST",
                body: formData
            });

            setPosted(!posted);
            setEdit(false);
            setNewsFormData({
                title: '',
                desc: '',
                admin_token: '',
                newsId: ''
            });
            alert("Новость успешно обновлена!");
        } catch (error) {
            console.error("Ошибка при редактировании новости:", error);
            alert("Ошибка при редактировании.");
        }
    };

    const handleSubmitEditUser = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/admin/users/edit', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: userFormData.name,
                role: userFormData.role,
                login: userFormData.login,
                password: userFormData.password,
                userId: userFormData.userId,
                adminToken: token
            })
            });

            const data = await response.json();

            if(response.ok){
            alert(data.message || "Пользователь успешно добавлен!");
            setPosted(!posted);
            setUserFormData({ name: '', role: 'agent', login: '', password: '' });
            } else {
            alert(data.error || "Ошибка при добавлении пользователя");
            }
        } catch (error) {
            console.error("Ошибка при добавлении пользователя:", error);
            alert("Ошибка при добавлении пользователя.");
        }
    };

    const handleEdit = (obj) => {
        setTurFormData({
            hotel_name: obj.hotel_name,
            desc: obj.description,
            max_ppl: obj.max_ppl,
            star_rating: obj.star_rating,
            country: obj.country,
            city: obj.city,
            price: obj.price,
            departure_date: new Date(obj.departure_date).toISOString().split('T')[0],
            nights: obj.nights,
            admin_token: token,
            tourId: obj.idTour
        })
        setEdit(true)
    }

    const handleDelete = async (id) => {
        const res = await fetch('http://localhost:3000/api/admin/turs/delete', {
            method: "DELETE", 
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({tourId: id, adminToken: token})
        })

        setPosted(!posted)
    }

    const handleEditNews = (news) => {
        setNewsFormData({
            title: news.title,
            desc: news.description,
            admin_token: token,
            newsId: news.idNews
        });
        setEdit(true);
    };

    const handleEditUser = (user) => {
        setUserFormData({
            userId: user.idUser,
            name: user.name,
            role: user.role,
            login: user.login,
            password: '' 
        });
        setEdit(true); 
    };

    const handleDeleteNews = async (idNews) => {
        const res = await fetch("http://localhost:3000/api/admin/news/delete", {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newsId: idNews, adminToken: token })
        });

        setPosted(!posted);
    };

    const handleDeleteUser = async (idUser) => {
        const res = await fetch("http://localhost:3000/api/admin/users/delete", {
            method: "DELETE",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ userId: idUser, adminToken: token })
        }) 

        setPosted(!posted);
    }

    const cancleEdit = () => {
        setEdit(!edit)
        setTurFormData({
            hotel_name: '',
            desc: '',
            max_ppl: '',
            star_rating: '',
            country: '',
            city: '',
            price: '',
            departure_date: '',
            nights: '',
            admin_token: '',
            tourId: ''
        })
        setNewsFormData({
                title: '',
                desc: '',
                admin_token: '',
                newsId: ''
        })
        setUserFormData({
            userId: '',
            name: '',
            role: '',
            login: '',
            password: '' 
        });
    }

    return (
        <div>
            <div className="control-buttons">
                <button onClick={()=>setAdd(!add)}>{add ? "Скрыть форму": "Показать форму"}</button>
                <button onClick={()=>setIsHidden(!isHidden)}>{isHidden ? "Скрыть данные": "Показать данные"}</button>
            </div>

            {
                add && (navState === "main") && 
                    <form onSubmit={edit ? handleSubmitEdit : handleSubmit} className="hotel-form" style={{display:"flex", flexDirection: "column", alignItems:"center", gap:"15px"}}>
                        <input type="text" value={turFormData.hotel_name} onChange={handleChange} name="hotel_name" placeholder="Название отеля" required />
                        <textarea name="desc" placeholder="Описание" value={turFormData.desc} onChange={handleChange} required></textarea>
                        <input type="number" name="max_ppl" placeholder="Количество человек" value={turFormData.max_ppl} onChange={handleChange} min="1" required />
                        <select value={turFormData.star_rating} onChange={handleChange} name="star_rating" required>
                            <option value="" disabled selected>Звездность</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <input type="text" name="country" placeholder="Страна" value={turFormData.country} onChange={handleChange} required />
                        <input type="text" name="city" placeholder="Город" value={turFormData.city} onChange={handleChange} required />
                        <input type="number" name="price" placeholder="Цена тура" min="0" step="0.01" value={turFormData.price} onChange={handleChange} required />
                        <input type="date" name="departure_date" value={turFormData.departure_date} onChange={handleChange} />
                        <input type="number" name="nights" placeholder="Количество ночей" min="1" value={turFormData.nights} onChange={handleChange} required />
                        <input type="file" name="img" onChange={handleFileChange} accept="image/*" />
                        <div>
                            {edit && <button style={{display:"inline", marginRight:"20px"}} onClick={cancleEdit}>Отменить</button>}
                            <button>{edit ? "Сохранить" : "Отправить"}</button>
                        </div>
                    </form>
            }

            {
                add && (navState === "news") &&
                <form 
                    onSubmit={edit ? handleSubmitEditNews : handleSubmitNews} 
                    className="hotel-form" 
                    style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "15px"}}
                >
                    <input 
                        type="text" 
                        name="title" 
                        placeholder="Заголовок" 
                        value={newsFormData.title} 
                        onChange={handleNewsChange} 
                        required 
                    />
                    <textarea 
                        name="desc" 
                        placeholder="Описание" 
                        value={newsFormData.desc} 
                        onChange={handleNewsChange} 
                        required
                    ></textarea>
                    <input 
                        type="file" 
                        name="img" 
                        onChange={handleNewsFileChange} 
                        accept="image/*" 
                    />
                    <div>
                            {edit && <button style={{display:"inline", marginRight:"20px"}} onClick={cancleEdit}>Отменить</button>}
                            <button>{edit ? "Сохранить" : "Отправить"}</button>
                    </div>
                </form>
            }

            {add && navState === "users" && (
                <form onSubmit={edit ? handleSubmitEditUser : handleSubmitUser} className="hotel-form" style={{display:"flex", flexDirection: "column", alignItems:"center", gap:"15px"}}>
                    <input
                    type="text"
                    name="name"
                    placeholder="Имя пользователя"
                    value={userFormData.name}
                    onChange={handleUserChange}
                    required
                    />
                    <select
                    name="role"
                    value={userFormData.role}
                    onChange={handleUserChange}
                    required
                    >
                    <option value="agent">agent</option>
                    <option value="admin">admin</option>
                    </select>
                    <input
                    type="text"
                    name="login"
                    placeholder="Логин"
                    value={userFormData.login}
                    onChange={handleUserChange}
                    required
                    />
                    <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={userFormData.password}
                    onChange={handleUserChange}
                    required
                    />
                    <div>
                        {edit && <button style={{display:"inline", marginRight:"20px"}} onClick={cancleEdit}>Отменить</button>}
                        <button>{edit ? "Сохранить" : "Отправить"}</button>
                    </div>
                </form>
            )}

            {isHidden && <table style={{fontSize:"20px", textAlign:"center", width:"80%", margin:"0 auto", borderCollapse:"separate", paddingTop:"20px"}}>
                {navState === "main" && <thead>
                    <tr>
                        <th>id</th>
                        <th>Отель</th>
                        <th>Кол-во человек</th>
                        <th>Звездность</th>
                        <th>Страна</th>
                        <th>Город</th>
                        <th>Цена</th>
                        <th>Отбытие</th>
                        <th>Ночи</th>
                        <th>Изображение</th>
                        <th>Действия</th>
                    </tr>
                </thead>}
                <tbody>
                    {navState === "main" && tursArray.map((elem, index) => 
                        <tr key={index}>
                            <td>{elem.idTour}</td>
                            <td>{elem.hotel_name}</td>
                            <td>{elem.max_ppl}</td>
                            <td>{elem.star_rating}</td>
                            <td>{elem.country}</td>
                            <td>{elem.city}</td>
                            <td>{elem.price}</td>
                            <td>
                                {
                                    (() => {
                                        const date = new Date(elem.departure_date);
                                        return date.toLocaleString('ru-RU', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        });
                                    })()
                                }
                            </td>
                            <td>{elem.nights}</td>
                            <td>
                                <img 
                                    src={`http://localhost:3000${elem.img_path}`} 
                                    alt="тур" 
                                    style={{ maxWidth: "120px", borderRadius: "8px" }} 
                                />
                            </td>
                            <td>
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    <span className="td_button" onClick={() => handleEdit(elem)}>Редактировать</span>
                                    <span className="td_button" onClick={() => handleDelete(elem.idTour)}>Удалить</span>
                                </div>
                            </td>
                        </tr>
                    )}

                </tbody>
                {navState === "news" && (
                    <>
                        <thead>
                            <tr>
                                <th>Заголовок и описание</th>
                                <th>Изображение</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newsArray.map((elem, index) => (
                                <tr key={index}>
                                    <td>
                                        <strong>{elem.title}</strong>
                                        <p>{elem.description}</p>
                                    </td>
                                    <td>
                                        <img
                                            src={`http://localhost:3000${elem.image_path}`}
                                            alt="Новость"
                                            style={{ maxWidth: "150px", borderRadius: "10px" }}
                                        />
                                    </td>
                                    <td>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                            <span className="td_button" onClick={() => handleEditNews(elem)}>Редактировать</span>
                                            <span className="td_button" onClick={() => handleDeleteNews(elem.idNews)}>Удалить</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                )}

                {isHidden && navState === "users" && (
                <>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>Имя</th>
                        <th>Роль</th>
                        <th>Логин</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {usersArray.map((user, index) => (
                        <tr key={index}>
                        <td>{user.idUser}</td>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td>{user.login}</td>
                        <td>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <button className="td_button" onClick={() => handleEditUser(user)}>Редактировать</button>
                                <button className="td_button" onClick={() => handleDeleteUser(user.idUser)}>Удалить</button>
                            </div>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </>
                )}
                
            </table>}

               
            
        </div>
    )
}