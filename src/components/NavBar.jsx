import { Link, useNavigate } from "react-router-dom"
import { signout } from "../services/auth"
import i18n from "../../i18n"
import { t } from "i18next"

const NavBar = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const handleLogout = () => {
        signout()
        navigate('/')
    }

    const handleLangSwitch = (e) => {
        i18n.changeLanguage(e.target.value)
    }

    return(
        <>
        <nav dir={i18n.language === 'ar' ? 'rtl': 'ltr'}>
            <div className="nav">
                {token ? (
                    <>
                        <Link to='/profile'><img src="../public/blankprofpic.webp"/></Link>
                        <Link to='/dashboard'>{t('nav.dashboard_link')}</Link>
                        <button onClick={handleLogout}>{t('navbar.logout_button')}</button>
                    </>
                ) : (
                    <>
                        <Link to="/signin">{t('nav.signin_link')}</Link>
                        <Link to="/signup">{t('nav.signup_link')}</Link>                        
                    </>

                )}
            </div>

            <div>
                <select onChange={handleLangSwitch} value={i18n.language}>
                    <option value='en'>English</option>
                    <option value='ar'>العربية</option>
                </select>
            </div>
        </nav>
        </>
    )
}

export default NavBar