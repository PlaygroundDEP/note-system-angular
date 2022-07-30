import { Component } from '@angular/core';
import {NoteService} from "./service/note.service";
import {Note} from "./dto/note";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'note-system-front-end';
  notes : Array<Note> = [];
  constructor(private noteService: NoteService) {
  }

  ngOnInit(): void {
    this.noteService.getAllNotes().subscribe({
      next: notes => this.notes = notes
    })
  }

}
