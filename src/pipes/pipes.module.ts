import { NgModule } from '@angular/core';
import { NameFilterPipe } from './name-filter/name-filter';
@NgModule({
	declarations: [NameFilterPipe,
    NameFilterPipe],
	imports: [],
	exports: [NameFilterPipe,
    NameFilterPipe]
})
export class PipesModule {}
