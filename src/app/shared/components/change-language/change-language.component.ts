import { Component, OnInit, LOCALE_ID, Inject, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss']
})
export class ChangeLanguageComponent implements OnInit {

  languages = [
    { code: 'en', label: 'English'},
    { code: 'ja', label: '日本語'},
    { code: 'fr', label: 'Français'}
  ];

  @Output() changeLanguage = new EventEmitter<string>();

  constructor(@Inject(LOCALE_ID) protected localeId: string) { }

  ngOnInit() {
  }

  onSetLanguage(lang) {
    this.changeLanguage.emit(lang);
  }
}
