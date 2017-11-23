import { Injectable } from '@angular/core';
import { APP_CONFIGS } from '../configs';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Injectable()
export class ToastService {

    constructor(private toastyService: ToastyService,
        private toastyConfig: ToastyConfig) { }


    /**
     * Show a toast message to the user
     * 
     * @param option 
     * @param title 
     * @param message 
     */
    public showToast(option, title, message) {

        var toastOptions: ToastOptions = {
            title: title,
            msg: message,
            showClose: true,
            timeout: APP_CONFIGS.DEFAULT_TOAST_DURATION,
            theme: 'bootstrap',
            onAdd: (toast: ToastData) => {
                // console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function (toast: ToastData) {
                // console.log('Toast ' + toast.id + ' has been removed!');
            }
        };

        switch (option) {
            case 'default':
                this.toastyService.default(toastOptions);
                break;
            case 'info':
                this.toastyService.info(toastOptions);
                break;
            case 'success':
                this.toastyService.success(toastOptions);
                break;
            case 'wait':
                this.toastyService.wait(toastOptions);
                break;
            case 'error':
                this.toastyService.error(toastOptions);
                break;
            case 'warning':
                this.toastyService.warning(toastOptions);
                break;
        }
    }

}
