import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

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
        <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
            <div>
                <h1>{t('landing_page.title')}</h1>
                <p>{t('landing_page.description')}</p>
                <Link to="/signin">{t('landing_page.signin_button')}</Link>
                <Link to="/signup">{t('landing_page.signup_button')}</Link>
            </div>
        </div>
        </>
    )
}
export default LandingPg