import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { mapPage } from '../map/map';

@NgModule({
  declarations: [
    mapPage
  ],
  imports: [
    IonicPageModule.forChild(mapPage),
  ],
})
export class MapPageModule {}
