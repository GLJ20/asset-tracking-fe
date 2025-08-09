import { Link, useNavigate } from "react-router-dom"
import { signout } from "../services/auth"
import i18n from "../../i18n"
import { t } from "i18next"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import '../styling/components/NavBar.css'

const NavBar = () => {
    const navigate = useNavigate()
    const {t, i18n} = useTranslation()
    const token = localStorage.getItem('token')
    const [isOpen, setIsOpen] = useState(false)

    const handleLogout = () => {
        signout()
        navigate('/')
    }

    const handleLangSwitch = (e) => {
        i18n.changeLanguage(e.target.value)
    }

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    return(
        <>
        <nav >
            <div className="nav">
                <div className="nav-right">
                    <select onChange={handleLangSwitch} value={i18n.language}>
                        <option value='en'>English</option>
                        <option value='ar'>العربية</option>
                    </select>

                    {token ? (
                        <div className="dropdown">
                            <button id="drop" className="dropbtn" onClick={handleToggle}><img src="/blankprofpic.webp" alt="blankprofile"/></button>

                            {isOpen && (
                                <div id="myDropdown" className="dropdown-content">
                                    <Link to='/profile'>{t('nav.profile_link')}</Link>
                                    <hr className="solid"/>
                                    <Link to='' onClick={handleLogout}>{t('nav.logout_button')}</Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/signin">{t('nav.signin_link')}</Link>
                            <Link to="/signup">{t('nav.signup_link')}</Link> 
                        </>
                    )}
                </div>                

                <div className="nav-center">
                    {token && (
                        <Link to='/dashboard'><h1>{t('nav.dashboard_link')}</h1></Link>
                    )}
                </div>
                
                <div className="nav-left">
                    <Link to={token ? '/dashboard' : '/'}><img src="/b1.png" className="logo" alt="logo"/></Link>
                </div>
            </div>
        </nav>
        </>
    )
}

export default NavBar