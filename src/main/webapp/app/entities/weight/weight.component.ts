import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IWeight } from 'app/shared/model/weight.model';
import { Principal } from 'app/core';
import { WeightService } from './weight.service';

@Component({
    selector: 'jhi-weight',
    templateUrl: './weight.component.html'
})
export class WeightComponent implements OnInit, OnDestroy {
    weights: IWeight[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private weightService: WeightService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.weightService.query().subscribe(
            (res: HttpResponse<IWeight[]>) => {
                this.weights = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInWeights();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IWeight) {
        return item.id;
    }

    registerChangeInWeights() {
        this.eventSubscriber = this.eventManager.subscribe('weightListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
