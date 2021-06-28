interface DeviceInt{
    id:string;
    name:string;
    description:string;
    state:string;
    type:string;
}


class Main implements EventListenerObject,  GETResponseListener, POSTResponseListener{
    public myFramework: MyFramework;
    counter:number=0;
    public main(): void {
        this.myFramework = new MyFramework();
        this.myFramework.requestGET("http://localhost:8000/devices/", this);


        let agDisp:HTMLElement = document.getElementById("btn-agregar-disp");
        //boton.addEventListener("click",()=>{alert("Evento!")} ); //ejemplo con fast arrow Ejercicio 6.1
        agDisp.addEventListener("click",this);
        window.addEventListener("click", this);
        document.addEventListener('DOMContentLoaded', this);

        //this.myFramework.requestGET("/devices",this);
        console.log('se ejecutó el main')
        }    

    handleEvent(evt: Event): void{
  
        let b:HTMLElement = this.myFramework.getElementByEvent(evt);
        let modal: HTMLElement = this.myFramework.getElementById("modal-new-device");
        //console.log(b.id.match(/disp-\d+-boton-delete/));
        console.log(b)
        // Acción del botón "Listar"
        if (b.id.match(/disp-\d+-state/)){      
            
            let checkBox: HTMLInputElement = <HTMLInputElement>evt.target;
           // Asigna al dispositivo el estado de la checkbox
            let datos_status: object = {"id":checkBox.id,"status":checkBox.checked};
            // Modifica el estado del dispositivo con método POST
            this.myFramework.requestPOST("http://localhost:8000/devices_status", datos_status, this);      

            console.log(checkBox.id + " - " + checkBox.checked);
            
        } else if (b.id.match(/disp-\d+-boton-edit/)){
            //let element_to_edit: HTMLElement= this.myFramework.getElementById();
            //this.myFramework.editDeviceForm(objetoClick.id);
            console.log("boton de edit");
        } else if (b.id.match(/disp-\d+-boton-delete/)){
            let nameIdC: string = b.id.split("-")[1]
            var deviceIndex: object = {"id": nameIdC}

            this.myFramework.requestPOST("http://localhost:8000/delete_device/", deviceIndex, this);     
            console.log("boton de delete");
            window.location.reload();
        } else if (b.id == "cancelar-nuevo-disp"){
            let nameIdC: HTMLElement = this.myFramework.getElementById("name");
            let descriptionIdC: HTMLElement = this.myFramework.getElementById("description");
            descriptionIdC.value = "";
            nameIdC.value = "";
            window.location.reload();
         //   let devTypeIdC: HTMLElement = this.myFramework.get("deviceSelectC");
         //   let devType: number = devTypeIdC.value;

            modal.style.display = "none" ;
        }else if(b.id == "btn-agregar-disp"){
            let data = {};
            console.log('entré al if de agregar disp');
            modal.style.display = "block" ; 
        }else if(b.id == "confirm-device-add"){
            let nameIdC: HTMLElement = this.myFramework.getElementById("name");
            let nameText: string = nameIdC.value;
            let descriptionIdC: HTMLElement = this.myFramework.getElementById("description");
            let descriptionText: string = descriptionIdC.value;
            let devTypeIdC: HTMLElement = this.myFramework.getElementById("devType");
            let devType: number = devTypeIdC.value;
            let deviceData = { "name": nameText, "description": descriptionText, "state": "0", "type": devType };

            this.myFramework.requestPOST("http://localhost:8000/new_device/", deviceData, this);     
            console.log(deviceData);
            modal.style.display = "none" ;
            descriptionIdC.value = "";
            nameIdC.value = "";
            window.location.reload();
        } else if(b.className == "modal-content" || b.className == "row" || b.className == "validate" || b.className == "browser-default" ) {
            console.log(evt)
            let data = {};
            console.log('entré al if de agregar disp');
            modal.style.display = "block" ;
        } else {
            console.log(evt)
            modal.style.display = "none" ;
        }


        window.onclick = function(evt) {
            if (evt.target == modal) {
              modal.style.display = "none";
              window.location.reload();
            }
    }
    }

    handleGETResponse(status: number, response: string): void {
        console.log("Respuesta del servidor: " + response);
        let xhr: XMLHttpRequest = new XMLHttpRequest();

        let data: Array<DeviceInt> = JSON.parse(response);


        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    
                    for (let disp of data ){

                        if (disp.state == "1") {
                            var checked: string = "checked"
                        }
                        else {
                            var checked: string = ""
                        }
                        let listaDisp = this.myFramework.getElementById("listaDisp");
                        listaDisp.innerHTML += `<li class="collection-item avatar">
                        <img src="./static/images/lightbulb.png" alt="" class="circle">
                        <span class="nombreDisp">${disp.name} 
                            <a class="btn-floating btn-small waves-effect waves-red btn-delete-device" href="#modal-eliminar">
                                <i class="small material-icons" id = "disp-${disp.id}-boton-delete">delete</i></a>
                        </span>
                        <p>
                            ${disp.description}
                        </p>
                                                 
                        <a href="#!" class="secondary-content">
                            <div class="switch">
                                <label>
                                  Off
                                  <input id="disp-${disp.id}-state" type="checkbox" ${checked}>
                                  <span class="lever"></span>
                                  On
                                </label>
                              </div>
                        </a>
                      </li>`;
                                                 
                    }
                    for (let disp of data) {
                        let editDisp = this.myFramework.getElementById("disp-" + disp.id +"-boton-delete");
                        editDisp.addEventListener("click",this);
                        console.log(editDisp);
                    }

                    for (let disp of data) {
                        let checkDisp = this.myFramework.getElementById("disp-" + disp.id +"-state");
                        checkDisp.addEventListener("click", this);
                        console.log(checkDisp);
                    }
                } 
                 else {
                    alert("error!!");
                    }
            }
                

        }

        xhr.open("GET","http://localhost:8000/devices",true);
        xhr.send(response);  


        console.log(data);

        for (let disp of data) {
            let editDisp = this.myFramework.getElementById("disp-" + disp.id +"-boton-delete");
            editDisp.addEventListener("click",this);
            console.log(editDisp);
        }

        for (let disp of data) {
            let checkDisp = this.myFramework.getElementById("disp-" + disp.id +"-state");
            checkDisp.addEventListener("click", this);
            console.log(checkDisp);
        }
    }

    public handlePOSTResponse(status: number, response: string): void 
    {
        console.log (status);
        console.log(response);
    }
    
    public responsePost(status: number, response: string) {
        alert(response);
    }
}


window.onload = function () {
    let m:Main = new Main();
    m.main();

}


