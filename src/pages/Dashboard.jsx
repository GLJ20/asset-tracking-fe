import { useState, useEffect } from "react"
import { GetAssets } from "../services/asset"
import { useTranslation } from "react-i18next"
import Asset from "../components/Asset"
import AddAsset from "./AddAsset"
import { Link } from "react-router-dom"

const Dashboard = () => {
    const {t, i18n} = useTranslation()
    const [assets, setAssets] = useState([])

    useEffect(() => {
        const handleAssets = async () => {
            const data = await GetAssets()
            setAssets(data)
        }
        handleAssets()
    }, [])
    return (
        <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="dashboard">
            <div className="dashboard-header">
                <Link><button>{t('dashboard.add_asset')}</button></Link>
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