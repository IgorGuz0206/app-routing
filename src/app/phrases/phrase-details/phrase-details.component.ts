import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { CanComponentDeactivate } from 'src/app/shared/can-deactivate.guard';
import { PHRASES } from '../../shared/mock-data';
import { Phrase } from '../../shared/phrase.class';
import { PhraseService } from '../../shared/phrase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-phrase-details',
  templateUrl: './phrase-details.component.html',
  styleUrls: ['./phrase-details.component.scss'],
})
export class PhraseDetailsComponent implements OnInit, CanComponentDeactivate {
  phrase!: Phrase | undefined
  editValue!: string
  editLanguage!: string

  constructor(
    private phraseService: PhraseService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.forEach((params: Params) => {
      const id = +params.id;
      if (isNaN(id)) return;

      this.phraseService
      .getPhrase(id)
      .then(res => {
        this.phrase = res
        if (this.phrase) {
          this.editValue = this.phrase.value
          this.editLanguage = this.phrase.language
        }
      })
    })
  }

  gotoPhrasesList(): void {
  //  this.router.navigate(['../', {id: this.phrase?.id}],
  //  {relativeTo: this.activatedRoute}).then()

   this.router.navigate(['/phrases', {id: this.phrase?.id}]).then()
  }

  save(): void {
    if (this.phrase) {
      this.phrase.value = this.editValue
      this.phrase.language = this.editLanguage      
    }
  }

  isChanged():  boolean {
    return !(this.phrase?.value === this.editValue && this.phrase.language === this.editLanguage)
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.phrase) return true
    if (!this.isChanged()) return true
    return confirm('Вы не сохранили изменения. \nДанные будут потеряны. \nУйти со страницы в любом случае?')
  }

}
