import Client from "./api"

export const CreateLog = async (assetid, data) => {
    try {
        const res = await Client.post(`/assets/${assetid}/maintenancelogs`, data)
        return res.data
    } catch (error) {
        throw error
    }
}

export const GetLogs = async (assetid) => {
    try {
        const res = await Client.get(`/assets/${assetid}/maintenancelogs`)
        return res.data
    } catch (error) {
        throw error
    }
}

export const UpdateLog = async (assetid, logid, log) => {
    try {
        const res = await Client.put(`/assets/${assetid}/maintenancelogs/${logid}`, log)
        return res.data
    } catch (error) {
        throw error
    }
}

export const DeleteLog = async (assetid, logid) => {
    try {
        const res = await Client.delete(`/assets/${assetid}/maintenancelogs/${logid}`)
        return res.data
    } catch (error) {
        throw error
    }
}
