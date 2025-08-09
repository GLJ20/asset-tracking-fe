import { useState } from "react"
import { Register } from "../services/auth"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import '../styling/pages/SignUp.css'

const SignUp = () => {
    let navigate = useNavigate()
    const {t, i18n} = useTranslation()

    const initialState = {
        name: '',
        username: '',
        password: '',
        confirmpass: '',
        department: '',
        role: 'Employee'
    }
    const [formVals, setFormVals] = useState(initialState)

    const [errors, setErrors] = useState({})

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

    const validateForm = (data) => {
        const errors = {}

        if(!data.username.trim()){
            errors.username = t('validation.username_required')
        } else if (data.username.length < 4){
            errors.username = t('validation.username_length')
        }

        if(!data.password){
            errors.password = t('validation.password_required')
        } else if (!passwordRegex.test(data.password)){
            errors.password = t('validation.password_invalid')
        }

        if(data.password !== data.confirmpass){
            errors.confirmpass = t('validation.passwords_match')
        }

        return errors
    }
    const handleChange = (e) => {
        const updatedFormVals = {...formVals, [e.target.id]: e.target.value}
        setFormVals(updatedFormVals)

        const errors = validateForm(updatedFormVals)
        setErrors(errors)
    }    

    const handleSubmit = async (e) => {
        //prevents a reload since that is what submitting forms does. In react
        //there is no reload
        e.preventDefault()

        const finalErrors = validateForm(formVals)
        setErrors(finalErrors)

        if(Object.keys(finalErrors).length === 0){
            try {
                await Register({
                    name: formVals.name,
                    username: formVals.username,
                    password: formVals.password,
                    department: formVals.department,
                    role: formVals.role
                })
                navigate('/signin')
            } catch (error) {
                console.error("Registration failed:", error);
            }
        }


    }

    const formvalidation = () => {
        const hasErrors = Object.keys(errors).length > 0
        const emptyFields = Object.values(formVals).some(val => val === '')
        return hasErrors || emptyFields
    }

    return(
        <>
        <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="signup">
            <form onSubmit={handleSubmit}>
            <h1>{t('register_page.title')}</h1>
            <p>{t('register_page.subtitle')}</p>
                <div className="input-wrapper">
                    <label htmlFor="name">{t('register_page.name_label')}</label>
                    <input
                        onChange={handleChange}
                        id="name"
                        type="text"
                        placeholder={t('register_page.name_placeholder')}
                        value={formVals.name}
                        required
                        autoComplete="name"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                <div className="input-wrapper">
                    <label htmlFor="username">{t('register_page.username_label')}</label>
                    <input
                        onChange={handleChange}
                        id="username"
                        type="text"
                        placeholder={t('register_page.username_placeholder')}
                        value={formVals.username}
                        required
                    />
                    {errors.username && <span className="error-message">{errors.username}</span>}
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">{t('register_page.password_label')}</label>
                    <input
                        onChange={handleChange}
                        type="password"
                        id="password"
                        value={formVals.password}
                        required
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                <div className="input-wrapper">
                    <label htmlFor="confirmpass">{t('register_page.confirmpass_label')}</label>
                    <input
                        onChange={handleChange}
                        type="password"
                        id="confirmpass"
                        value={formVals.confirmpass}
                        required
                    />
                    {errors.confirmpass && <span className="error-message">{errors.confirmpass}</span>}
                </div>
                <div className="input-wrapper">
                    <label htmlFor="department">{t('register_page.department_label')}</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        id="department"
                        placeholder={t('register_page.department_placeholder')}
                        value={formVals.department}
                        required
                    />
                    {errors.department && <span className="error-message">{errors.department}</span>}
                </div>           
                <button type='submit' disabled={formvalidation()}>
                    {t('register_page.create_account_button')}
                </button>
                <p>
                    {t('register_page.login_prompt')}{" "}
                    <Link to="/signin">{t('register_page.login_link')}</Link>
                </p>  
            </form>          
        </div>
        </>
    )
}
export default SignUp