import { useState } from "react"
import { Login } from "../services/auth"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import '../styling/pages/SignIn.css'

const SignIn = () => {
    let navigate = useNavigate()

    const {t, i18n} = useTranslation()

    const initialState = { username: '', password: '' }

    const [formVals, setFormVals] = useState(initialState)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setFormVals({...formVals, [e.target.id]: e.target.value})

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await Login(formVals)
            navigate('/dashboard')
        } catch (err) {
            let error = ''
            if(err.response && err.response.data && err.response.data.msg){
                error = `Login Failed ${err.response.data.msg}`
            }else {
                error = `Login Failed ${err}`
            }
            setError(t('login_page.error_message'))
        }

    }
    return(
        <div dir={i18n.language === 'ar' ? 'rtl': 'ltr'} className="signin">   
        <form onSubmit={handleSubmit}>
            <h1>{t('login_page.title')}</h1>
            <p>{t('login_page.subtitle')}</p> 
            <div className="input-wrapper">
                <label htmlFor='username'>{t('login_page.username_label')}:</label>
                <input
                    id='username'
                    type="text"
                    name="username"
                    value={formVals.username}
                    onChange={handleChange}
                    placeholder={t('login_page.username_placeholder')}
                    required
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor='password'>{t('login_page.password_label')}:</label>
                <input
                    id='password'
                    type="password"
                    name="password"
                    value={formVals.password}
                    onChange={handleChange}
                    placeholder={t('login_page.password_placeholder')}
                />
            </div>
            <button type="submit">{t('login_page.login_button')}</button>
            {error && <p>{error}</p>}
            <p>
                {t('login_page.register_prompt')}<Link to="/signup">{t('login_page.register_link')}</Link>
            </p>
        </form>
        </div>

    )
}
export default SignIn