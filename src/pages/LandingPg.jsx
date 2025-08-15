import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import '../styling/pages/Landing.css'
const LandingPg = () => {
    const navigate = useNavigate()
    const {t, i18n} = useTranslation()

    useEffect(() => {
        const token = localStorage.getItem('token')
        
        if(token){
            navigate('/dashboard')
        }
    }, [navigate])
    return(
        <>
        <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="landing">
            <div className="landing-content">
                <h1>{t('landing_page.title')}</h1>
                <p>{t('landing_page.description')}</p>
                <Link to="/signin"><button>{t('landing_page.signin_button')}</button></Link>
                <Link to="/signup"><button>{t('landing_page.signup_button')}</button></Link>
            </div>
        </div>
        </>
    )
}
export default LandingPg