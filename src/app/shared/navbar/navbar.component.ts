import { NavigationStart, Router } from '@angular/router';
import { Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
	@ViewChild('seccion', { static: false }) botones: ElementRef<HTMLDivElement>;
	public menu: boolean[] = [false, false]
	variable: boolean = true
	backgroundColour = '#ff0000';

	constructor(private renderer: Renderer2) { }

	public cambiar(numero: number) {
		this.menu = [false, false]
		this.menu[numero] = true
	}

	toggleMenu() {
		// this.botones.nativeElement.classList.toggle('active')
		if (this.botones.nativeElement.classList.contains('active')) {
			this.renderer.removeClass(this.botones.nativeElement, 'active')
		} else {
			this.renderer.addClass(this.botones.nativeElement, 'active')
		}
	}
}