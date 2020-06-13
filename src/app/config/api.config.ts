export class ApiConfig {
    static baseUrl: string = 'http://aruceryapiphase1-env.eba-xvk4wrjm.us-east-2.elasticbeanstalk.com';
    static storeDashboardURL: string = `${ApiConfig.baseUrl}/orders/stores/1`; // GET
    static registerURL: string = `${ApiConfig.baseUrl}/auth/store/signup`; // POST
    static loginURL: string = `${ApiConfig.baseUrl}/auth/login`; // POST
    static storeDetailsURL: string = `${ApiConfig.baseUrl}/stores/findStoreByStoreId`;
    static adminStoresURL: string = `${ApiConfig.baseUrl}/stores/findStoreByAdminId`;
}
