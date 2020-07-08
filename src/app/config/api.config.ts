export class ApiConfig {
    static baseUrl: string = 'http://aruceryapiphase1-env.eba-xvk4wrjm.us-east-2.elasticbeanstalk.com';
    static storeDashboardURL: string = `${ApiConfig.baseUrl}/orders/stores`; // GET
    static registerURL: string = `${ApiConfig.baseUrl}/auth/store/signup`; // POST
    static storeRegisterURL: string = `${ApiConfig.baseUrl}/store/admin/create/store`; // POST
    static loginURL: string = `${ApiConfig.baseUrl}/auth/login`; // POST
    static logoutURL: string = `${ApiConfig.baseUrl}/auth/logout`; // GET
    static tokenURL: string = `${ApiConfig.baseUrl}/auth/sso/login`; // GET

    static storeUpdateURL: string = `${ApiConfig.baseUrl}/store/admin/update/store`;
    static storesByAdminURL: string = `${ApiConfig.baseUrl}/stores/admin/admin/getAll`; // GET
    static storeDetailsURL: string = `${ApiConfig.baseUrl}/stores`; // GET
    static storeValidateURL: string = `${ApiConfig.baseUrl}/stores/verify`; // GET
    static adminStoresURL: string = `${ApiConfig.baseUrl}/stores/findStoreByAdminId`; // GET
    static newOrderURL: string = `${ApiConfig.baseUrl}/stores/new`;
    static orderStatusURL: string = `${ApiConfig.baseUrl}/orders`; // PUT
    static orderDetailsURL: string = `${ApiConfig.baseUrl}/orders`; // GET

    static addCategoryURL: string = `${ApiConfig.baseUrl}/store/admin/create/category`; // POST
    static addProductURL: string = `${ApiConfig.baseUrl}/store/admin/create/product`; // POST
    static updateProductURL: string = `${ApiConfig.baseUrl}/store/admin/update/product`; // PUT
    static deleteProductURL: string = `${ApiConfig.baseUrl}/store/admin/delete/product`; // GET
    static storeMenuURL: string = `${ApiConfig.baseUrl}/stores/getProductsByStoreId`; // GET

    static storeAdminURL: string = `${ApiConfig.baseUrl}/store/admin/getuser`; // GET
    static userDetailsURL: string = `${ApiConfig.baseUrl}/user/me`; // GET, POST
    static userUpdateURL: string = `${ApiConfig.baseUrl}/user/update`; // POST

    static revenueURL: string = `${ApiConfig.baseUrl}/orders/revenueReport/stores`; // GET
}
