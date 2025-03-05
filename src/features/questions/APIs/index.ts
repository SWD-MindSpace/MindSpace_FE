// Create functions to call APIs from BE
import axios from 'axios';

const baseUrlQuestion = 'https://localhost:7096/api/v1/questions'

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
    
    const url = queryString ? `${baseUrlQuestion}?${queryString}` : `${baseUrlQuestion}`
    
    try {
        // call API
        const response = await axios.get(url)

        const questionData = response?.data

        return {status: 'success', data: questionData}
            
    } catch (error) {
        console.log(error)
        
        return {status: 'error', error: 'Xảy ra lỗi'}
    }
}

export const getQuestionById = async (id: number) => {

    const url = `${baseUrlQuestion}/${id}`

    try {
        // call API
        const response = await axios.get(url)

        console.log(response)

        const question = response?.data

        return {status: 'success', data: question}
            
    } catch (error) {
        console.log(error)
        
        return {status: 'error', error: 'Xảy ra lỗi'}
    }
}
