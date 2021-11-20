import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {

	variable:boolean = true

	public menu: boolean[] = [false, false]

	backgroundColour = '#ff0000';
    constructor(private renderer: Renderer2) { }
    @ViewChild('seccion', { static: false }) botones: ElementRef<HTMLDivElement>;

	public cambiar(numero: number) {
		this.menu = [false, false]
		this.menu[numero] = true
	}

	toggleMenu() {
		this.botones.nativeElement.classList.toggle('active')
		// if(display == "none"){
		// }
		// else{
		// 	this.botones.nativeElement.style.display="none"
		// }
	}
}