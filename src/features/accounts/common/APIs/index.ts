// Create functions to call APIs from BE

import { ROLE_ID } from '../constants';
import { get, put } from '@/lib/apiCaller';
import axiosInstance from '@/lib/interceptor';

const baseUrlAccounts = '/api/v1/identities/accounts';
const baseUrlStudents = '/api/v1/identities/accounts/students';

export type AccountQueryParams = {
    SearchName?: string,
    Sort?: boolean,
    Status?: string,
    RoleId?: number,
    MinAge?: number,
    MaxAge?: number,
    SchoolId?: number,
    PageSize?: number,
    PageIndex?: number
}

const getQueryString = (searchParams: AccountQueryParams) => {
    // append PageSize to params obj
    searchParams = {
        ...searchParams,
        PageSize: searchParams.PageSize ? Number(searchParams.PageSize) : 12,
    }

    // Convert to type Record<string,string> -> Convert to a query string
    const queryString = new URLSearchParams(
        Object.entries(searchParams).reduce((acc, [key, value]) => {
            if (value !== undefined) {
                acc[key] = value.toString();
            }
            return acc;
        }, {} as Record<string, string>)
    ).toString();
    return queryString
}


export const getAllAccounts = async (searchParams: AccountQueryParams) => {
    const queryString = getQueryString(searchParams)

    try {

        const response = await get(baseUrlAccounts, searchParams)
        const responseData = response?.data;
        return { status: 'success', data: responseData }


    } catch (error) {

        console.log(error)

        return { status: 'error', error: 'Xảy ra lỗi' }
    }
}


export const getAllStudents = async (searchParams: AccountQueryParams) => {
    const queryString = getQueryString(searchParams)
    console.log(queryString)

    try {

        const response = await get(baseUrlStudents, searchParams)
        const responseData = response?.data;
        return { status: 'success', data: responseData }

    } catch (error) {

        console.log(error)

        return { status: 'error', error: 'Xảy ra lỗi' }
    }
}


export const getAllPsychologists = async () => {
    const searchParams = {
        RoleId: ROLE_ID.PSYCHOLOGIST,
        PageSize: 1000,
    }

    const queryString = getQueryString(searchParams)

    try {

        const response = await get(baseUrlAccounts, searchParams)
        const responseData = response?.data;
        return { status: 'success', data: responseData }

    } catch (error) {

        console.log(error)

        return { status: 'error', error: 'Xảy ra lỗi' }
    }
}

export const toggleAccountStatus = async (accountId: number) => {
    return put(`${baseUrlAccounts}/${accountId}/toggle-status`)
}

export const createNewAccountByImport = async (roleName: any, formData: FormData) => {

    try {

        const response = await axiosInstance.post(`/api/v1/identities/register-for/${roleName}`, formData, {
            headers: {
                requiresAuth: true,
                "Content-Type": "multipart/form-data"
            }
        })

        return { status: 'success', data: response.data }

    } catch (error) {

        console.log(error)

        return { status: 'error', error: 'Xảy ra lỗi' }
    }
}