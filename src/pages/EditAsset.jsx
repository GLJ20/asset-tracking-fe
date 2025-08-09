import { useEffect, useState } from "react"
import { GetAssetById, UpdateAsset } from "../services/asset"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from "react-i18next"
import '../styling/pages/EditAsset.css'

const EditAsset = () => {
    let navigate = useNavigate()
    const {t, i18n} = useTranslation()
    const {assetid} = useParams()
    const [asset, setAsset] = useState({})
    // const [open, setOpen] = useState(false)
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(true)

    const [attachments, setAttachments] = useState(asset.attachments || [])
    const [newAttachment, setNewAttachment] = useState(''); 


    // const handleClickOpen = () => {
    //     setOpen(true)
    // }

    // const handleClose = () => {
    //     setOpen(false)
    // }

    useEffect(() => {
        const handleAsset = async () => {
            try {
                const data = await GetAssetById(assetid)
                setAsset(data)
                setAttachments(data.attachments || [])
            } catch (error) {
                setErr(error)
            } finally {
                setLoading(false)
            }
        }
        if(assetid){
            handleAsset()
        }
    }, [assetid])

    const handleChange = (e) => {
        setAsset({...asset, [e.target.id]: e.target.value})
    }

    const handleAddAttachment = () => {
        if (newAttachment.trim() !== '') {
            const updatedAttachments = asset.attachments ? [...asset.attachments, newAttachment.trim()] : [newAttachment.trim()];
            setAsset({ ...asset, attachments: updatedAttachments });
            setNewAttachment(''); 
        }
    };
    const handleRemoveAttachment = (attachmentToRemove) => {
        const updatedAttachments = asset.attachments.filter(attachment => attachment !== attachmentToRemove);
        setAsset({ ...asset, attachments: updatedAttachments });
    };

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
    const addAttachment = () => {
        setAttachments([...attachments, ''])
        if (attachment.trim() !== '') {
            setAttachments([...attachments, attachments])
        }
    }

    const removeAttachment = (index) => {
        setAttachments(attachments.filter((_, i) => i !== index))
    }

    const updateAttachment = (index, value) => {
        const updated = [...attachments]
        updated[index] = value
        setAttachments(updated)
        setAsset({...asset, attachments: updated})
    }
    const handleSubmit = async (e) => {
       e.preventDefault()

       try {
            await UpdateAsset(assetid, asset)
            // setOpen(false)
            // setEdited(true)
        } catch (error) {
            console.error("Error updating asset", error)
            setOpen(false)
        }   
    }

    return(
        <>
        <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="edit-asset">
            <Link to={`/assets/${assetid}`}><img src="/arrow.png" className='back' alt="arrowtogopreviouspage"/></Link>
            <form onSubmit={handleSubmit}>
                <h1>{t('edit_asset_page.title')}</h1>
                <p>{t('edit_asset_page.subtitle')}</p>
                <div className="edit-asset-grid">
                    {/* First column */}
                    <div className="first-column">
                        <div className="input-wrapper">
                            <label htmlFor="companyDeviceId">{t('add_asset_page.company_device_id_label')} *</label>
                            <input
                                onChange={handleChange}
                                id="companyDeviceId"
                                type="text"
                                placeholder={t('add_asset_page.company_device_id_placeholder')}
                                value={asset.companyDeviceId}
                                required
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="type">{t('add_asset_page.type_label')} *</label>
                            <select onChange={handleChange} id="type" value={asset.type} required>
                                <option value="" disabled>{t('add_asset_page.type_placeholder')}</option>
                                <option value="Laptop">Laptop</option>
                                <option value="Monitor">Monitor</option>
                                <option value="Desktop">Desktop</option>
                                <option value="Tablet">Tablet</option>
                                <option value="Smartphone">Smartphone</option>
                                <option value="3D Printer">3D Printer</option>
                                <option value="Milling Machine">Milling Machine</option>
                                <option value="Vacuum Former">Vacuum Former</option>
                                <option value="Furnace">Furnace</option>
                                <option value="Scanner">Scanner</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="model">{t('add_asset_page.model_label')}</label>
                            <input
                                onChange={handleChange}
                                id="model"
                                type="text"
                                placeholder={t('add_asset_page.model_placeholder')}
                                value={asset.model || ''}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="purchaseDate">{t('add_asset_page.purchase_date_label')} *</label>
                            <input
                                onChange={handleChange}
                                id="purchaseDate"
                                type="date"
                                value={asset.purchaseDate}
                                required
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="status">{t('add_asset_page.status_label')} *</label>
                            <select onChange={handleChange} id="status" value={asset.status} required>
                                <option value="In Use">{t('asset_status.In Use')}</option>
                                <option value="Available">{t('asset_status.Available')}</option>
                                <option value="In Repair">{t('asset_status.In Repair')}</option>
                                <option value="Retired">{t('asset_status.Retired')}</option>
                                <option value="Lost">{t('asset_status.Lost')}</option>
                            </select>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="department">{t('add_asset_page.department_label')}</label>
                            <input
                                onChange={handleChange}
                                id="department"
                                type="text"
                                placeholder={t('add_asset_page.department_placeholder')}
                                value={asset.department || ''}
                            />
                        </div>
                    </div>

                    <div className="sec-column">
                        <div className="input-wrapper">
                            <label htmlFor="name">{t('add_asset_page.name_label')} *</label>
                            <input
                                onChange={handleChange}
                                id="name"
                                type="text"
                                placeholder={t('add_asset_page.name_placeholder')}
                                value={asset.name}
                                required
                            />
                        </div> 
                        <div className="input-wrapper">
                            <label htmlFor="brand">{t('add_asset_page.brand_label')}</label>
                            <input
                                onChange={handleChange}
                                id="brand"
                                type="text"
                                placeholder={t('add_asset_page.brand_placeholder')}
                                value={asset.brand || ''}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="serialNumber">{t('add_asset_page.serial_number_label')} *</label>
                            <input
                                onChange={handleChange}
                                id="serialNumber"
                                type="text"
                                placeholder={t('add_asset_page.serial_number_placeholder')}
                                value={asset.serialNumber}
                                required
                            />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="location">{t('add_asset_page.location_label')}</label>
                            <input
                                onChange={handleChange}
                                id="location"
                                type="text"
                                placeholder={t('add_asset_page.location_placeholder')}
                                value={asset.location || ''}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="color">{t('add_asset_page.color_label')}</label>
                            <input
                                onChange={handleChange}
                                id="color"
                                type="text"
                                placeholder={t('add_asset_page.color_placeholder')}
                                value={asset.color || ''}
                            />
                        </div>
                    </div>
                </div>

                <div className="attachments-section">
                    <label>{t('add_asset_page.attachments_label')}</label>
                        {attachments.map((attachment, index) => (
                            <div key={index} className="attachment-input-row">
                                <input
                                    type="text"
                                    value={attachment}
                                    onChange={(e) => updateAttachment(index, e.target.value)}
                                    placeholder="e.g., keyboard, mouse, webcam"
                                />
                                <button type="button" onClick={() => removeAttachment(index)}>Remove</button>
                            </div>
                        ))}

                        <div className="add-attachment-input">
                            <input
                                id="newAttachment"
                                type="text"
                                placeholder={t('add_asset_page.attachments_placeholder')}
                                value={newAttachment}
                                onChange={(e) => setNewAttachment(e.target.value)}
                            />
                            <button type="button" onClick={handleAddAttachment}>
                                {t('add_asset_page.add_attachment_button')}
                            </button>
                        </div>
                        
                        <div className="attachment-pills-container">
                            {asset.attachments && asset.attachments.map((attachment, index) => (
                                <div key={index} className="attachment-pill">
                                    <span>{attachment}</span> 
                                    <span className="remove" onClick={() => handleRemoveAttachment(attachment)}>x</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="notes">{t('add_asset_page.notes_label')}</label>
                        <textarea
                            onChange={handleChange}
                            id="notes"
                            placeholder={t('add_asset_page.notes_placeholder')}
                            value={asset.notes}
                            rows="4"
                        />
                    </div>
                <button type="submit">
                    {t('add_asset_page.create_button')}
                </button>
                <button type="submit">
                    {t('add_asset_page.create_button')}
                </button>               
            </form>
        </div>
        </>
    )
}
export default EditAsset