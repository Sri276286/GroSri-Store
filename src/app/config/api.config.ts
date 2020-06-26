export class ApiConfig {
    static baseUrl: string = 'http://aruceryapiphase1-env.eba-xvk4wrjm.us-east-2.elasticbeanstalk.com';
    static storeDashboardURL: string = `${ApiConfig.baseUrl}/orders/stores/1`; // GET
    static registerURL: string = `${ApiConfig.baseUrl}/auth/store/signup`; // POST
    static loginURL: string = `${ApiConfig.baseUrl}/auth/login`; // POST
    static logoutURL: string = `${ApiConfig.baseUrl}/auth/logout`; // GET
    static storeDetailsURL: string = `${ApiConfig.baseUrl}/stores/findStoreByStoreId`; // GET
    static adminStoresURL: string = `${ApiConfig.baseUrl}/stores/findStoreByAdminId`; // GET
    static orderStatusURL: string = `${ApiConfig.baseUrl}/orders`; // PUT
    static orderDetailsURL: string = `${ApiConfig.baseUrl}/orders`; // GET
    static addProductURL: string = `${ApiConfig.baseUrl}/stores/create/product`; // POST
    static storeMenuURL: string = `${ApiConfig.baseUrl}/stores/findProductsByStoreId/1`; // GET
}
