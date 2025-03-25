// Create functions to call APIs from BE
import { get } from '../../../../lib/apiCaller';
const baseUrlAccounts = '/identities/accounts';

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
        PageSize: 12
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
const getAllEntities = async (url: string) => {

    try {
        // call API
        const response = await get(url)

        const responseData = response?.data

        return { status: 'success', data: responseData }

    } catch (error) {
        console.log(error)

        return { status: 'error', error: 'Xảy ra lỗi' }
    }
}

const getUrl = (queryString: string, baseUrl: string) => {
    return queryString ? `${baseUrl}?${queryString}` : `${baseUrl}`
}

export const getAllAccounts = async (searchParams: AccountQueryParams) => {
    const queryString = getQueryString(searchParams)
    const url = getUrl(queryString, baseUrlAccounts)
    return getAllEntities(url);
}

export const getAllStudents = async (searchParams: AccountQueryParams) => {
    const queryString = getQueryString(searchParams)
    const url = getUrl(queryString, `${baseUrlAccounts}/students`)
    return getAllEntities(url);
}
