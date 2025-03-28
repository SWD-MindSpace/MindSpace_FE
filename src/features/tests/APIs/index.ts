import axiosInstance from '@/lib/interceptor';
import { get, put, remove } from '@/lib/apiCaller';
import { TestCreateForm } from '../schemas/testCreateFormSchema';

const testEndpoint = '/api/v1/tests';
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

    const url = queryString ? `/api/v1/tests?${queryString}` : `/api/v1/tests`

    try {
        const response = await axiosInstance.get(`${url}`, {
            headers: {
                requiresAuth: false
            }
        })

        return { status: 'success', data: response.data }
    } catch (error) {
        console.log(error)

        return { status: 'error', error: 'Xảy ra lỗi' }
    }

}


export const createManualForm = async (testDraftId: string) => {

    try {

        const response = await axiosInstance.post('/api/v1/tests/manual', { testDraftId }, {
            headers: {
                requiresAuth: true
            }
        })

        const locationUrl = response.headers['location']
        if (!locationUrl) throw new Error('Location header not found')

        const testResponseId = locationUrl.split('/').pop()

        if (!testResponseId) throw new Error('Invalid response location')

        return { status: 'success', data: testResponseId }

    } catch (error) {
        console.log(error)

        const errorMessage = (error instanceof Error && error.message) ? error.message : 'Xảy ra lỗi'

        return { status: 'error', error: errorMessage }
    }

}

export const getTestById = async (id: number) => {

    try {
        const response = await axiosInstance.get(`/api/v1/tests/${id}`, {
            headers: {
                requiresAuth: true
            }
        })

        return { status: 'success', data: response.data }
    } catch (error) {
        console.log(error)

        return { status: 'error', error: 'Xảy ra lỗi' }
    }
}

export const toggleTestStatus = async (id: number) => {
    return await put(`${testEndpoint}/${id}/toggle-status`)
}

export const deleteTestById = async (id: number) => {
    return await remove(`${testEndpoint}/${id}`)
}

export const importTest = async (formData: FormData) => {

    try {

        const response = await axiosInstance.post(`${testEndpoint}/import`, formData, {
            headers: {
                requiresAuth: true,
                "Content-Type": "multipart/form-data"
            }
        })

        return {
            status: 'success',
            data: response.data,
            headers: response.headers
        }

    } catch (error) {

        console.log(error)

        return { status: 'error', error: 'Xảy ra lỗi' }
    }
}

// ==================================
//             TEST DRAFT
// ==================================

export const getTestDraftById = async (id: string) => {

    try {
        const response = await axiosInstance.get(`/api/v1/testdraft/${id}`, {
            headers: {
                requiresAuth: true
            }
        })

        return { status: 'success', data: response.data }
    } catch (error) {
        console.log(error)

        return { status: 'error', error: 'Xảy ra lỗi' }
    }

}


export const updateTestDraft = async (updatedForm: TestCreateForm) => {

    try {
        await axiosInstance.post(`/api/v1/testdraft`, updatedForm,
            {
                headers: {
                    requiresAuth: true
                }
            })

    } catch (error) {
        console.log(error)

        return { status: 'error', error: 'Xảy ra lỗi' }
    }

}


export const deleteTestDraftById = async (id: number) => {

    try {
        await axiosInstance.delete(`/api/v1/testdraft/${id}`, {
            headers: {
                requiresAuth: true
            }
        })

    } catch (error) {
        console.log(error)

        return { status: 'error', error: 'Xảy ra lỗi' }
    }

}


// Test response Statistics
export type TestResponseStatisticsQueryParams = {
    TestId: number,
    SchoolId?: number,
    StartDate?: string,
    EndDate?: string,
}
const statisticsEndpoint = '/api/v1/statistics';
export const getScoreRankAnalysis = async (searchParams: TestResponseStatisticsQueryParams) => {
    return get(`${statisticsEndpoint}/test-responses/score-rank-analysis`, searchParams)
}

export const getTimeAnalysis = async (searchParams: TestResponseStatisticsQueryParams) => {
    return get(`${statisticsEndpoint}/test-responses/time-analysis`, searchParams)
}

export const getQuestionResponseAnalysis = async (searchParams: TestResponseStatisticsQueryParams) => {
    return get(`${statisticsEndpoint}/test-responses/question-responses-analysis`, searchParams)
}