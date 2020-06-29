export class ApiConfig {
    static baseUrl: string = 'http://aruceryapiphase1-env.eba-xvk4wrjm.us-east-2.elasticbeanstalk.com';
    static storeDashboardURL: string = `${ApiConfig.baseUrl}/orders/stores`; // GET
    static registerURL: string = `${ApiConfig.baseUrl}/auth/store/signup`; // POST
    static storeRegisterURL: string = `${ApiConfig.baseUrl}/auth/store/register`; // POST
    static loginURL: string = `${ApiConfig.baseUrl}/auth/login`; // POST
    static logoutURL: string = `${ApiConfig.baseUrl}/auth/logout`; // GET
    static tokenURL: string = `${ApiConfig.baseUrl}/auth/sso/login`; // GET
    static storeDetailsURL: string = `${ApiConfig.baseUrl}/stores/findStoreByStoreId`; // GET
    static storeValidateURL: string = `${ApiConfig.baseUrl}/stores/validate`; // GET
    static adminStoresURL: string = `${ApiConfig.baseUrl}/stores/findStoreByAdminId`; // GET
    static orderStatusURL: string = `${ApiConfig.baseUrl}/orders`; // PUT
    static orderDetailsURL: string = `${ApiConfig.baseUrl}/orders`; // GET
    static addProductURL: string = `${ApiConfig.baseUrl}/store/admin/create/product`; // POST
    static updateProductURL: string = `${ApiConfig.baseUrl}/store/admin/update/product`; // PUT
    static deleteProductURL: string = `${ApiConfig.baseUrl}/store/admin/delete/product`; // GET
    static storeMenuURL: string = `${ApiConfig.baseUrl}/stores/findProductsByStoreId`; // GET

    static userDetailsURL: string = `${ApiConfig.baseUrl}/user/me`; // GET, POST
    static userUpdateURL: string = `${ApiConfig.baseUrl}/user/update`; // POST

    static revenueURL: string = `${ApiConfig.baseUrl}/orders/revenueReport/stores`; // GET
}
