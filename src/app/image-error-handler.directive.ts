import { Directive, HostListener, Input, ElementRef } from "@angular/core";

@Directive({
  selector: "[appImageErrorHandler]",
})
export class ImageErrorHandlerDirective {
  @Input() defaultImageSrc: string =
    "https://distefanosales.com/wp-content/uploads/2023/08/image-coming-soon-placeholder.png";

  constructor(private el: ElementRef) {}

  @HostListener("error") onError() {
    const imageElement = this.el.nativeElement as HTMLImageElement;
    if (imageElement) {
      imageElement.src = this.defaultImageSrc;
    }
  }
}
