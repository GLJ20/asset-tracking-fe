import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

const Asset = ({asset}) => {
    const {t, i18n} = useTranslation()
    //not a real word
    const statuses = {
        'In Use': 'asset.status.in_use',
        'Available': 'asset.status.available',
        'In Repair': 'asset.status.in_repair',
        "Retired": "asset.status.retired",
        "Lost": "asset.status.lost"
    }

    const assignedUserName = asset.assignedTo?.name || t('asset.not_assigned')

    const statusTranslation = statuses[asset.status] || 'asset.status.in_use'
    return(
        <>
        {/* <Link to={`/assets/${asset.id}`}> */}
            <div className="asset-card" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                <div className="asset-header">
                    <h4 className="asset-name">{asset.name}</h4>
                    <h5 className="asset-brand-model">
                        {asset.brand} {asset.model}
                    </h5>
                </div>
                <div className="asset-details-grid">
                    <div className="label">{t('asset.identifier')}:</div>
                    <div className="value">{asset.companyDeviceId}</div>

                    <div className="label">{t('asset.type')}:</div>
                    <div className="value">{asset.type}</div>

                    <div className="label">{t('asset.department')}:</div>
                    <div className="value">{asset.department}</div>

                    <div className="label">{t('asset.location')}:</div>
                    <div className="value">{asset.location}</div>

                    <div className="label">{t('asset.assigned_to')}:</div>
                    <div className="value">{assignedUserName}</div>

                    <button className="status">
                        {t(statusTranslation)}
                    </button>                    
                </div>
            </div>
        {/* add link */}
        </>
    )
}

export default Asset