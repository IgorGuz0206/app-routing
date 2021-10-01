import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PHRASES } from '../../shared/mock-data';
import { Phrase } from '../../shared/phrase.class';
import { PhraseService } from '../../shared/phrase.service';

@Component({
  selector: 'app-phrases-list',
  templateUrl: './phrases-list.component.html',
  styleUrls: ['./phrases-list.component.scss'],
})
export class PhrasesListComponent implements OnInit {
  phrases!: Phrase[];
  selectedID!: number;

  constructor(
    private phraseService: PhraseService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((params: Params) => {
      this.selectedID = +params.id;

      this.phraseService.getAllPhrases().then((res) => {
        this.phrases = res;
      });
    });
  }

  isSelected(phrase: Phrase): boolean {
    return this.selectedID === phrase.id
  }

  onSelect(phrase: Phrase) {
    this.router.navigate(['phrases', phrase.id]);
    // this.router.navigate([phrase.id], {relativeTo: this.ActivatedRoute});
  }
}
