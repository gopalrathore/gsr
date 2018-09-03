import { Router } from '@angular/router';

declare var $: any;
declare var swal: any;

export class Notification {


  /**
   * Error notification shown in the frontend
   * @param message {string}: message to display on notification
   * @param from {string}: top, bottom, right, left, center
   * @param align {string}: top, bottom, right, left, center
   * @param icon {string}: theme icon to display with notification
   * @param timmer {string}: time to keep displaying notification
   */
  public static error(message: string = "Something went wrong.", from: string = "top", align: string = "right", icon: string = "ti-alert", timmer: string = "1000"): void {
    Notification.showNotification(from, align, "danger", message, icon, timmer);
  }

  /**
 * Warning notification shown in the frontend
 * @param message {string}: message to display on notification
 * @param from {string}: top, bottom, right, left, center
 * @param align {string}: top, bottom, right, left, center
 * @param icon {string}: theme icon to display with notification
 * @param timmer {string}: time to keep displaying notification
 */
  public static warning(message: string = "Something went wrong.", from: string = "top", align: string = "right", icon: string = "ti-alert", timmer: string = "1000"): void {
    Notification.showNotification(from, align, "warning", message, icon, timmer);
  }

  /**
   * Success notification shown in the frontend
   * @param message {string}: message to display on notification
   * @param from {string}: top, bottom, right, left, center
   * @param align {string}: top, bottom, right, left, center
   * @param icon {string}: theme icon to display with notification
   * @param timmer {string}: time to keep displaying notification
   */
  public static success(message: string = "Done.", from: string = "top", align: string = "right", icon: string = "ti-alert", timmer: string = "1000"): void {
    Notification.showNotification(from, align, "success", message, icon, timmer);
  }

  private static showNotification(
    from: string,
    align: string,
    type: string,
    message: string,
    icon: string = "ti-alert",
    timer: string = "1000"
  ): void {
    let data: object = { icon: icon, message: message };
    let alignment: object = {
      type: type,
      timer: timer,
      placement: { from: from, align: align }
    };
    $.notify(data, alignment);
  }

  /**
   * @description show alert
   * @param message message to be shown on alert 
   * @returns void
   */
  public static showAlert(type: string, message: string = "Operation successfully.", router: Router, link: string): void {
    swal({
      title: type === 'success' ? "Success" : "Danger",
      text: message,
      type: type === 'success' ? "success" : "danger",
      showCancelButton: false,
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      confirmButtonText: "Proceed",
      buttonsStyling: false
    }).then(function () {
      router.navigateByUrl(link);
    });
  }

}