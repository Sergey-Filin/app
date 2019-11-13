import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "search"
})
export class SearchPipe implements PipeTransform {
  transform(dataset, value): any {
    return dataset.filter(data => {
      return console.log(data, "1111111111111" , value);
    });
  }
}
