import { useState, useEffect } from "react"
import { GetAssets } from "../services/asset"
import { useTranslation } from "react-i18next"
import Asset from "../components/Asset"
import { Link } from "react-router-dom"
import '../styling/pages/Dashboard.css'

const Dashboard = () => {
    const {t, i18n} = useTranslation()
    const [assets, setAssets] = useState([])
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState(null)

    useEffect(() => {
        const handleAssets = async () => {
            try {
            setLoading(true)

            setErr(null)

            const data = await GetAssets()
            setAssets(data)
            } catch (error) {
                setErr(error)
            } finally {
                setLoading(false)
            }
        }
        handleAssets()
    }, [])

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

    return (
        <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="dashboard">
            <div className="dashboard-header">
                <Link to='/addasset'><button>{t('dashboard.add_asset')}</button></Link>
                <h1>{t('dashboard.heading')}</h1>
                
            </div>

            <div className="assets-container">
                {assets.map((asset) => (
                    <Asset key={asset._id} asset={asset}/>
                ))}
            </div>
        </div>
    )
}
export default Dashboard