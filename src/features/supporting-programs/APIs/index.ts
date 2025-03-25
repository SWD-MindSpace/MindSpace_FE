// Create functions to call APIs from BE
import axiosInstance from '@/lib/interceptor';


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

    const url = queryString ? `/api/v1/supporting-programs?${queryString}` : `/api/v1/supporting-programs`

    try {
        const response = await axiosInstance.get(`${url}`, {
            headers: {
                requiresAuth: false
            }
        })

        return {status: 'success', data: response.data}
    } catch (error) {
        console.log(error)
        
        return {status: 'error', error: 'Xảy ra lỗi'}
    }

}


export const createNewSupportingProgram = async (newSupportingProgram: any) => {

    try {
        // call API
        const response = await axiosInstance.post('/api/v1/supporting-programs', newSupportingProgram, {
            headers: {
                requiresAuth: true
            }
        }) 

        const locationUrl = response.headers.get('Location')

        if (!locationUrl) throw new Error('Location header not found')

        const newProgramResponseId = locationUrl.split('/').pop()

        if (!newProgramResponseId) throw new Error('Invalid response location')

        return {status: 'success', data: newProgramResponseId}

    } catch (error) {
        console.log(error)

        return { status: 'error', error: 'Xảy ra lỗi' }
    }
} 


export const getSupportingProgramById = async (id: number) => {

    try {
        const response = await axiosInstance.get(`/api/v1/supporting-programs/${id}`, {
            headers: {
                requiresAuth: true
            }
        })

        return {status: 'success', data: response.data}
    } catch (error) {
        console.log(error)
        
        return {status: 'error', error: 'Xảy ra lỗi'}
    }
}