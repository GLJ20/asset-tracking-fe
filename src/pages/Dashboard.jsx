import { useState, useEffect } from "react"
import { GetAssets } from "../services/asset"
import { useTranslation } from "react-i18next"
import Asset from "../components/Asset"

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
        <div>
            <h1>Assets</h1>
            <div className="assets-container">
                {assets.map((asset) => (
                    <Asset key={asset._id} asset={asset}/>
                ))}
            </div>
        </div>
    )
}
export default Dashboard