import { put } from "@/lib/apiCaller";

const resourceEndpoint = '/api/v1/resources';
export const toggleResourceStatus = async (id: number) => {
    return await put(`${resourceEndpoint}/${id}/toggle-status`)
}