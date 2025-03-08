// Create functions to call APIs from BE
import axios from 'axios';
import { TestCreateForm } from '../schemas/testCreateFormSchema';

const baseUrlTest = 'https://localhost:7096/api/v1/tests'

export type TestQueryParams = {
    Title?: string,
    TestCode?: string,
    TargetUser?: string,
    MinPrice?: number,
    MaxPrice?: number,
    TestCategoryId?: number,
    SpecializationId?: number,
    Sort?: string,
    PageIndex?: number,
    PageSize?: number
}

// ==============================
//             TEST
// ==============================

export const getAllTests = async (searchParams: TestQueryParams) => {

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

    const url = queryString ? `${baseUrlTest}?${queryString}` : `${baseUrlTest}`

    try {
        // call API
        const response = await axios.get(url)

        const testData = response?.data

        return { status: 'success', data: testData }

    } catch (error) {
        console.log(error)

        return { status: 'error', error: 'Xảy ra lỗi' }
    }
}


export const createManualForm = async (testDraftId: string) => {
    const url = `${baseUrlTest}/manual`

    try {
        
        const response = await axios.post(url, {testDraftId: testDraftId})

        const locationUrl = response.headers.get('Location')

        if (!locationUrl) throw new Error('Location header not found')

        const testResponseId = locationUrl.split('/').pop()

        if (!testResponseId) throw new Error('Invalid response location')

        return {status: 'success', data: testResponseId}

    } catch (error) {
        console.log(error)

        const errorMessage = typeof(error) === 'string' ? error.message : 'Xảy ra lỗi'

        return {status: 'error', error: errorMessage}
    }

}

export const getTestById = async (id: number) => {
    const url = `https://localhost:7096/api/v1/tests/${id}`

    try {
        const response = await axios.get(url)

        return {status: 'success', data: response.data}
    } catch (error) {
        console.log(error)
        
        return {status: 'error', error: 'Xảy ra lỗi'}
    }
}


// ==================================
//             TEST DRAFT
// ==================================

export const getTestDraftById = async (id: string) => {
    const url = `https://localhost:7096/api/v1/testdraft/${id}`

    try {
        const response = await axios.get(url)

        return {status: 'success', data: response.data}
    } catch (error) {
        console.log(error)
        
        return {status: 'error', error: 'Xảy ra lỗi'}
    }
}


export const updateTestDraft = async (updatedForm: TestCreateForm) => {
    const url = 'https://localhost:7096/api/v1/testdraft'

    try {
        
        await axios.post(url, updatedForm)

    } catch (error) {
        console.log(error)
        
        return {status: 'error', error: 'Xảy ra lỗi'}
    }
}


export const deleteTestDraftById = async (id: number) => {

    const url = `https://localhost:7096/api/v1/testdraft/${id}`
    
    try {
        
        await axios.delete(url)

    } catch (error) {
        console.log(error)
        
        return {status: 'error', error: 'Xảy ra lỗi'}
    }
}
