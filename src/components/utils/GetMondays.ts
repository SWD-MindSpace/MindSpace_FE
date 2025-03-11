// utils/getMondays.ts
export const getUpcomingMondays = (): Date[] => {
    const mondays: Date[] = [];
    let currentDate = new Date();

    // Tìm thứ Hai đầu tiên
    while (currentDate.getDay() !== 1) {
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Lấy danh sách 4 tuần kế tiếp
    for (let i = 0; i < 4; i++) {
        mondays.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 7);
    }

    return mondays;
};
