'use client'
import { ROLE_ID, ROLE_NAME } from '@/features/accounts/common/constants';
import AdminDashboard from '@/features/dashboard/admin/AdminDashboard';
import SchoolManagerDashboard from '@/features/dashboard/school-manager/SchoolManagerDashboard';


export default function ManageTimeslots() {
    const currentUser = localStorage.getItem('userInfo');
    if (currentUser) {
        const userInfo = JSON.parse(currentUser);
        const userRole = currentUser ? JSON.parse(currentUser).role : null;
        if (userRole == ROLE_NAME.ADMIN) {
            return <AdminDashboard />
        } else if (userRole == ROLE_NAME.SCHOOL_MANAGER) {
            return <SchoolManagerDashboard />
        }
    }

}