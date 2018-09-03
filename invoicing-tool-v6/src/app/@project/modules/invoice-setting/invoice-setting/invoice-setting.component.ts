import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-invoice-setting',
  templateUrl: './invoice-setting.component.html',
  styleUrls: ['./invoice-setting.component.css']
})
export class InvoiceSettingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var $sidebar = $('.sidebar');
      var $off_canvas_sidebar = $('.off-canvas-sidebar');
      
      $('.custom-theme a').click(function(event){
        // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
          if($(this).hasClass('switch-trigger')){
              if(event.stopPropagation){
                  event.stopPropagation();
              }
              else if(window.event){
                 window.event.cancelBubble = true;
              }
          }
      });

      $('.custom-theme .background-color span').click(function(){
          $(this).siblings().removeClass('active');
          $(this).addClass('active');

          var new_color = $(this).data('color');

          if($sidebar.length != 0){
              $sidebar.attr('data-background-color',new_color);
          }

          if($off_canvas_sidebar.length != 0){
              $off_canvas_sidebar.attr('data-background-color',new_color);
          }
      });

      $('.custom-theme .active-color span').click(function(){
          $(this).siblings().removeClass('active');
          $(this).addClass('active');

          var new_color = $(this).data('color');

          if($sidebar.length != 0){
              $sidebar.attr('data-active-color',new_color);
          }

          if($off_canvas_sidebar.length != 0){
              $off_canvas_sidebar.attr('data-active-color',new_color);
          }
      });
  }

}
