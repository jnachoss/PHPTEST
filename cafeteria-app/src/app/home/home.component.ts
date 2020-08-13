import { Component, OnInit, OnDestroy, Inject, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor( @Inject(DOCUMENT) private document: Document ) { }

  ngOnInit(): void {
    this.document.body.classList.add('home-view');
  }

  ngOnDestroy() {
    // remove the class form body tag
    this.document.body.classList.remove('home-view');
  }
}
