import {Component} from '@angular/core';
import {AppComponent} from './app.component';

@Component({
    selector: 'app-footer',
    template: `
        <div class="layout-footer">
            <a id="footerlogolink">
                <img id="app-logo" [src]="'assets/layout/images/cosama.jpg'" alt="cosama" height="50" width="110"/>
            </a>
            <!-- <div class="social-icons">
                <a><i class="pi pi-github"></i></a>
                <a><i class="pi pi-facebook"></i></a>
                <a><i class="pi pi-twitter"></i></a>
            </div> -->
        </div>
    `
})
export class AppFooterComponent {

    constructor(public app: AppComponent) {}


}
