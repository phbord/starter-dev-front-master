'use strict';

class Input {
    private inputFileCls: string        = 'input-file-custom';
    private labelInputFileCls: string   = 'label-input-file-custom';
    private inputValidCls: string       = '.input-group-valid input';
    private labelValidCls: string       = '.input-group-valid label';

    public constructor() {}

    public setFileNameInLabelInputFileCustom(): void {
        if (document.querySelectorAll(`.${this.inputFileCls}`)[0] 
            && document.querySelectorAll(`.${this.labelInputFileCls}`)[0]) {
            let inputFileElt = document.querySelectorAll(`.${this.inputFileCls}`);

            for (let i = 0; i < inputFileElt.length; i++) {
                if (inputFileElt[i].nextElementSibling.classList.contains(this.labelInputFileCls)) {
                    let labelInputFileElt = inputFileElt[i].nextElementSibling;

                    this.changeFileNameInLabelInputFileCustom(inputFileElt[i], labelInputFileElt);
                }
            }
        }
    }

    private changeFileNameInLabelInputFileCustom(input: any, label: any) {
        input.addEventListener('change', function(e: any) {
            let filename = input.files[0].name;

            label.querySelector('span').textContent = filename;
        });
    }

    public setInputLabelValid(): void {
        if (document.querySelectorAll(this.labelValidCls)[0]
            && document.querySelectorAll(this.inputValidCls)[0]) {
            let labelElt = document.querySelectorAll(this.labelValidCls);
            let inputElt = document.querySelectorAll(this.inputValidCls);

            for (let i = 0; i < labelElt.length; i++) {
                if (labelElt[i].getAttribute('for') 
                    && inputElt[i].getAttribute('id') 
                    && labelElt[i].getAttribute('for') === inputElt[i].getAttribute('id')) {
                    let commonId    = labelElt[i].getAttribute('for');
                    let inputEltId  = document.getElementById(commonId);

                    inputEltId.addEventListener('focusout', function (e) {
                        let inputVal = (<HTMLInputElement>inputEltId).value;

                        if (inputVal && inputVal != '') {
                            labelElt[i].classList.add('label-valid--active');
                        }
                        else {
                            labelElt[i].classList.remove('label-valid--active');
                        }
                    });
                }
            }
        }
    }
}