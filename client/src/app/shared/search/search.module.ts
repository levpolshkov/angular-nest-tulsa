import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchFooterComponent } from './search-footer/search-footer.component';
import { SearchTableComponent } from './search-table/search-table.component';

@NgModule({
	declarations: [SearchTableComponent, SearchFooterComponent],
	imports: [CommonModule, RouterModule],
	exports: [SearchTableComponent, SearchFooterComponent]
})
export class SearchModule {}
