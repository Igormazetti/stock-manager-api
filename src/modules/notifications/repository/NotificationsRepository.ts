import { prisma } from '../../../database/prismaClient';

export interface NotificationPayload {
  companyId: string;
  entity: string;
  description: string;
  productName?: string;
}

export interface NotificationUpdate {
  readed: boolean;
}

export default class NotificationsRepository {
  private db: typeof prisma.notification;

  constructor() {
    this.db = prisma.notification;
  }

  public async createNotification({
    companyId,
    entity,
    description,
    productName,
  }: NotificationPayload): Promise<void> {
    await this.db.create({
      data: {
        companyId,
        entity,
        description,
        productName,
      },
    });
  }

  public async getNotificationsByCompany(
    companyId: string,
    skip: number = 0,
    take: number = 50,
  ) {
    const notifications = await this.db.findMany({
      where: {
        companyId,
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalCount = await this.db.count({
      where: {
        companyId,
      },
    });

    return { notifications, totalCount };
  }

  public async updateNotificationRead(
    notificationId: string,
    readed: boolean,
  ): Promise<void> {
    await this.db.update({
      where: {
        id: notificationId,
      },
      data: {
        readed,
      },
    });
  }

  public async getNotificationById(notificationId: string) {
    return this.db.findUnique({
      where: {
        id: notificationId,
      },
    });
  }
}
