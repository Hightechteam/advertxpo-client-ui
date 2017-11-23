import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

interface IMockSkills {
  id: number;
  name: string;
}

class User {
  constructor(public id: number, public name: string, public skills: IMockSkills[]) { }
}

const httpGetSkills = [
  { id: 1, name: 'Angular' },
  { id: 2, name: 'CSS3' },
  { id: 3, name: 'HTML5' }
];
const httpGetUsers = [
  new User(1, 'James Delaney', [httpGetSkills[0], httpGetSkills[2]]),
  new User(2, 'Lenny Belardo', [httpGetSkills[1]])
];


@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.scss']
})
export class CheckboxesComponent implements OnInit {

  ngOnInit() {
  }


  //data that would probably get retrieved through http.get
  mockSkills: IMockSkills[] = httpGetSkills;

  //User that we're creating
  user: User;

  //List of users
  users: User[] = httpGetUsers;

  //The form
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    console.clear();

    this.form = this.fb.group({
      id: 0,
      name: '',
      skills: this.buildSkills()
    });
  }

  get skills(): FormArray {

    return <FormArray>this.form.get('skills');
    //return <FormArray>this.form.get('skills') as FormArray;
  }

  buildSkills(): FormArray {
    //each element in the mock array gets mapped to fb.group with the desired structure
    const arr = this.mockSkills.map(s => {
      return this.fb.group({
        selected: false,
        id: s.id
      });
    });
    return this.fb.array(arr);
  }

  edit(id: string): void {
    let userId = +id,
      data: User = <User>this.users.find(x => x.id === userId),
      existingSkills = this.mockSkills.map(x => {
        return {
          selected: (data.skills.find(y => y.id === x.id)) ? true : false,
          id: x.id
        }
      });

    this.user = data;

    this.form.patchValue({
      id: data.id,
      name: data.name,
      skills: existingSkills
    });

  }

  reset(): void {
    this.user = undefined;
    this.form.setValue({
      id: 0,
      name: '',
      skills: this.mockSkills.map(x => {
        return {
          selected: false,
          id: x.id
        }
      })
    });
  }

  submit(form): void {

    const mine: any[] = <any[]>form.value.skills.filter(
      (x) => {
        return x.selected
      });

    const selectedSkills: IMockSkills[] = <IMockSkills[]>mine.map(x => this.mockSkills.find(y => y.id === x.id));

    if (form.value.id === 0) {
      
      this.user = new User(this.users.length + 1, form.value.name, <IMockSkills[]>mine.map(x => this.mockSkills.find(y => y.id === x.id)));
      this.users.push(Object.assign({}, this.user));
   
    } else {

      Object.assign(this.user, <User>{

        id: this.user.id,
        name: form.value.name,
        skills: selectedSkills
      });
    }
    this.reset();
  }
}