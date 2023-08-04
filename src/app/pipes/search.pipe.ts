import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allTransaction:any[],searchKey:string,propsName:string): any[] {
    const result: any[]=[];
    if(!allTransaction||searchKey==''||propsName==''){
      return allTransaction
    }
    allTransaction.forEach((item:any)=>{
      if(item[propsName].trim().toLowerCase().includes(searchKey.trim().toLowerCase())){
        result.push(item)
      }
    })
    
    return result;
  

}
}
