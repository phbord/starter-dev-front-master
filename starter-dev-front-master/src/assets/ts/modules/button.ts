'use strict';


class Button {
    public constructor() {}

    public toggleDisabledSubmitButtonByCheckbox(id: string): any {
        let cbId = `input[data-id="${id}"][required]`;

        if (document.getElementById(id)
            && document.querySelectorAll(cbId)[0]) {
            let cbELt       = document.querySelectorAll(`${cbId}`);
            let cbNb        = cbELt.length;
            let cbLast      = cbNb - 1;
            let submitElt   = <HTMLInputElement> document.getElementById(id);
            let submitShow: boolean = false;

            //On LOAD
            if (submitElt.disabled === false) {
                submitElt.disabled = true;
            }

            //On CHANGE
            for (let i = 0; i < cbNb; i++) {
                cbELt[i].addEventListener('change', function(e) {
                    let checkbox = e.target as HTMLInputElement;

                    if (!checkbox.checked) {
                        submitShow = false;
                        submitElt.disabled = true;
                        return false;
                    }

                    for (let i = 0; i < cbNb; i++) {
                        if ((<any>cbELt[i]).checked) {
                            submitShow = true;
                        }
                        else {
                            submitShow = false;
                            submitElt.disabled = true;
                            return false;
                        }
                        
                        if (i === cbLast) { 
                            if (submitShow === true) {
                                submitElt.disabled = false;
                            }
                            else {
                                submitElt.disabled = true;
                            }
                            return false;
                        }
                    }
                });
            }
        }
    }

    public useTooltip(): void {
        if (document.querySelectorAll('[data-toggle="tooltip"]')[0]) {
            (<any>$('[data-toggle="tooltip"]')).tooltip();
        }
    }
}