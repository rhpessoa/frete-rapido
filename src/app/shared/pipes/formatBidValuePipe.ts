import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatBidValue' })
export class FormatBidValuePipe implements PipeTransform {

    transform(bid: number): string {
        let formattedValue = bid.toString();
        let value = formattedValue.split('.');
        if (value.length > 1 && value[1].substring(0, 2) === "00") {
            return  formattedValue 
        } else {
            formattedValue = `${value[0]}.${value[1].substring(0, 2)}`;
        }
        return formattedValue;
    }
}
