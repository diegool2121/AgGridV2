import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { CommonModule } from '@angular/common';
import { UsersComponent } from "./pages/users/users.component";
import { themeAlpine } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AgGridAngular, HttpClientModule, UploadFileComponent, CommonModule, UsersComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
  encapsulation: ViewEncapsulation.None 
})
export class AppComponent implements OnInit {

  showUploadFile: boolean = false;
  toggleUploadFile() {
    if (this.showUploadFile) {
      localStorage.removeItem('columnInfo');
      localStorage.removeItem('rowInfo');
    }
    this.showUploadFile = !this.showUploadFile;
    this.getUser();
  }
  confirmDeletion() {
    const isConfirmed = window.confirm('¿Estás seguro de que deseas eliminar todos los usuarios?');
    if (isConfirmed) {
      this.deleteAllUsers();
    }
  }
  deleteAllUsers() {
    this.http.delete('https://appgrid-backend-aggrid.up.railway.app/api/userEx').subscribe((res: any) => {
      this.usersList = res;
      this.getUser();
      alert('Todos los usuarios han sido eliminados.');
    });
  }

  generarReporte() {
    window.open('https://appgrid-backend-aggrid.up.railway.app/api/reporte-usuarios', '_blank');
  }
  themes = ['alpine', 'balham', 'material', 'ag-theme-alpine', 'ag-theme-balham', 'ag-theme-material', 'ag-theme-dark', 'ag-theme-fresh', 'ag-theme-blue', 'ag-theme-bootstrap'];
  theme = themeAlpine;
  usersList: any[] = [];
  colDefs: ColDef[] = [
    { field: "id" },
    { field: "nombreCompleto" },
    { field: "fechaNacimiento" },
    { field: "direccion" },
    { field: "localidadCodigoPostal" },
    { field: "telefono" }, 
    { field: "correo" },
    { field: "fechaAlta"},
    { field: "grupo", filter: true, filterParams: { values: ['Grupo A', 'Grupo B', 'Grupo C'] } },
  ]; 
    constructor(private http: HttpClient) {}
    ngOnInit() {
          this.getUser();
    }
    getUser() {
      this.http.get('https://appgrid-backend-aggrid.up.railway.app/api/userEx').subscribe((res: any) => {
          this.usersList = res;
        });
    }
}
