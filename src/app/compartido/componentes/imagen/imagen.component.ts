import { Component, Input } from '@angular/core';

@Component({
  selector: 'imagen',
  standalone: true,
  imports: [],
  //templateUrl: './imagen.component.html',
  template: `<img [src]="src" [style]="'width : ' + width + 'rem'"/>`
  ,
  styleUrl: './imagen.component.css'
})
export class ImagenComponent {
  @Input({required : true}) public src !: string;

  @Input({transform : convertirWidth}) public width : string = '16';
}

function convertirWidth(val : number | undefined) {
  return (val)? String(val) : '16';
}