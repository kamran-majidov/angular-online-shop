import { Component, OnInit, ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-loading-indicator",
  templateUrl: "./loading-indicator.component.html",
  styleUrls: ["./loading-indicator.component.css"],
})
export class LoadingIndicatorComponent implements OnInit {
  fullText = "Loading...";
  currentText = "";
  private letterIndex = 0;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.showName();
  }

  showName() {
    const intervalId = setInterval(() => {
      this.currentText += this.fullText[this.letterIndex++];
      this.cdRef.detectChanges();

      if (this.letterIndex >= this.fullText.length) {
        clearInterval(intervalId);
        setTimeout(() => {
          this.currentText = "";
          this.letterIndex = 0;
          this.showName();
        }, 600);
      }
    }, 200);
  }
}
