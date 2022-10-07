import { Component, OnInit, Input } from '@angular/core';
import { ChromaStatic } from 'chroma-js';
import { TrackFeature } from 'src/app/data/track-feature';

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css']
})
export class ThermometerComponent implements OnInit {
  //TODO: define Input fields and bind them to the template.
  @Input() id:string;
  @Input() feature: string;
  @Input() percent: string;
  @Input() color: ChromaStatic;

  constructor() { }

  ngOnInit() {
  }
  getValueNow(){
    return this.percent.slice(0,this.percent.length);
  }
}
