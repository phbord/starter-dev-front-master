'use strict';

class FormControl {
    private zipCodeCls: string      = 'form-control--zip-code';
    private zipCodeReg: any         = /^\d{5}$|^\d{5}-\d{4}$/;
    private zipCodeMsg: string      = "Invalid input value (only 6 numbers).";
    private emailCls: string        = 'form-control--email';
    private emailReg: any           = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    private emailMsg: string        = "Invalid input value. (only an emain syntax)";
    private phoneCls: string        = 'form-control--phone';
    private phoneReg: any           = /^((\+)33|0)[1-9](\d{2}){4}$/;
    private phoneMsg: string        = "Invalid input value (only a phone number syntax).";
    private textareaCls: string     = 'form-control--textarea';
    private textareaReg: any        = /[A-Za-z]{3}/;
    private textareaMsg: string     = "Invalid input value (3 characters minimum).";
    private cvvCls: string          = 'form-control--cvv';
    private cvvReg: any             = /^[0-9]{3}$/;
    private cvvMsg: string          = "Invalid input value (only 3 numbers).";
    private cbCls: string           = 'form-control--cb';
    private cbReg: any              = /^[0-9]{16}$/;
    private cbMsg: string           = "Invalid input value (only 3 numbers).";
    private cpamCls: string         = 'form-control--cpam';
    private cpamReg: any            = /^[0-9]{15}$/;
    private cpamMsg: string         = "Invalid input value (only 15 numbers).";

    public constructor() {}

    public inputControl(controlCls: string) {
        if (document.querySelectorAll(`.${controlCls}`)[0]) {
            let inputElt = document.querySelectorAll(`.${controlCls}`);

            for (let i = 0; i < inputElt.length; i++) {
                let pattern: any;
                let errorMsg: string;
                let div = document.createElement('div');

                //ON LOAD
                switch (controlCls) {
                    case this.zipCodeCls:
                        pattern = this.zipCodeReg;
                        errorMsg = this.zipCodeMsg;
                        break;
                    case this.emailCls:
                        pattern = this.emailReg;
                        errorMsg = this.emailMsg;
                        break;
                    case this.phoneCls:
                        pattern = this.phoneReg;
                        errorMsg = this.phoneMsg;
                        break;
                    case this.textareaCls:
                        pattern = this.textareaReg;
                        errorMsg = this.textareaMsg;
                        break;
                    case this.cvvCls:
                        pattern = this.cvvReg;
                        errorMsg = this.cvvMsg;
                        break;
                    case this.cbCls:
                        pattern = this.cbReg;
                        errorMsg = this.cbMsg;
                        break;
                    case this.cpamCls:
                        pattern = this.cpamReg;
                        errorMsg = this.cpamMsg;
                        break;
                }

                this.setRegexInPatternAttribut(inputElt[i], pattern);
                this.setMessageInDataAttribut(inputElt[i], errorMsg);
                
                div.setAttribute('class', 'validate-error-msg hidden alert alert-danger mt-2');
                div.textContent = errorMsg;
                inputElt[i].closest('.form-group').appendChild(div);

                //FOCUS OUT
                inputElt[i].addEventListener('focusout', function (e) {
                    let inputThis: Element                      = inputElt[i];
                    let inputVal: string | number | undefined   = (<HTMLInputElement>inputThis).value;
                    let inputBool: boolean                      = false;

                    inputBool = pattern.test((<any>inputVal));

                    //ERROR message
                    if (inputBool === false) {
                        inputThis.closest('.form-group').querySelector('.validate-error-msg').classList.remove('hidden');
                    }
                    else if (inputBool === true && inputThis.closest('.form-group').querySelector('.validate-error-msg')) {
                        inputThis.closest('.form-group').querySelector('.validate-error-msg').classList.add('hidden');
                    }
                });
            }
        }
    }

    private setRegexInPatternAttribut(elt: any, reg: any) {
        if (!elt.getAttribute('pattern') || elt.getAttribute('pattern') == '') {
            elt.setAttribute('pattern', reg);
        }
    }

    private setMessageInDataAttribut(elt: any, reg: any) {
        if (!elt.getAttribute('data-message') || elt.getAttribute('data-message') == '') {
            elt.setAttribute('data-message', reg);
        }
    }
}