'use strict';

class DatePicker extends DateTime {
    public constructor() {
        super();
    }

    public getDateNow(lang: string, separatorArg: string = '-'): string {
        return super.getDateNow(lang, separatorArg);
    }

    public setDatepickerValue(): void {
        if (document.querySelectorAll('.date')[0] 
            && document.querySelectorAll('.date .datepicker')[0]) {
            const dateElt       = document.querySelectorAll('.date');

            for (let i = 0; i < dateElt.length; i++) {
                if (dateElt[i].querySelector('.datepicker')) {
                    const datepickerElt = dateElt[i].querySelector('.datepicker');

                    if (dateElt[i].getAttribute('data-date-language') 
                        && dateElt[i].getAttribute('data-date-language') != '') {
                        let dateNow = this.getDateNow(dateElt[i].getAttribute('data-date-language'));

                        datepickerElt.setAttribute('value', dateNow);
                    }
                }
            }
        }
    }
}