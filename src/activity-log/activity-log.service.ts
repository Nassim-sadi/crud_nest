// activity-log.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLog } from './entities/activity-log.entity';
import { User } from 'src/users/entities/user.entity';
import { UAParser } from 'ua-parser-js';

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLog)
    private readonly activityLogRepository: Repository<ActivityLog>,
  ) {}

  async log(params: {
    user: User;
    model: string;
    action: string;
    data?: Record<string, any>;
    userAgent?: string; // 👈 we pass user-agent string
  }) {
    const parser = new UAParser(params.userAgent || '');
    const browser = parser.getBrowser().name || 'Unknown';
    const platform = parser.getOS().name || 'Unknown';
    const device = parser.getDevice().type || 'Desktop';

    const history = this.activityLogRepository.create({
      user: { id: params.user.id },
      model: params.model,
      action: params.action,
      data: params.data,
      platform,
      browser,
      device,
    });

    this.activityLogRepository.save(history).catch((err) => console.error(err));
  }

  async findAll() {
    return this.activityLogRepository.find({ relations: ['user'] });
  }

  async findByUser(userId: number) {
    return this.activityLogRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}
