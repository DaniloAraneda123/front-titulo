import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
	<div>
		<app-navbar></app-navbar>
		<br><br><br>
		<router-outlet ></router-outlet>
		<app-footer></app-footer>
	</div>`
})

export class AppComponent {
	title = 'aplicacion';
}
