import { Component } from '@angular/core';


import { AddPage } from '../add/add';
import { ProductPage } from '../product/product';
import { NotifyPage } from '../notify/notify';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AddPage;
  tab2Root = ProductPage;
  tab3Root = NotifyPage;

  constructor() {

  }
}
