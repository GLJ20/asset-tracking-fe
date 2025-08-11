import { useTranslation } from "react-i18next"
import { GetLogs } from "../services/logs"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import '../styling/components/Log.css'

const Log = ({assetid}) => {
    const [logs, setLogs] = useState([])
    const {t, i18n} = useTranslation()

    useEffect(() => {
        const handleLogs = async () => {
            const data = await GetLogs(assetid)

            const sortedLogs = [...data].sort((a,b) => new Date(b.maintenanceDate) - new Date(a.maintenanceDate))

            setLogs(sortedLogs)
        }
        if (assetid) {
            handleLogs()
        }
    }, [assetid]) //re-run if asset id changes

    return(
        <>
        <div className="logs-container" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}> 
            <div className="header-log">
                <h3>{t('asset_detail_page.log_title')}</h3>
                <Link to={`/assets/${assetid}/addlog`}><button>{t('asset_detail_page.add_log')}</button></Link>
            </div>
        
            <div className="log-card">
                {logs.length > 0 ? (
                logs.map(log => (
                    <div key={log._id} className="log">
                        <div className="log-content">
                            <p>{new Date(log.maintenanceDate).toLocaleDateString()}</p>
                            <h3>{log.description}</h3>
                            <p>{t('log_display.performed_by_label')}: {log.performedBy}</p>
                            <p>{t('log_display.cost_label')}: {log.cost}</p>
                            <p>{t('log_display.notes_label')}: {log.notes}</p>
                        </div>
                        <Link to={`/assets/${assetid}/${log._id}`}><button className="edit-log"><img src="/edit.webp"/></button></Link>
                    </div>
                ))

            ) : (
                <p>No Logs</p>
            )}
            </div>
        </div>
        </>
    )
}
export default Log