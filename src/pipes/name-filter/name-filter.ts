import {Pipe, PipeTransform} from '@angular/core';
import {notNullAndNotUndefined} from '../../providers/Utils';

/**
 * Generated class for the NameFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'nameFilter',
})
export class NameFilterPipe implements PipeTransform {
  transform(items: any[], value: string,isPersonal : string = 'true') {
    return notNullAndNotUndefined(items) ? (
        'true' == isPersonal ?
          items.filter(x => x.name.startsWith(value)) :
          items.filter(x => x.list.name.startsWith(value))) :
      items
  }
}
