import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-text',
  templateUrl: './hero-text.component.html',
  styleUrls: ['./hero-text.component.scss'],
})
export class HeroTextComponent {
  hero_text = 'Απολαυσε την επόμενη εμπειρία σου';
  hero_text_lead =
    'Κλείσε τώρα το εισιτήριό σου εύκολα, γρήγορα και με ασφάλεια';
}
