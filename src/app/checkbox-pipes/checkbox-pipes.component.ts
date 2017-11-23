import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MapToKeysPipe } from "./map-to-keys.pipe";

@Component({
  selector: 'app-checkbox-pipes',
  templateUrl: './checkbox-pipes.component.html',
  styleUrls: ['./checkbox-pipes.component.scss']
})
export class CheckboxPipesComponent implements OnInit {



  ngOnInit() {
  }

  heroForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.createForm();
  }

  createForm() {

    //Form Group for a Hero Form
    this.heroForm = this.fb.group({
      name: '',
      countries: this.fb.array([])
    });

    let countries = ['US', 'Germany', 'France'];

    this.setCountries(countries);
  }

  setCountries(countries: string[]) {

    //One Form Group for one country
    const countriesFGs = countries.map(country => {
      let obj = {}; 
      obj[country] = true;
      return this.fb.group(obj)
    });

    const countryFormArray = this.fb.array(countriesFGs);
    this.heroForm.setControl('countries', countryFormArray);
  }

  get countries(): FormArray {
    return this.heroForm.get('countries') as FormArray;
  };

}
