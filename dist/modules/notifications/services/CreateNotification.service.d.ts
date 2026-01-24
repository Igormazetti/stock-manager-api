export interface NotificationPayloadData {
    companyId: string;
    entity: string;
    description: string;
    productName?: string;
}
export default class CreateNotificationService {
    private notificationsRepository;
    constructor();
    execute({ companyId, entity, description, productName, }: NotificationPayloadData): Promise<{
        status: number;
        errorMessage?: undefined;
    } | {
        status: number;
        errorMessage: string;
    }>;
}
