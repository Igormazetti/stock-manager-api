import NotificationsRepository from '../repository/NotificationsRepository';

export default class MarkNotificationAsReadService {
  private notificationsRepository: NotificationsRepository;

  constructor() {
    this.notificationsRepository = new NotificationsRepository();
  }

  public async execute(notificationId: string) {
    try {
      const notification = await this.notificationsRepository.getNotificationById(notificationId);

      if (!notification) {
        return {
          status: 404,
          errorMessage: 'Notificação não encontrada',
        };
      }

      await this.notificationsRepository.updateNotificationRead(notificationId, true);

      return {
        status: 200,
      };
    } catch (err) {
      return {
        status: 400,
        errorMessage: 'Falha ao atualizar notificação',
      };
    }
  }
}
