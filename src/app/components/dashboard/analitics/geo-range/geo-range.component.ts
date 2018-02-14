import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-geo-range',
  templateUrl: './geo-range.component.html',
  styleUrls: ['./geo-range.component.scss']
})
export class GeoRangeComponent implements OnInit {
    @Input() defaultSize: string;
    @Input() defaultColor: string;
   
  constructor() { }
    
  ngOnInit() {
      
  }

}
