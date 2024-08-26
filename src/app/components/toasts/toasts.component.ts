import { Component } from '@angular/core';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.css'],
})
export class ToastsComponent {
  public statusToast = false;

  ejecutarToast() {
    this.statusToast = true;
    setTimeout(() => {
      this.statusToast = false;
    }, 1500);
  }
}
