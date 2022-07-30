import {Component, Input, OnInit} from '@angular/core';
import {Note} from "../dto/note";
import {NoteService} from "../service/note.service";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input()
  note!:Note;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
  }

  deleteNote(): void {
    this.noteService.deleteNote(this.note).subscribe();
  }
}
