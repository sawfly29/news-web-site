import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './component/breadcrumbs/breadcrumbs.component';



@NgModule({
    declarations: [
        BreadcrumbsComponent,
    ],
    exports: [
        BreadcrumbsComponent,
    ],
    imports: [
        CommonModule,
    ]
})
export class SharedModule { }
