// Create functions to call APIs from BE
import axios from 'axios';
import axiosInstance from '@/lib/interceptor';

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

    const url = queryString ? `/api/v1/resources/articles?${queryString}` : `/api/v1/resources/articles`

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


export const getArticleById = async (id: number) => {

    try {
        const response = await axiosInstance.get(`/api/v1/resources/articles/${id}`, {
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

export const createNewArticle = async (newArticle: any) => {

    try {
        // call API
        const response = await axiosInstance.post('/api/v1/resources/articles', newArticle, {
            headers: {
                requiresAuth: true
            }
        })

        const locationUrl = response.headers.get('Location')

        if (!locationUrl) throw new Error('Location header not found')

        const articleResponseId = locationUrl.split('/').pop()

        if (!articleResponseId) throw new Error('Invalid response location')

        return { status: 'success', data: articleResponseId }

    } catch (error) {
        console.log(error)

        return { status: 'error', error: 'Xảy ra lỗi' }
    }
}

