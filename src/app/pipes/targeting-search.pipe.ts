import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'targetingSearch'
})
export class TargetingSearchPipe implements PipeTransform {

  transform(field_codes: any, search_key: any): any {
    if(search_key == undefined ||
      search_key.trim()=="" ){
        return field_codes;
    }else{
      return field_codes.filter(function(current_code){
        if( current_code.name.toLowerCase().includes(search_key.toLowerCase()) ){
          return true;
        }else if( current_code.code.toLowerCase().includes(search_key.toLowerCase()) ){
          return true;
        }else{
          return false;
        }
      });
    }
  }

}
