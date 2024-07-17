import { Component } from '@angular/core';
import { ClienteService } from '../servico/cliente.service';

import { Cliente } from '../modelo/Cliente';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  //Objeto do tipo cliente
  cliente = new Cliente();

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

  cadastrar():void{
    this.servico.cadastrar(this.cliente)
    .subscribe(retorno => { 
      
      this.clientes.push(retorno);//cadastrar o cliente no vetor
      this.cliente=new Cliente();//Limpar formulário
      alert('Cliente cadastrado com sucesso');//mensagem
     });
  }

  //método de inicialização para listar clientes
  ngOnInit(){
    this.selecionar();
  }

}
