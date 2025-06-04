import "../styles/ClientFooter.css"

export default function ClientFooter(){
    return (
        <footer className="footer">
            <div className="social-icons">
                <img src="/vk.svg" alt="Соцсеть 1" />
                <img src="/tg.svg"  alt="Соцсеть 2" />
            </div>
            <div className="legal-links">
                <a href="#">Политика конфиденциальности</a>
                <a href="#">Пользовательское соглашение</a>
                <a href="#">Контактные данные</a>
            </div>
        </footer>
    )
}