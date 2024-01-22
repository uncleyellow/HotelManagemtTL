import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private http: HttpClient
  ) {

  }
  getEmployees() {
    return this.http.get<any>('https://localhost:7156/api/Employees');
  }

  searchEmployees(keyword: string) {
    return this.http.get<any>(
      `https://localhost:7156/api/Employees/search`,
      {
        params: {
          keyword
        }
      }
    );
  }
  updateEmployee(employee: any) {
    return this.http.put('https://localhost:7156/api/Employees', employee);
  }

  addEmployees(booking: any) {
    return this.http.post(
      'https://localhost:7156/api/Employees',
      booking
    );
  }

  deleteEmployees(id: string) {
    return this.http.delete(`https://localhost:7156/api/Employees/${id}`, {
      headers: {
        'Accept': '*/*'
      }
    });
  }
}
