import { useState } from "react"
import { CreateLog } from "../services/logs"
import { useNavigate, useParams, Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import '../styling/pages/AddLog.css'

const AddLog = () => {
    let navigate = useNavigate()
    const {t, i18n} = useTranslation()
    const {assetid} = useParams()

    const initialState = {
        maintenanceDate: '',
        description: '',
        performedBy: '',
        cost: 0,
        notes: ''
    }

    const [formVals, setFormVals] = useState(initialState)

    const handleChange = (e) => {
        //handle the value of cost input since it is a string and we need number
        const value = e.target.id === 'cost' ? Number(e.target.value) : e.target.value
        setFormVals({...formVals, [e.target.id]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault() 

        try {
            await CreateLog(assetid, formVals) 

            setFormVals(initialState);

            navigate(`/assets/${assetid}`);
        } catch (error) {
            throw error
        }
    }
    return(
        <>
        <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="addlog">
            <Link to={`/assets/${assetid}`}><img src="/arrow.png" className='back' alt="arrowtogopreviouspage"/></Link>
            <form onSubmit={handleSubmit}>
                <h2>{t('log.title')}</h2>
                <div className="input-wrapper">
                    <label htmlFor="maintenanceDate">{t('log.maintenance_date_label')} *</label>
                    <input
                        onChange={handleChange}
                        id="maintenanceDate"
                        type="date"
                        value={formVals.maintenanceDate}
                        required
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="description">{t('log.description')} *</label>
                    <textarea
                        onChange={handleChange}
                        id="description"
                        placeholder={t('log.description_placeholder')}
                        value={formVals.description}
                        rows="4"
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="performedBy">{t('log.performedBy_label')} *</label>
                    <input
                        onChange={handleChange}
                        id="performedBy"
                        type="text"
                        placeholder={t('log.performedBy_placeholder')}
                        value={formVals.performedBy}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="cost">{t('log.cost_label')} *</label>
                    <input
                        onChange={handleChange}
                        id="cost"
                        type="number"
                        step='0.01'
                        min='0'
                        placeholder={t('log.cost_placeholder')}
                        value={formVals.cost}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="notes">{t('log.notes_label')}</label>
                    <textarea
                        onChange={handleChange}
                        id="notes"
                        placeholder={t('log.notes_placeholder')}
                        value={formVals.notes}
                        rows="4"
                    />
                </div>
                <button type="submit">
                        {t('log.submit_button')}
                </button>
            </form>
        </div>
        </>
    )
}
export default AddLog