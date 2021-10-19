import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SearchTableComponent } from 'src/app/shared/search/search-table/search-table.component';
import { User } from 'src/app/models';
import { UserService } from '../user.service';
import { UserChangeService } from '../user-change.service';


@Component({
  selector: 'app-user-search-page',
  templateUrl: './user-search-page.component.html',
  styleUrls: ['./user-search-page.component.scss']
})
export class UserSearchPageComponent implements OnInit {
	@ViewChild('searchTable', {static:true}) searchTable:SearchTableComponent;
	userTypes = this.userService.userTypes;

	constructor(public userService:UserService, private router:Router) { }

	ngOnInit() {
		this.searchTable.searchUrl = '/user';
		this.searchTable.params.size = 10;
		this.searchTable.columns = [
			{field:'type',		header:'Type',		renderer: user => this.userService.userTypeRenderer(user.type)},
			{field:'fullName',	header:'Full Name'},
			{field:'email',		header:'Email',		hide:'sm'},
			{field:'phone',		header:'Phone',		hide:'sm'},
			{field:'active',	header:'Active', 	renderer: user => user.active ? 'Active':''},
			// {field:'locked',	header:'Locked',	renderer: user => user.locked ? 'Locked':''}
		];
		this.searchTable.onRowClick = this.onUserClick;
		this.searchTable.params.filter = {type:null};
		this.searchTable.addNewUrl = '/admin/user/new';
	}

	onUserClick(user:User) {
		this.router.navigate(['/admin/user', user._id]);
	}

	addNewUser() {
		this.router.navigate(['/admin/user/new']);
	}
}
