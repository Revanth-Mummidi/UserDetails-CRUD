import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
  standalone: true,
})
export class InfiniteScrollDirective {
  @Output() scrolled = new EventEmitter<void>();

  @HostListener('scroll', ['$event'])
  onScroll(event: any): void {
    const element = event.target;
    const threshold = 1; 
    const position = element.scrollTop + element.offsetHeight;
    const height = element.scrollHeight;

    if (position > height - threshold) {
      this.scrolled.emit();
    }
  }
}
