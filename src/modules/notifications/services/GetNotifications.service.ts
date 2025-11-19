import NotificationsRepository from '../repository/NotificationsRepository';

export default class GetNotificationsService {
  private notificationsRepository: NotificationsRepository;

  constructor() {
    this.notificationsRepository = new NotificationsRepository();
  }

  public async execute(companyId: string, skip: number = 0, take: number = 50) {
    try {
      const { notifications, totalCount } = await this.notificationsRepository.getNotificationsByCompany(
        companyId,
        skip,
        take,
      );

      return {
        status: 200,
        data: notifications,
        totalCount,
      };
    } catch (err) {
      return {
        status: 400,
        errorMessage: 'Falha ao buscar notificações',
      };
    }
  }
}
