import { useState } from "react"
import { CreateAsset } from "../services/asset"
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next"
import '../styling/pages/AddAsset.css'

const AddAsset = () => {
    let navigate = useNavigate()
    const {t, i18n} = useTranslation()

    const initialState = {
        companyDeviceId: '',
        name: '',
        type: '',
        brand: '',
        model: '',
        serialNumber: '',
        purchaseDate: '',
        status: 'In Use',
        location: '',
        department: '',
        notes: '',
        color: '',
        attachments: []
    }

    const [formVals, setFormVals] = useState(initialState)
    const [newAttachment, setNewAttachment] = useState('')

    const handleChange = (e) => {
        setFormVals({...formVals, [e.target.id]: e.target.value})
    }

    const handleAddAttachment = (e) => {
        e.preventDefault() 
        //check first that an attachment has been written
        if (newAttachment.trim() !== '') {
            setFormVals({
                ...formVals,
                attachments: [...formVals.attachments, newAttachment.trim()]
            })
            setNewAttachment('') // Clear the input field
        }
    }

    const handleRemoveAttachment = (attachmentToRemove) => {
        //using filter method we create new array which only has the items that pass attachment !== attachmentToremove
        setFormVals ({
            ...formVals,
            attachments: formVals.attachments.filter(attachment => attachment !== attachmentToRemove)
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await CreateAsset(formVals)

            setFormVals(initialState)

            navigate("/dashboard")
        } catch (error) {
            console.error("Failed to create asset:", error)
        }    
    }
    return(
        <>
        <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="add-asset">
            <form onSubmit={handleSubmit}>
                <h1>{t('add_asset_page.title')}</h1>
                <p>{t('add_asset_page.subtitle')}</p>
                <div className="add-asset-grid">
                    {/* First column */}
                    <div className="first-column">
                        <div className="input-wrapper">
                            <label htmlFor="companyDeviceId">{t('add_asset_page.company_device_id_label')} *</label>
                            <input
                                onChange={handleChange}
                                id="companyDeviceId"
                                type="text"
                                placeholder={t('add_asset_page.company_device_id_placeholder')}
                                value={formVals.companyDeviceId}
                                required
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="type">{t('add_asset_page.type_label')} *</label>
                            <select onChange={handleChange} id="type" value={formVals.type} required>
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
                                value={formVals.model}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="purchaseDate">{t('add_asset_page.purchase_date_label')} *</label>
                            <input
                                onChange={handleChange}
                                id="purchaseDate"
                                type="date"
                                value={formVals.purchaseDate}
                                required
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="status">{t('add_asset_page.status_label')} *</label>
                            <select onChange={handleChange} id="status" value={formVals.status} required>
                                <option value="In Use">In Use</option>
                                <option value="Available">Available</option>
                                <option value="In Repair">In Repair</option>
                                <option value="Retired">Retired</option>
                                <option value="Lost">Lost</option>
                            </select>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="department">{t('add_asset_page.department_label')}</label>
                            <input
                                onChange={handleChange}
                                id="department"
                                type="text"
                                placeholder={t('add_asset_page.department_placeholder')}
                                value={formVals.department}
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
                                value={formVals.name}
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
                                value={formVals.brand}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="serialNumber">{t('add_asset_page.serial_number_label')} *</label>
                            <input
                                onChange={handleChange}
                                id="serialNumber"
                                type="text"
                                placeholder={t('add_asset_page.serial_number_placeholder')}
                                value={formVals.serialNumber}
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
                                value={formVals.location}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="color">{t('add_asset_page.color_label')}</label>
                            <input
                                onChange={handleChange}
                                id="color"
                                type="text"
                                placeholder={t('add_asset_page.color_placeholder')}
                                value={formVals.color}
                            />
                        </div>
                        <div className="attachments">
                            <label htmlFor="newAttachment">{t('add_asset_page.attachments_label')}</label>
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
                                {formVals.attachments.map((attachment, index) => (
                                    <div key={index} className="attachment-pill">
                                        <span>{attachment}</span> 
                                        <span className="remove" onClick={() => handleRemoveAttachment(attachment)}>x</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="input-wrapper">
                    <label htmlFor="notes">{t('add_asset_page.notes_label')}</label>
                    <textarea
                        onChange={handleChange}
                        id="notes"
                        placeholder={t('add_asset_page.notes_placeholder')}
                        value={formVals.notes}
                        rows="4"
                    />
                </div>
                <button type="submit" className="submitbtn">
                    {t('add_asset_page.create_button')}
                </button>              
            </form>
        </div>
        </>
    )
}
export default AddAsset