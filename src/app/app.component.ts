import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
		<app-navbar></app-navbar>
		<br><br><br>
		<router-outlet></router-outlet>
		<app-footer></app-footer>`
})

export class AppComponent {
	title = 'aplicacion';
}
