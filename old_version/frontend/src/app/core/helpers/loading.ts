import Swal from "sweetalert2";

export class Loading {


  /* swal window methods */
  static showLoadingBox(message: string = "Loading information, just a moment...") {
    Swal.fire({
      position: 'center',
      title: message,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  static closeSwal(): void {
    Swal.close();
  }

}
