import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  type = '';
  colors = [
    {
      name: '',
      style: '',
      imageFiles: [] as File[],
    },
  ];
  seasons: string[] = []; // ستبقى فارغة ونملأها من الـ Checkbox
  availableSeasons = ['Summer', 'Winter', 'All']; // خيارات ثابتة

  constructor(private fsService: FirestoreService) {}

  addColor() {
    this.colors.push({ name: '', style: '', imageFiles: [] });
  }

  removeColor(index: number) {
    this.colors.splice(index, 1);
  }

  addImage(colorIndex: number, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.colors[colorIndex].imageFiles.push(input.files[0]);
    }
  }

  removeImage(colorIndex: number, imgIndex: number) {
    this.colors[colorIndex].imageFiles.splice(imgIndex, 1);
  }

  onSeasonChange(event: Event, season: string) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked && !this.seasons.includes(season)) {
      this.seasons.push(season);
    } else if (!checkbox.checked) {
      this.seasons = this.seasons.filter((s) => s !== season);
    }
  }

  submitItem() {
    const preparedColors = this.colors.map((color) => ({
      name: color.name,
      style: color.style,
      imageFiles: color.imageFiles,
    }));

    this.fsService
      .addItemWithSeasons(this.type, preparedColors, this.seasons)
      .then(() => alert('Item added successfully!'))
      .catch((err) => console.error(err));
  }

  ngOnInit() {}
}
