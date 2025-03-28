// Create functions to call APIs from BE
import axios from 'axios';

const baseUrlTest = 'https://localhost:7096/api/v1/tests'
const baseUrlQuestion = 'https://localhost:7096/api/v1/questions'

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

        return {status: 'success', data: testData}
            
    } catch (error) {
        console.log(error)
        
        return {status: 'error', error: 'Xảy ra lỗi'}
    }
}
