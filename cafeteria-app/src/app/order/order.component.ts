import { Component, OnInit, OnDestroy, Inject, ViewEncapsulation, TemplateRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { OrderService } from './service/order.service';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Template } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderComponent implements OnInit, OnDestroy {

  products = [];
  orders = [];
  colaOrders = [];
  prepOrders = [];
  finOrders = [];
  entOrders = [];
  currentOrder = {
    id: 0,
    state: "",
    number: 0,
    order_detail : [],

  };
 
  modalRef: BsModalRef;

  constructor( @Inject(DOCUMENT) private document: Document, private orderService: OrderService, private modalService: BsModalService ) { }

  ngOnInit(): void {
    this.document.body.classList.add('order-view');
    this.getProducts();
  }

  ngOnDestroy(): void{
    this.document.body.classList.remove('order-view');
  }

  onDrop(event: CdkDragDrop<string[]>, newState : String) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }

    let item = event.container.data;
    
    this.orderService.updateState(item, newState).subscribe(res => {
      if(newState === 'preparacion'){
        
      }
    });

  }

  getOrders(){
    this.orderService.getOrders().subscribe(res => {
      res.forEach(item => {
        switch (item.state) {
          case 'cola':
            this.colaOrders.push(item);
            break;
          case 'preparacion':
            this.prepOrders.push(item);
            break;
          case 'finalizado':
            this.finOrders.push(item);
            break;
          case 'entregado':
            this.entOrders.push(item);
          default:
            break;
        }
      });

    });
  }

  async getProducts(){

    this.orderService.getProducts().subscribe(res => {
      this.products = res.data;
      this.getOrders();
    });

  }

  newOrder(){
    this.orderService.save().subscribe(res => {
      
    });
  }

  openModal(template, order){

    this.currentOrder = order;
    console.log(order);

    this.modalRef = this.modalService.show(template);

  }

}
