'use strict';

class DateTime {
    private today: any          = new Date();
    private dayNow: any         = this.today.getDate();
    private monthNow: any       = this.today.getMonth()+1;
    private yearNow: number     = this.today.getFullYear();

    public constructor() {}

    public getDayNow(): any {
        if (this.dayNow <= 9) {
            return this.dayNow = `0${this.dayNow}`;
        }
        return this.dayNow;
    }

    public getMonthNow(): any {
        if (this.dayNow <= 9) {
            return this.monthNow = `0${this.monthNow}`;
        }
        return this.monthNow;
    }

    public getDateNow(lang: string, separatorArg: string = '-'): string {
        const dayNow        = this.getDayNow();
        const monthNow      = this.getMonthNow();
        const yearNow       = this.yearNow;
        let dateNow;
        let separator       = separatorArg;

        switch (lang) {
            case 'en':
                dateNow = `${yearNow}${separator}${monthNow}${separator}${dayNow}`;
                break;
            case 'fr':
                dateNow = `${dayNow}${separator}${monthNow}${separator}${yearNow}`;
                break;
            default:
                dateNow = `${yearNow}${separator}${monthNow}${separator}${dayNow}`;
                break;
        }
        return dateNow;
    }
}