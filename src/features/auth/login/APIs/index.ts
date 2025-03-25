import axiosInstance from '@/lib/interceptor';
import { LoginSchema } from './../schemas/loginSchema';
import { Base64 } from 'js-base64';


export async function login({ email, password }: LoginSchema) {
    
    const payload = {
        email,
        password
    }

    try {
        // call API
        const response = await axiosInstance.post('/api/v1/identities/login', payload, {
            headers: {
                requiresAuth: false
            }
        }) 

        const { id_token, access_token, refresh_token } = response.data

        // verify user's role
        const decodedIdToken = Base64.decode(id_token.split('.')[1])
        const { role, sub, schoolId } = JSON.parse(decodedIdToken)

        // save token to local storage & return status
        if (role === 'Admin' || role === 'Psychologist' || role === 'SchoolManager') {

            const userInfo = {
                role,
                userId: sub,
                schoolId: schoolId
            }

            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            localStorage.setItem('access_token', access_token)
            localStorage.setItem('refresh_token', refresh_token)
            const testDraft = localStorage.getItem('testDraft')
            const blogDraft = localStorage.getItem('blogDraft')
            if (testDraft) localStorage.removeItem('testDraft')
            if (blogDraft) localStorage.removeItem('blogDraft')

            return { status: 'success', data: role }

        } else return { status: 'error', error: 'Bạn không có quyền truy cập vào hệ thống này' }


    } catch (error) {
        console.log(error)

        // Wrong email or password
        if (error.response?.data.statusCode === 400) return { status: 'error', error: 'Sai thông tin đăng nhập' }

        // Other errors
        return { status: 'error', error: 'Xảy ra lỗi trong quá trình đăng nhập' }
    }
}
