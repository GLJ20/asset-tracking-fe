import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { GetAssetById } from "../services/asset"
import { useTranslation } from "react-i18next"
import EditAsset from "../components/EditAsset"
import '../styling/pages/AssetDetails.css'

const AssetDetails = () => {
    const {assetid} = useParams()
    const [asset, setAsset] = useState(null)
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState(null)
    let navigate = useNavigate()
    const {t, i18n} = useTranslation()

    const statuses = {
        'In Use': 'asset.status.in_use',
        'Available': 'asset.status.available',
        'In Repair': 'asset.status.in_repair',
        "Retired": "asset.status.retired",
        "Lost": "asset.status.lost"
    }

    useEffect(() => {
        const handleAsset = async () => {
            try {
                setLoading(true)
                setErr(null)

                console.log('Attempting to fetch asset with ID:', assetid)
                console.log('Token in localStorage:', localStorage.getItem('token') ? 'Present' : 'Missing')
                const data = await GetAssetById(assetid)
                
                setAsset(data)
            } catch (error) {
                setErr(error)
            } finally{
                setLoading(false)
            }
        }
        if(assetid){
            handleAsset()
        }
    }, [assetid])

    if(loading){
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>{t('asset_detail_page.loading_message')}</p>
            </div>
        )
    }

    if(err){
        return <h1>{t('asset_detail_page.error_loading_asset')}</h1>
    }
    
    const assignedUserName = asset.assignedTo?.name || t('asset.not_assigned')
    
    const statusTranslation = statuses[asset.status] || 'asset.status.in_use'
    return(
        <>
        <div className="asset-details" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="asset-detail-header">
                <div>
                    <h1>{asset.name}</h1>
                    <p>{asset.brand} {asset.model}</p>
                </div>
                <div>
                    <button className="status">
                        {t(statusTranslation)}
                    </button>  
                </div>
            </div>

            <div className="specs">
                <h3>{t('asset_detail_page.specifications_title')}</h3>
                <div className="details-grid">
                    <div className="label">{t('asset_detail_page.company_device_id_label')}:</div>
                    <div className="value">{asset.companyDeviceId}</div>

                    <div className="label">{t('asset_detail_page.type_label')}:</div>
                    <div className="value">{asset.type}</div>

                    <div className="label">{t('asset_detail_page.brand_label')}:</div>
                    <div className="value">{asset.brand || t('asset_detail_page.not_available')}</div>

                    <div className="label">{t('asset_detail_page.model_label')}:</div>
                    <div className="value">{asset.model || t('asset_detail_page.not_available')}</div>

                    <div className="label">{t('asset_detail_page.serial_number_label')}:</div>
                    <div className="value">{asset.serialNumber}</div>
                    
                    <div className="label">{t('asset_detail_page.color_label')}:</div>
                    <div className="value">{asset.color || t('asset_detail_page.not_available')}</div>

                    
                    <div className="label">{t('asset_detail_page.purchase_date_label')}:</div>
                    <div className="value">{asset.purchaseDate ? new Date(asset.purchaseDate).toLocaleDateString() : 'N/A'}</div>

                    <div className="label">{t('asset_detail_page.location_label')}:</div>
                    <div className="value">{asset.location || t('asset_detail_page.not_available')}</div>
                    
                    <div className="label">{t('asset_detail_page.department_label')}:</div>
                    <div className="value">{asset.department || t('asset_detail_page.not_available')}</div>

                    <div className="label">{t('asset_detail_page.assigned_to_label')}:</div>
                    <div className="value">{assignedUserName}</div>
                
                </div>

                <div className="notes">
                    <h4>{t('asset_detail_page.notes_label')}:</h4>
                    <p>{asset.notes || t('asset_detail_page.not_available')}</p>
                </div>

                <div className="attachments">
                    <h4>{t('asset_detail_page.attachments_label')}:</h4>
                    {asset.attachments && asset.attachments.length > 0 ? (
                        asset.attachments.map((attachment, index) => (
                            <span key={index} className="attachment">
                                {attachment}
                            </span>
                        ))
                    ) : (
                        t('asset_detail_page.not_available')
                    )}
                </div>

                <div className="action-container">
                    <Link to={`/edit/${assetid}`}>
                    <button className="edit-button">
                        {t('asset_detail_page.edit_button')}
                    </button>
                    </Link>
                    <button className="delete-button">
                        {t('asset_detail_page.delete_button')}
                    </button>
                    <EditAsset/>
                </div>
            </div>
        </div>
        </>
    )
}
export default AssetDetails