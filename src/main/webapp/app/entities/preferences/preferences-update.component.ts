import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPreferences } from 'app/shared/model/preferences.model';
import { PreferencesService } from './preferences.service';

@Component({
    selector: 'jhi-preferences-update',
    templateUrl: './preferences-update.component.html'
})
export class PreferencesUpdateComponent implements OnInit {
    private _preferences: IPreferences;
    isSaving: boolean;

    constructor(private preferencesService: PreferencesService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ preferences }) => {
            this.preferences = preferences;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.preferences.id !== undefined) {
            this.subscribeToSaveResponse(this.preferencesService.update(this.preferences));
        } else {
            this.subscribeToSaveResponse(this.preferencesService.create(this.preferences));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPreferences>>) {
        result.subscribe((res: HttpResponse<IPreferences>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get preferences() {
        return this._preferences;
    }

    set preferences(preferences: IPreferences) {
        this._preferences = preferences;
    }
}
