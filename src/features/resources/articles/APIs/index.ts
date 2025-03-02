// Create functions to call APIs from BE
import axios from 'axios';

const baseUrlArticle = 'https://localhost:7096/api/v1/resources/articles'

export type ArticleQueryParams = {
    Type?: string,
    IsActive?: boolean,
    SchoolManagerId?: string,
    SpecializationId?: number,
    SearchTitle?: number,
    PageIndex?: number,
    PageSize?: number
}

export const getAllArticles = async (searchParams: ArticleQueryParams) => {

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

    const url = queryString ? `${baseUrlArticle}?${queryString}` : `${baseUrlArticle}`

    try {
        // call API
        const response = await axios.get(url)

        const articleData = response?.data

        return { status: 'success', data: articleData }

    } catch (error) {
        console.log(error)

        return { status: 'error', error: 'Xảy ra lỗi' }
    }
}
