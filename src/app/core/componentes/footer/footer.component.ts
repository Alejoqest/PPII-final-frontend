import { Component } from '@angular/core';

@Component({
  selector: 'footer-bar',
  standalone: true,
  imports: [],
  //templateUrl: './footer.component.html',
  template: `<div id="footer" class="section full-content">
    <div id="nav-top" class="full-content flow-section flex-center">
      <a href="#top" id="top-ref">
        <!--<i class='bx bxs-up-arrow-circle'></i>-->
      </a>
    </div>
  </div>`,
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
