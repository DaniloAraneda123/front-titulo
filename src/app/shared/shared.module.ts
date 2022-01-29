import { MatSlideToggleModule } from '@angular/material/slide-toggle';
//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table'
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

//Otros
import { NgApexchartsModule } from 'ng-apexcharts';
import { GoogleMapsModule } from '@angular/google-maps';



@NgModule({
	declarations: [
		FooterComponent,
		NavbarComponent,
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
		MatButtonModule,
		MatButtonToggleModule,
		MatMenuModule,
		MatGridListModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatCardModule,
		MatDividerModule,
		MatDialogModule,
		MatSlideToggleModule,
		MatSnackBarModule,

		//Otros
		GoogleMapsModule,
		NgApexchartsModule,
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
		MatButtonModule,
		MatButtonToggleModule,
		MatMenuModule,
		MatGridListModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatCardModule,
		MatDividerModule,
		MatDialogModule,
		MatSlideToggleModule,
		MatSnackBarModule,

		NgApexchartsModule,
		GoogleMapsModule
	],
	providers: [
		{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
	]
})

export class SharedModule { }