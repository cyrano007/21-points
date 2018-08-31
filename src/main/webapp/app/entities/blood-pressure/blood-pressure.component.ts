import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBloodPressure } from 'app/shared/model/blood-pressure.model';
import { Principal } from 'app/core';
import { BloodPressureService } from './blood-pressure.service';

@Component({
    selector: 'jhi-blood-pressure',
    templateUrl: './blood-pressure.component.html'
})
export class BloodPressureComponent implements OnInit, OnDestroy {
    bloodPressures: IBloodPressure[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private bloodPressureService: BloodPressureService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.bloodPressureService.query().subscribe(
            (res: HttpResponse<IBloodPressure[]>) => {
                this.bloodPressures = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBloodPressures();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBloodPressure) {
        return item.id;
    }

    registerChangeInBloodPressures() {
        this.eventSubscriber = this.eventManager.subscribe('bloodPressureListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
