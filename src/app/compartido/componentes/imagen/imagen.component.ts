import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'imagen',
  standalone: true,
  imports: [NgStyle],
  //templateUrl: './imagen.component.html',
  template: `<img [src]="src" [ngStyle]="conseguirEstilos()"/>`
  ,
  styleUrl: './imagen.component.css'
})
export class ImagenComponent {
  @Input({required : true}) public src !: string;
  @Input({transform : convertirWidth}) public width : string = '16';
  @Input({transform : convertirHeight}) public height ?: string;

  public conseguirEstilos() {
    return (this.height)? {
      'width' : this.width + 'rem',
      'height' : this.height + 'rem'
    } : {
      'width' : this.width + 'rem'
    }
  }
}

function convertirWidth(val : number | undefined) {
  return (val)? String(val) : '16';
}

function convertirHeight(val : number | undefined) {
  return (val)? String(val) : undefined;
}
