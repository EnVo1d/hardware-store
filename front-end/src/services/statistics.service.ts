import { TypeStatisticsResponse } from '@/types/statistics.interface'

import { instance } from '@/api/api.interceptor'

const STATISTICS = 'statistics'

export const StatisticsService = {
	async getMain() {
		return instance<TypeStatisticsResponse>({
			url: `${STATISTICS}/main`,
			method: 'GET'
		})
	}
}
