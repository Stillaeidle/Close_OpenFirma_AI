import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SousSerreService {
  private apiUrl = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { }

  getGreenhouses(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "greenhouse_headers");
  }

  getGreenhousesById(greenhouseId: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + `greenhouse_header/${greenhouseId}`);
  }

  getGreenhouseDetails(greenhouseId: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + `greenhouse_details/${greenhouseId}`);
  }

  getPredictions(inputData: any, greenhouseId: number): Observable<any> {
    return this.http.post<any>(this.apiUrl + "predict", { input_data: inputData, greenhouse_id: greenhouseId });
  }


  updateGreenhouseDetails(details: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + "greenhouse_details", details);
  }

  addGreenhouse(greenhouse: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "add_greenhouse", greenhouse);
  }

  updateIrrigationProcess(greenhouseId: number, irrigationProcess: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}update_irrigation_process`, { greenhouse_id: greenhouseId, irrigation_process: irrigationProcess });
  }

  updateIrrigationSwitch(greenhouseId: number, switchState: boolean): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}update_irrigation_switch`, { greenhouse_id: greenhouseId, switch_state: switchState });
  }


}
