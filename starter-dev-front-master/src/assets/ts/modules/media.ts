'use strict';

class Media {
    private videoCls: string = '.video-custom';

    public constructor() {}

    public setHeightVideo(): void {
        if (document.querySelectorAll(this.videoCls)[0]) {
            let videoElt = document.querySelectorAll(this.videoCls);

            for (let i = 0; i < videoElt.length; i++) {
                let videoBase           = (<HTMLInputElement>videoElt[i]);
                let positionInfo        = videoBase.getBoundingClientRect();
                let videoWidth          = positionInfo.width || videoBase.offsetWidth || 0;
                let videoRatio          = videoBase.getAttribute('data-ratio-height');

                if (videoWidth == 0 && videoBase.getAttribute('data-parent-class')) {
                    let refClass        = videoBase.getAttribute('data-parent-class');
                    let parentElt       = videoBase.closest(`.${refClass}`);
                    let parentHeight    = parentElt.getBoundingClientRect().width || videoBase.offsetWidth;

                    videoWidth          = parentHeight;
                }

                if (videoWidth > 0 && videoRatio && parseFloat(videoRatio) > 0) {
                    let videoHeight     = videoWidth*parseFloat(videoRatio);
                    let videoHeightStr  = videoHeight.toString();

                    videoBase.setAttribute('height', videoHeightStr);
                }
            }
        }
    }
}