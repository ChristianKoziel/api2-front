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

  //variavel para visibilidade da tabela
  tabela:boolean = true;

  // json de clientes
  clientes:Cliente[] = [];

  //construtor
  constructor(private servico:ClienteService){}

  // método de selecionar clientes
  selecionar():void{
    this.servico.selecionar().subscribe(retorno => this.clientes = retorno);
  }

  //método para cadastrar cliente
  cadastrar():void{
    this.servico.cadastrar(this.cliente)
    .subscribe(retorno => {       
      this.clientes.push(retorno);//cadastrar o cliente no vetor
      this.cliente=new Cliente();//Limpar formulário
      alert('Cliente cadastrado com sucesso');//mensagem
     });
  }

  //método para editar clientes
  editar():void{

      this.servico.editar(this.cliente)
      .subscribe(retorno => {
      // Obter posição do vetor onde está o cliente
      let posicao = this.clientes.findIndex(obj => {
        return obj.codigo == retorno.codigo;
      });

      // Alterar os dados do cliente
      this.clientes[posicao] = retorno;

      // Limpar formulário
      this.cliente = new Cliente();

      //visibilidade dos botoes e tabela
      this.btnCadastro = true;
      this.tabela = true;
      //mensagem
      alert('Cliente alterado com sucesso');

    })

  }

//método para excluir clientes
remover():void{

  this.servico.remover(this.cliente.codigo)
  .subscribe(retorno => {
  // Obter posição do vetor onde está o cliente
  let posicao = this.clientes.findIndex(obj => {
    return obj.codigo == this.cliente.codigo;
  });

  // Remover cliente do vetor
  this.clientes.splice(posicao, 1);

  // Limpar formulário
  this.cliente = new Cliente();

  //visibilidade dos botoes e tabela
  this.btnCadastro = true;
  this.tabela = true;
  //mensagem
  alert('Cliente excluido com sucesso');

})

}

  //método para selecionar um cliente especifico
  selecionarCliente(posicao:number):void{
    //selecionar cliente no vetor
    this.cliente=this.clientes[posicao];
    //visibilidade dos botoes e tabela
    this.btnCadastro=false;
    this.tabela=false;
  }

  // Método para cancelar
  cancelar():void{

    this.cliente = new Cliente();
    this.btnCadastro = true;
    this.tabela = true;

  }

  //método de inicialização para listar clientes
  ngOnInit(){
    this.selecionar();
  }

}
