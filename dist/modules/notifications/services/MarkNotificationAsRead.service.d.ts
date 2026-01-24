export default class MarkNotificationAsReadService {
    private notificationsRepository;
    constructor();
    execute(notificationId: string): Promise<{
        status: number;
        errorMessage: string;
    } | {
        status: number;
        errorMessage?: undefined;
    }>;
}
