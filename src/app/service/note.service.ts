import { Injectable } from '@angular/core';
import {Note as NoteDTO} from "../dto/note";
import {HttpClient} from "@angular/common/http";
import {map, Observable, Subject} from "rxjs";
export const USER_ID = "9d07fc53-a463-433d-b716-222c74451a3b";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private readonly NOTE_API_ENDPOINT = `http://localhost:8080/notes/api/v1/users/${USER_ID}/notes`

  private notes: Array<NoteDTO> = [];
  private subject = new Subject<Array<NoteDTO>>();

  constructor(private httpService: HttpClient) {
    this.httpService.get<Array<NoteDTO>>(this.NOTE_API_ENDPOINT)
      .subscribe(value => {
        this.notes = value;
        this.subject.next(this.notes);
      });
  }

  getAllNotes(): Observable<Array<NoteDTO>> {
    return this.subject.asObservable();
  }

  saveNote(note: NoteDTO): Observable<boolean> {
    return this.httpService.post<NoteDTO>(this.NOTE_API_ENDPOINT, note)
      .pipe(map(n=>{
        this.notes.push(n);
        this.subject.next(this.notes);
        return true
      }));
  }

  deleteNote(note: NoteDTO): Observable<boolean> {
    return this.httpService.delete(`${this.NOTE_API_ENDPOINT}/${note.id}`)
      .pipe(map(n=> {
        const index = this.notes.indexOf(note);
        this.notes.splice(index, 1);
        this.subject.next(this.notes);
        return true;
      }))
  }
}
