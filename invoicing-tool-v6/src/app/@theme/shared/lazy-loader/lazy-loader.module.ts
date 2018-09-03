import { LazyLoaderComponent } from './lazy-loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ LazyLoaderComponent ],
    exports: [ LazyLoaderComponent ]
})

export class LazyLoaderModule {}
