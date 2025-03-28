import { get } from '@/lib/apiCaller';

const specializationEndpoint = "/api/v1/specializations";

export const getAllSpecializations = async () => {
    return get(specializationEndpoint);
}