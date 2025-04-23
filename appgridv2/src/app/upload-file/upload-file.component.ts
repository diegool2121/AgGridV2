import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { UserService } from '../core/services/userEx.service';
import { Usuario } from '../models/userEx.model';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css',
})
export class UploadFileComponent {
  data: any[][] = [];
  columnasAnalizadas: any[] = [];
  columnasDesdeStorage: any[] = [];
  filasAnalizadas: any[] = [];
  filasDesdeStorage: any[] = [];
  totalUsuarios = 0;
  usuariosEnviados = 0;
  cargando = false;


  onFileChange(event: any): void {
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length !== 1) {
      alert('Por favor, sube solo un archivo.');
      return;
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = XLSX.utils.sheet_to_json(ws, { header: 1 });

      // Analiza las columnas al cargar el archivo
      this.columnasAnalizadas = this.getColumnInfo();
      // Analiza las filas al cargar el archivo
      this.filasAnalizadas = this.getRowInfo();
    };

    reader.readAsBinaryString(target.files[0]);
  }

  getColumnInfo(): any[] {
    if (this.data.length === 0) return [];

    const headers = this.data[0];
    const columnInfo = headers.map((header: string, index: number) => {
      const values = this.data.slice(1).map((row) => row[index]); // omite la cabecera
      const dataType = this.detectType(values);
      const isPotentialRelation = this.checkIfRepeated(values);

      return {
        columnName: header,
        sampleValues: values.slice(0, 5),
        dataType,
        isPotentialRelation,
      };
    });

    // Guarda en localStorage
    localStorage.setItem('columnInfo', JSON.stringify(columnInfo));

    return columnInfo;
  }

  getRowInfo(): any[] {
    if (this.data.length === 0) return [];

    const rows = this.data.slice(1); // omite la cabecera
    const rowInfo = rows.map((row: any[], index: number) => {
      return {
        rowNumber: index + 1,
        values: row,
      };
    });

    // Guarda en localStorage
    localStorage.setItem('rowInfo', JSON.stringify(rowInfo));

    return rowInfo;
  }

  detectType(values: any[]): string {
    if (values.every((val) => typeof val === 'number')) return 'number';
    if (values.every((val) => typeof val === 'string' && val.includes('@')))
      return 'email';
    if (values.every((val) => typeof val === 'string')) return 'string';
    return 'mixed';
  }

  checkIfRepeated(values: any[]): boolean {
    const set = new Set(values);
    return set.size < values.length;
  }
  mostrarColumnas(): void {
    const columnasGuardadas = localStorage.getItem('columnInfo');
    if (columnasGuardadas) {
      this.columnasDesdeStorage = JSON.parse(columnasGuardadas);
    } else {
      alert('No hay datos guardados en localStorage.');
    }
  }
  mostrarFilas(): void {
    const filasGuardadas = localStorage.getItem('rowInfo');
    if (filasGuardadas) {
      this.filasDesdeStorage = JSON.parse(filasGuardadas);
    } else {
      alert('No hay datos guardados en localStorage.');
    }
  }
  constructor(private userService: UserService) {}

enviarUsuarios(): void {
  this.mostrarFilas();
  if (this.filasDesdeStorage.length === 0) {
    alert('No hay filas para enviar.');
    return;
  }
  this.totalUsuarios = this.filasDesdeStorage.length;
  this.usuariosEnviados = 0;
  this.cargando = true;

  this.filasDesdeStorage.forEach((fila, index) => {
    const datos: Usuario = {
      id: fila.values[0],
      nombreCompleto: fila.values[1],
      fechaNacimiento: new Date(fila.values[2]).toISOString(),
      direccion: fila.values[3],
      localidadCodigoPostal: fila.values[4],
      telefono: fila.values[5],
      correo: fila.values[6],
      fechaAlta: new Date(fila.values[7]).toISOString(),
      grupo: fila.values[8],
    };

    this.userService.createUser(datos).subscribe({
      next: (res) => {
        this.usuariosEnviados++;
        if (this.usuariosEnviados === this.totalUsuarios) {
          this.cargando = false;
          alert('Todos los usuarios fueron enviados correctamente.');
          this.getUserEx();
        }
      },
      error: (err) => {
        console.error('Error creando usuario:', err);
        this.usuariosEnviados++;
        if (this.usuariosEnviados === this.totalUsuarios) {
          this.cargando = false;
          alert('Proceso de envío terminado con errores.');
          this.getUserEx();
        }
      },
    });
  });
}
  
    getUserEx(): void {
      this.userService.getUsers().subscribe((res) => {
        // Actualiza la lista de usuarios en la interfaz

        this.filasDesdeStorage = res.map((user: Usuario) => ({
          rowNumber: user.id,
          values: [
            user.id,
            user.nombreCompleto,
            user.fechaNacimiento,
            user.direccion,
            user.localidadCodigoPostal,
            user.telefono,
            user.correo,
            user.fechaAlta,
            user.grupo,
          ],
        }));
      });
    }
}


