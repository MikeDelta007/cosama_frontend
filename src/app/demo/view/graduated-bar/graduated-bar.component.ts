import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-graduated-bar',
  templateUrl: './graduated-bar.component.html',
  styleUrls: ['./graduated-bar.component.scss']
})
export class GraduatedBarComponent 
{
  @Input() value: number = 0;

  getBarColor(): string 
  {
    if (this.value < 25) return '#FF0000';     // Vert foncé
    if (this.value < 50) return '#FFA500';     // Jaune
    if (this.value < 75) return '#FFD700';     // Orange
    return '#006400';                          // Rouge
  }

}
