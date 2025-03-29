export const ACCOUNT_LIST_COLUMNS = [
    { name: "ID", uid: "id" },
    { name: "EMAIL", uid: "email" },
    { name: "HỌ TÊN", uid: "fullName" },
    { name: "SĐT", uid: "phoneNumber" },
    { name: "TÊN NGƯỜI DÙNG", uid: "userName" },
    { name: "NGÀY SINH", uid: "dateOfBirth" },
    { name: "TRẠNG THÁI", uid: "status" },
    { name: "THÊM", uid: "actions" },
];

export const ACCOUNT_CENTER_COLUMNS = [
    'id',
    'testCode',
    'questionCount',
    'targetUser',
    'price',
    'actions'
]

export const ROLE_ID = {
    STUDENT: 1,
    ADMIN: 2,
    PSYCHOLOGIST: 3,
    SCHOOL_MANAGER: 4,
    PARENT: 5
}

export const ROLE_NAME = {
    STUDENT: "Student",
    ADMIN: "Admin",
    PSYCHOLOGIST: "Psychologist",
    SCHOOL_MANAGER: "SchoolManager",
    PARENT: "Parent"
}

