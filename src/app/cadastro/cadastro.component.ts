import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConsultaCepService } from '../service/consulta-cep.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(
    private router: Router,
    private consultaCepService: ConsultaCepService) { }

  ngOnInit(): void {
  }

  cadastrar(form: NgForm){
    if(form.valid)
      this.router.navigate(['./sucesso']);
    else
      alert('Formulario inválido')
  }

  populateEndereco(response: any, formulario: NgForm) {
    formulario.form.patchValue({
      endereco: response.logradouro,
      complemento: response.complemento,
      bairro: response.bairro,
      cidade: response.localidade,
      estado: response.uf,
    })
  }

  consultaCEP(ev: any, formulario : NgForm){
    const cep = ev.target.value;

    if(!cep)
      return null;

    return this.consultaCepService.getConsultaCep(cep).subscribe( response => {
        console.log(response);
        this.populateEndereco(response, formulario);
      }
    );
  }


  
}
