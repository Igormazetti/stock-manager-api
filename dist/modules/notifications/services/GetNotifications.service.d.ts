export default class GetNotificationsService {
    private notificationsRepository;
    constructor();
    execute(companyId: string, skip?: number, take?: number): Promise<{
        status: number;
        data: any;
        totalCount: any;
        errorMessage?: undefined;
    } | {
        status: number;
        errorMessage: string;
        data?: undefined;
        totalCount?: undefined;
    }>;
}
