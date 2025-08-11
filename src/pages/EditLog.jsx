import { useEffect, useState } from "react"
import { GetLogs, UpdateLog } from "../services/logs"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import '../styling/pages/EditLog.css'

const EditLog = () => {
    let navigate = useNavigate()
    const {t, i18n} = useTranslation()
    const {assetid, logid} = useParams()
    const [log, setLog] = useState()
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const handleLog = async () => {
            try {
                const logs = await GetLogs(assetid)
                
                const log = logs.find((log) => log._id === logid)

                if(log) {
                    log.maintenanceDate = new Date(log.maintenanceDate).toISOString().split('T')[0]
                }
                
                setLog(log)
            } catch (error) {
                setErr(error)
            } finally {
                setLoading(false)
            }
        }
        if(assetid && logid){
            handleLog()
        }
        
    },[assetid, logid])

    const handleChange = (e) => {
        const value = e.target.id === 'cost' ? Number(e.target.value) : e.target.value
        setLog({...log, [e.target.id]: value})
    }

    if(loading){
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>{t('dashboard.loading_message')}</p>
            </div>
        )
    }

    if(err){
        return <h1>{t('dashboard.error_loading_assets')}</h1>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await UpdateLog(assetid, logid, log)
            navigate(`/assets/${assetid}`)
        } catch (error) {
            console.error("Error editing log", error)
        }
    }

    return(
        <>
        <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="edit-log">
            <Link to={`/assets/${assetid}`}><img src="/arrow.png" className='back' alt="arrowtogopreviouspage"/></Link>
            <form onSubmit={handleSubmit}>
                <h1>{t('edit_log_page.title')}</h1>
                <p>{t('edit_log_page.subtitle')}</p>
                
                <div className="input-wrapper">
                    <label htmlFor="maintenanceDate">{t('log.maintenance_date_label')} *</label>
                    <input
                        onChange={handleChange}
                        id="maintenanceDate"
                        type="date"
                        value={log.maintenanceDate}
                        required
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="description">{t('log.description')} *</label>
                    <textarea
                        onChange={handleChange}
                        id="description"
                        placeholder={t('log.description_placeholder')}
                        value={log.description}
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
                        value={log.performedBy}
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
                        value={log.cost}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="notes">{t('log.notes_label')}</label>
                    <textarea
                        onChange={handleChange}
                        id="notes"
                        placeholder={t('log.notes_placeholder')}
                        value={log.notes}
                        rows="4"
                    />
                </div>
                
                <div className="action">
                    <button type="submit">
                        {t('edit_log_page.save_button')}
                    </button>
                    <Link to={`/assets/${assetid}`}>
                        <button type="button" className="cancel">
                            {t('edit_log_page.cancel_button')}
                        </button>                         
                    </Link>
                </div>
                
            </form>
        </div>
        </>
    )
}
export default EditLog