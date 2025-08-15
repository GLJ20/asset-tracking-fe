import Client from "./api";

export const CreateAsset = async (data) => {
    try {
        const res = await Client.post('/assets', data)
        return res.data
    } catch (error) {
        throw error
    }   
}

export const GetAssets = async () => {
    try {
        const res = await Client.get('/assets')
        return res.data
    } catch (error) {
        throw error
    }
}

export const GetAssetById = async (assetid) => {
    try {
        const res = await Client.get(`/assets/${assetid}`)
        return res.data
    } catch (error) {
        throw error
    }
}

export const UpdateAsset = async (assetid, asset) => {
    try {
        const res = await Client.put(`/assets/${assetid}`, asset)
        return res.data
    } catch (error) {
        throw error
    }
}

export const DeleteAsset = async (assetid) => {
    try {
        const res = await Client.delete(`/assets/${assetid}`)
        return res.data
    } catch (error) {
        throw error
    }
}