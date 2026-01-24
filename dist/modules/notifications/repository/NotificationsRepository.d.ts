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
    private db;
    constructor();
    createNotification({ companyId, entity, description, productName, }: NotificationPayload): Promise<void>;
    getNotificationsByCompany(companyId: string, skip?: number, take?: number): Promise<{
        notifications: any;
        totalCount: any;
    }>;
    updateNotificationRead(notificationId: string, readed: boolean): Promise<void>;
    getNotificationById(notificationId: string): Promise<any>;
}
