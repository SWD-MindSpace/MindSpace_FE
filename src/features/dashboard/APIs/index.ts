// Create functions to call APIs from BE
import { get } from '../../../lib/apiCaller';

const statisticsEndpoint = '/api/v1/statistics';

export type StatisticsQueryParams = {
    SchoolId?: number,
    StartDate?: string,
    EndDate?: string,
    Top?: number,
    GroupBy?: string,
}

export const getOverviewStatistics = async (searchParams: StatisticsQueryParams) => {
    return get(`${statisticsEndpoint}/count-overview-school-data`, searchParams)
}

export const getRecentTests = async (searchParams: StatisticsQueryParams) => {
    return get(`${statisticsEndpoint}/top-recent-tests`, searchParams)
}

export const getAppointmentStatistics = async (searchParams: StatisticsQueryParams) => {
    return get(`${statisticsEndpoint}/appointments`, searchParams)
}

export const getSupportingProgramStatistics = async (searchParams: StatisticsQueryParams) => {
    return get(`${statisticsEndpoint}/supporting-programs`, searchParams)
}

// admin dashboard apis
export const getOverviewSystemStatistics = async (searchParams: StatisticsQueryParams) => {
    return get(`${statisticsEndpoint}/overview-system-data`, searchParams)
}

export const getRevenueTimeStatistics = async (searchParams: StatisticsQueryParams) => {
    return get(`${statisticsEndpoint}/revenue-time-analysis`, searchParams)
}

export const getTopPsychologistsRevenue = async (searchParams: StatisticsQueryParams) => {
    return get(`${statisticsEndpoint}/top-psychologists`, searchParams)
}

export const getRevenueBySpecStatistics = async (searchParams: StatisticsQueryParams) => {
    return get(`${statisticsEndpoint}/revenue-spec-analysis`, searchParams)
}

export const getTopSchools = async (searchParams: StatisticsQueryParams) => {
    return get(`${statisticsEndpoint}/top-schools`, searchParams)
}