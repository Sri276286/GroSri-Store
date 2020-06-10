import { Component } from '@angular/core';

@Component({
    templateUrl: 'business.page.html',
    styleUrls: ['business.page.scss']
})
export class BusinessPage {
    revenues = [];

    ngOnInit() {
        this.revenues = [{
            'day_type': 'today',
            'amount': '1340',
            'no_of_orders': 9
        }, {
            'day_type': 'yesterday',
            'amount': '1260',
            'no_of_orders': 8
        }, {
            'day_type': 'weekly',
            'amount': '11600',
            'no_of_orders': 32
        }];
    }
}
