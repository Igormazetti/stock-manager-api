import NotificationsRepository from '../repository/NotificationsRepository';

export interface NotificationPayloadData {
  companyId: string;
  entity: string;
  description: string;
  productName?: string;
}

export default class CreateNotificationService {
  private notificationsRepository: NotificationsRepository;

  constructor() {
    this.notificationsRepository = new NotificationsRepository();
  }

  public async execute({
    companyId,
    entity,
    description,
    productName,
  }: NotificationPayloadData) {
    try {
      await this.notificationsRepository.createNotification({
        companyId,
        entity,
        description,
        productName,
      });

      return {
        status: 201,
      };
    } catch (err) {
      return {
        status: 400,
        errorMessage: 'Falha ao criar notificação',
      };
    }
  }
}
