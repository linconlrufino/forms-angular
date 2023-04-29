import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[maiorIdadeValidator]',
  providers: [{
      provide: NG_VALIDATORS,
      useExisting: MaiorIdadeDirective,
      multi: true
  }]
})
export class  MaiorIdadeDirective implements Validator {

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    const anoNascimento = new Date(control.value).getFullYear();
    const anoAtual = new Date().getFullYear();

    const maiorDeIdade = anoNascimento + 18 >= anoAtual;

    return maiorDeIdade ? null : {'maiorIdadeValidator' : true };  
  }
}
