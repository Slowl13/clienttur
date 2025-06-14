import { useState } from "react"
import "../styles/ContactForm.css"

export default function ContactForm(){
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        email: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit= async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: formData.name,
                number: formData.number,
                email: formData.email,
            })
            });

            const data = await response.json();

            if(response.ok){
                alert(data.message || "Заявка отправлена!");
                setFormData({ name: '', number: '', email: ''});
            } else {
                alert(data.error || "Ошибка, попробуйте ещё раз");
            }
        } catch (error) {
            console.error("Ошибка, попробуйте ещё раз: ", error);
            alert("Ошибка, попробуйте ещё раз");
        }
    };


    return (
        <>
        <h2 className="h2form">Оставьте заявку и мы с вами свяжемся!</h2>
        <form onSubmit={handleSubmit} className="contact-form">
            <div><label>Фио*:</label><input placeholder="Фамилия Имя Отчество" onChange={handleChange} value={formData.name} name="name" required></input></div>
            <div><label>Номер телефона*:</label><input pattern="\+7\d{10}" placeholder="+71234567890" onChange={handleChange} value={formData.number} name="number" required></input></div>
            <div><label>Email:</label><input placeholder="example@email.ru" onChange={handleChange} value={formData.email} name="email"></input></div>
            <button>Отправить</button>
        </form>
        </>
    )
}