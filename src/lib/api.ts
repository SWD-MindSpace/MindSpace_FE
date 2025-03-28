import axios from "axios"

// Province Open API
export const getProvinces = async () => {
    const response = await axios.get('https://provinces.open-api.vn/api?depth=2')
    return response.data
}

export const getDistricts = async (provinceId: number) => {
    const response = await axios.get(`https://provinces.open-api.vn/api/p/${provinceId}?depth=2`)
    return response.data.districts
}

export const getWards = async (districtId: number) => {
    const response = await axios.get(`https://provinces.open-api.vn/api/d/${districtId}?depth=2`)
    return response.data.wards
}


