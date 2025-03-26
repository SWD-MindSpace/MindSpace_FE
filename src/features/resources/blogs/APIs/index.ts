// Create functions to call APIs from BE
import axiosInstance from '@/lib/interceptor';


export type BlogQueryParams = {
    Type?: string,
    IsActive?: boolean,
    SchoolManagerId?: string,
    SpecializationId?: number,
    SearchTitle?: number,
    PageIndex?: number,
    PageSize?: number
}

export const getAllBlogs = async (searchParams: BlogQueryParams) => {

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

    const url = queryString ? `/api/v1/resources/blogs?${queryString}` : `/api/v1/resources/blogs`

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


export const getBlogById = async (id: number) => {

    try {
        const response = await axiosInstance.get(`/api/v1/resources/blogs/${id}`, {
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


export const createManualForm = async (blogDraftId: string) => {

    try {

        const response = await axiosInstance.post('/api/v1/resources/blogs', { blogDraftId: blogDraftId}, {
            headers: {
                requiresAuth: true
            }
        })

        const locationUrl = response.headers.get('Location')

        console.log('locationUrl: ', locationUrl)

        if (!locationUrl) throw new Error('Location header not found')

        const blogResponseId = locationUrl.split('/').pop()

        if (!blogResponseId) throw new Error('Invalid response location')

        return { status: 'success', data: blogResponseId }

    } catch (error) {
        console.log(error)

        const errorMessage = typeof (error) === 'string' ? error.message : 'Xảy ra lỗi'

        return { status: 'error', error: errorMessage }
    }

}



// ==================================
//             BLOG DRAFT
// ==================================

export const getBlogDraftById = async (id: string) => {

    try {
        const response = await axiosInstance.get(`/api/v1/blog-draft/${id}`, {
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


export const updateBlogDraft = async (updatedForm: BlogCreateForm) => {

    try {
        await axiosInstance.post(`/api/v1/blog-draft`, updatedForm,
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


export const deleteBlogDraftById = async (id: number) => {

    try {
        await axiosInstance.delete(`/api/v1/blog-draft/${id}`, {
            headers: {
                requiresAuth: true
            }
        })

    } catch (error) {
        console.log(error)

        return { status: 'error', error: 'Xảy ra lỗi' }
    }

}
