// Create functions to call APIs from BE
import axiosInstance from '@/lib/interceptor';


export type QuestionQueryParams = {
    SearchQuestionContent?: string
    Sort?: string
    PageIndex?: number
    PageSize?: number
    IsOnlyGetQuestionsWithOptions?: boolean
}


export const getAllQuestions = async (searchParams?: QuestionQueryParams) => {
    
    // append PageSize to params obj
    searchParams = {
        ...searchParams,
        PageSize: 10, 
        IsOnlyGetQuestionsWithOptions: true    
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
    
    const url = queryString ? `/api/v1/questions?${queryString}` : `/api/v1/questions`
    
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


export const getQuestionById = async (id: number) => {

    try {
        const response = await axiosInstance.get(`/api/v1/questions/${id}`, {
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
