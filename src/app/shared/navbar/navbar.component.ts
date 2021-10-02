import { Component } from '@angular/core';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {

	public menu: boolean[] = [false, false, false]

	public cambiar(numero: number) {
		this.menu = [false, false, false]
		this.menu[numero] = true
	}
}