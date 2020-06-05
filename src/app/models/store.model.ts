export class OrderResponse {
    code: number;
    status: string;
    orders: StoreOrder[];
}

export class StoreOrder {
    id: string;
    orderDate: string;
    estimatedDate: string;
    billSubTotal: string;
    billTax: string;
    billTotal:string;
    orderStatus: string;
    totalNumOfProducts: string;
    orderProducts: OrderProducts[];
    orderAddress: OrderAddress[];
    customer: Customer;
    store: Store;
}

export class OrderProducts{

}

export class OrderAddress{

}

export class Customer{
    id: string;
    name: string;
    mobileNumber: string;
    billSubTotal: string;
}

export class Store{

    id: string;
    storeName: string;
    pincode: string;
    billSubTotal: string;
    billTax: string;
    billTotal:string;
    orderStatus: string;
    totalNumOfProducts: string;
}
