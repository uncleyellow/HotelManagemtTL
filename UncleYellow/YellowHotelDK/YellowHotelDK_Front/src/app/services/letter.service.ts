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
  getLetters() {
    return this.http.get<any>('https://localhost:7156/api/Letter');
  }
  createLetter(letter:any) {
    return this.http.post<any>(
      'https://localhost:7156/api/Letter',
      letter
    );
  }
  searchLetters(keyword: string) {
    return this.http.get<any>(
      `https://localhost:7156/api/Letter/search`,
      {
        params: {
          keyword
        }
      }
    );
  }
  deleteLetters(id: string) {
    return this.http.delete(`https://localhost:7156/api/Letter/${id}`, {
      headers: {
        'Accept': '*/*'
      }
    });
  }

  updateLetters(user:any) {
    return this.http.put('https://localhost:7156/api/Letter', user);
  }
}
