import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'screenFilter'
})
export class ScreenFilterPipe implements PipeTransform {

  transform(screens: any, search_key: any): any {
    if(search_key == undefined ||
      search_key.trim()=="" ){
        return screens;
    }else{
      return screens.filter(function(current_screen){
        if( current_screen.alias.toLowerCase().includes(search_key.toLowerCase()) ){
          return true;
        }else if( current_screen.screen_code.toLowerCase().includes(search_key.toLowerCase()) ){
          return true;
        }else{
          return false;
        }
      });
    }
  }

}
