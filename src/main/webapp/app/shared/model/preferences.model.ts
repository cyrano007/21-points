export const enum Units {
    KG = 'KG',
    LB = 'LB'
}

export interface IPreferences {
    id?: number;
    weekly_goal?: number;
    weight_unit?: Units;
}

export class Preferences implements IPreferences {
    constructor(public id?: number, public weekly_goal?: number, public weight_unit?: Units) {}
}
