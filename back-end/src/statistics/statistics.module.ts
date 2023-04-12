import { Module } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { StatisticsController } from './statistics.controller'
import { StatisticsService } from './statistics.service'

@Module({
	controllers: [StatisticsController],
	providers: [StatisticsService, UserService]
})
export class StatisticsModule {}
