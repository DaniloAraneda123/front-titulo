import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Component, ElementRef, Renderer2, ViewChild, OnInit, ViewChildren, QueryList } from '@angular/core';
import { filter } from 'rxjs/operators';
import { I } from '@angular/cdk/keycodes';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
	@ViewChild('seccion', { static: false }) botonera: ElementRef<HTMLDivElement>;

	public menu: boolean[] = [false, false, false]
	variable: boolean = true
	backgroundColour = '#ff0000';

	constructor(private renderer: Renderer2) { }

	public cambiar(numero: number) {
		this.menu = [false, false, false]
		this.menu[numero] = true
	}

	toggleMenu() {
		// this.botones.nativeElement.classList.toggle('active')
		if (this.botonera.nativeElement.classList.contains('active')) {
			this.renderer.removeClass(this.botonera.nativeElement, 'active')
		} else {
			this.renderer.addClass(this.botonera.nativeElement, 'active')
		}
	}
}