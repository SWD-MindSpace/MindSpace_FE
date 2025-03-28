// Create functions to call APIs from BE
import { get } from '../../../lib/apiCaller';

const statisticsEndpoint = '/api/v1/statistics';

export type StatisticsQueryParams = {
    SchoolId?: number,
    StartDate?: string,
    EndDate?: string,
    Top?: number,
}

export const getOverviewStatistics = async (searchParams: StatisticsQueryParams) => {
    return get(`${statisticsEndpoint}/count-overview-data`, searchParams)
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