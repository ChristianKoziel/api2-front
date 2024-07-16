import { Component } from '@angular/core';
import { ClienteService } from '../servico/cliente.service';

import { Cliente } from '../modelo/Cliente';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  //variavel para visibilidade dos botões
  btnCadastro:boolean = true;

  // json de clientes
  clientes:Cliente[] = [];

  //construtor
  constructor(private servico:ClienteService){}

  // método de selecionar clientes
  selecionar():void{
    this.servico.selecionar().subscribe(retorno => this.clientes = retorno);
  }

  //método de inicialização
  ngOnInit(){
    this.selecionar();
  }

}
