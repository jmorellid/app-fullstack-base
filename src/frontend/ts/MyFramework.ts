interface GETResponseListener{
  handleGETResponse(status:number, response:string):void;
}

interface POSTResponseListener{
  handlePOSTResponse(status:number, response:string):void;
}

class MyFramework{

  public getElementsByClassName(classname:string): HTMLCollection{
    return document.getElementsByClassName(classname);
  }

  public getElementById(id:string): HTMLElement{
    return document.getElementById(id);
  }

  public getElementByEvent(evt:Event):HTMLElement{
    return <HTMLElement>evt.target; 
  }

  public requestGET(url:string, listener: GETResponseListener):void{
    let xhr: XMLHttpRequest;
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    listener.handleGETResponse(xhr.status,xhr.responseText);
                }
                else{
                    listener.handleGETResponse(xhr.status,null);
                }
            }
        }
        xhr.open('GET', url, true);
        xhr.send(null);
  }

  public requestPOST(url:string, data:object, listener:POSTResponseListener):void{
    let xhr: XMLHttpRequest;
    xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4)
        {
            if(xhr.status == 200)
            {
                listener.handlePOSTResponse(xhr.status,xhr.responseText);
            }
            else
            {
                listener.handlePOSTResponse(xhr.status,null);
            }
        }
    };
    
    xhr.open('POST', url);

    // envio JSON en body de request (Usar con NODEJS)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    let respuesta= xhr.send(JSON.stringify(data));
    }

  public editDeviceForm(id:string) {
    
  }

  public clickOnEdit(){
    console.log("se pico");
  }

  public newDeviceForm(){
    console.log("Esto se ejecutó en modal");
    // Get the modal
    var modal = document.getElementById("modal-new-device");
    // Get the button that opens the modal
    var btn = document.getElementById("agregar-disp");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on the button, open the modal
    modal.style.display = "block";

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  public deleteDeviceConfirmation(){
    console.log("Ejecución modal eliminar");
    // Get the modal
    var modal = document.getElementById("modal-eliminar");
    // Get the button that opens the modal
    // var btn_eliminar = document.getElementById("confirma-eliminar");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on the button, open the modal
    modal.style.display = "block";

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

 

}
