import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  people: any = [];
  person: any = {};

  constructor(private peopleService: PeopleService) {}

  ngOnInit(): void {
    this.getPeople();
  }

  getPerson(id: any) {
    return this.peopleService.getPerson(id).subscribe((data: any) => {
      console.log(data);
      this.person = data.user;
    });
  }
  getPeople() {
    return this.peopleService.getPeople().subscribe((data: {}) => {
      console.log(data);
      this.people = data;
    });
  }
  createPerson(person: any) {
    person.avatar = 'https://www.mecallapi.com/users/cat.png';
    return this.peopleService.createPerson(person).subscribe((data: any) => {
      console.log(data);
      this.getPeople();
    });
  }
  updatePerson(person: any) {
    return this.peopleService.updatePerson(person).subscribe((data: any) => {
      console.log(data);
      this.getPeople();
    });
  }
  deletePerson(id: any) {
    return this.peopleService.deletePerson(id).subscribe((data: any) => {
      console.log(data);
      this.getPeople();
    });
  }
}
