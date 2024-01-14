import { Component, Input } from "@angular/core";

@Component({
  selector: "app-no-data-found",
  templateUrl: "./no-data.component.html",
})
export class NoDataComponent {
  @Input() dataType = "";
}
