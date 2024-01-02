import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LetterService {

  constructor(
    private http: HttpClient
  ) {

  }

  createLetter(letter:any) {
    return this.http.post<any>(
      'https://localhost:7156/api/Letter',
      letter
    );
  }
}
