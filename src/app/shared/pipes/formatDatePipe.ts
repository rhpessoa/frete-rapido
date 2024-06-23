import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
@Pipe({ name: 'hourFormat'})
export class FormatHourPipe implements PipeTransform {
  transform(value: string): string {
    const datePipe: DatePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(value, 'HH:mm:ss');
    return formattedDate || '';
  }
}