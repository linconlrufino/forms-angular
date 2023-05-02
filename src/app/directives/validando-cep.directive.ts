import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { ConsultaCepService } from './../service/consulta-cep.service';

@Directive({
  selector: '[validandoCep]',
  providers : [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: ValidandoCepDirective,
    multi:true,
  }]
})
export class ValidandoCepDirective implements AsyncValidator{

  constructor(
    private consultaCepService: ConsultaCepService
  ) { }
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const cep = control.value;

    return this.consultaCepService.getConsultaCep(cep).pipe( map(
      (resultado: any) => resultado.erro ? { cepInvalido : true } : null
    ));
    
  }
   
}
