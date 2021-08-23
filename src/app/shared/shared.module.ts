//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../environments/environment'

//Componentes
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

//Material
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

//Otros
import { AgmCoreModule } from '@agm/core';


@NgModule({
	declarations: [
		NavbarComponent,
		FooterComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,

		//Material
		MatTabsModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatNativeDateModule,
		MatSelectModule,
		MatIconModule,
		MatTooltipModule,
		MatChipsModule,
		MatAutocompleteModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,

		//Otros
		AgmCoreModule.forRoot({ apiKey: environment.keyGoogle })
	],
	exports: [
		NavbarComponent,
		FooterComponent,

		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,

		MatTabsModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatNativeDateModule,
		MatSelectModule,
		MatIconModule,
		MatTooltipModule,
		MatChipsModule,
		MatAutocompleteModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,

		AgmCoreModule
	],
	providers: [
		{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
	]
})

export class SharedModule { }