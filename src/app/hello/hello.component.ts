import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.css'
})
export class HelloComponent {
  public forecasts: WeatherForecast[] = [];
  baseurl= "http://localhost:37233/";
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.getForecasts();
  }
  getForecasts() {
    this.http.get<WeatherForecast[]>(this.baseurl+'weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
