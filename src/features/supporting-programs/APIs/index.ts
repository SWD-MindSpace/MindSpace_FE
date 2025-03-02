// Create functions to call APIs from BE
import axios from 'axios';

const baseUrlSupportingPrograms = 'https://localhost:7096/api/v1/supporting-programs'

export type SupportingProgramQueryParams = {
    MinQuantity?: number,
    MaxQuantity?: number,
    SearchTitle?: string,
    StartDateAt?: string,
    SchoolManagerId?: string,
    PsychologistId?: string,
    SchoolId?: string,
    FromDate?: string,
    ToDate?: string,
    Sort?: string,
    PageIndex?: number,
    PageSize?: number
}

export const getAllSupportingPrograms = async (searchParams: SupportingProgramQueryParams) => {

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
    ).toString()

    const url = queryString ? `${baseUrlSupportingPrograms}?${queryString}` : `${baseUrlSupportingPrograms}`

    try {
        // call API
        const response = await axios.get(url)

        const supportingProgramData = response?.data

        return { status: 'success', data: supportingProgramData }

    } catch (error) {
        console.log(error)

        return { status: 'error', error: 'Xảy ra lỗi' }
    }
}
