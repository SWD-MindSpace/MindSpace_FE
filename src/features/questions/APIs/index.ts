// // Create functions to call APIs from BE
// import axios from 'axios';

// const baseUrlQuestion = 'https://localhost:7096/api/v1/questions'

// export type QuestionQueryParams = {
//     // Title?: string,
//     // TestCode?: string,
//     // TargetUser?: string,
//     // MinPrice?: number,
//     // MaxPrice?: number,
//     // TestCategoryId?: number,
//     // SpecializationId?: number,
//     // Sort?: string,
//     // PageIndex?: number,
//     // PageSize?: number
// }

// export const getAllTests = async (searchParams: QuestionQueryParams) => {
    
//     // append PageSize to params obj
//     searchParams = {
//         ...searchParams,
//         PageSize: 12    
//     }
    
//     // Convert to type Record<string,string> -> Convert to a query string
//     const queryString = new URLSearchParams(
//         Object.entries(searchParams).reduce((acc, [key, value]) => {
//             if (value !== undefined) {
//                 acc[key] = value.toString();
//             }
//             return acc;
//         }, {} as Record<string, string>)
//     ).toString()
    
//     const url = queryString ? `${baseUrlQuestion}?${queryString}` : `${baseUrlQuestion}`
    
//     try {
//         // call API
//         const response = await axios.get(url)

//         // Luu y: nen console.log(response) de xem trc khi gan data cho testData
//         const testData = response?.data

//         return {status: 'success', data: testData}
            
//     } catch (error) {
//         console.log(error)
        
//         return {status: 'error', error: 'Xảy ra lỗi'}
//     }
// }
