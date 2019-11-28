import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'compilador';
  textoIn: FormGroup;
  textoLexico: any;
  textoLineas: Array<string> = [];
  
  palabrasEnLenguaje: any = [];
  // palabrasFueraLenguaje: any = [];

  lenguaje:any = ["0","1","2","3","4","5","6","7","8","9","+","*","-","/","%",";","}","{","if","","do","while","for","=","var","(",")"];

  createForm() {
    return new FormGroup({
      palabra: new FormControl('', [Validators.required]),
    });
  }

  constructor(private formBuilder: FormBuilder) {
    this.textoIn = this.createForm();
  }

  

  lexico(texto) {
    this.textoLexico = texto.palabra.split("\n");
    
    for(let i = 0; i < this.textoLexico.length; i++) {
      this.textoLineas.push(this.textoLexico[i].split(" "));
    }
    
    this.textoLineas.forEach(element => {
      element.forEach(elemento => {
        for(let i = 0; i <= this.lenguaje.length; i++){
          if (this.lenguaje[i] == elemento) {
            this.palabrasEnLenguaje.push(elemento);
          }
        }
      });
    });  
    //console.log("Palabras en lenguaje:", this.palabrasEnLenguaje);
    this.sintactico(this.palabrasEnLenguaje);
  }


  sintactico(texto) {

    if (texto != null){
    if(texto.includes("var")  || texto.includes("+") || texto.includes("-") || texto.includes("*") || texto.includes("/") || texto.includes("%")){
       this.semantico(texto) 
    }
  }

  }

  semantico(texto) {

    if (texto.includes("var ="))
    {
      return true;
    }
    if(texto.includes("var + var"))
    {
      return true;
    }
    if(texto.includes("var - var"))
    {
      return true;
    }
    if(texto.includes("var * var"))
    {
      return true;
    }
    if(texto.includes("var / var"))
    {
      return true;
    }
    if(texto.includes("var % var"))
    {
      return true;
    }
    if(texto.includes("var = var"))
    {
      return true;
    }
  }

  validate() {
    if(this.textoIn.valid) {
      //console.log(this.textoIn.value);
      this.lexico(this.textoIn.value);
    } else {
      console.log("puto");
    }
    
  }

}
