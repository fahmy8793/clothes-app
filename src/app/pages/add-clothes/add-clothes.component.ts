import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-clothes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-clothes.component.html',
})
export class AddClothesComponent implements OnInit {
  itemsMaster: any[] = [];
  selectedType: string = '';
  selectedColor: any = null;
  selectedColors: any[] = []; // مصفوفة للألوان بناءً على النوع المختار

  constructor(private fsService: FirestoreService) {}

  ngOnInit() {
    this.fsService.getItemsMaster().subscribe((data) => {
      this.itemsMaster = data;
      this.updateSelectedColors(); // تحديث الألوان عندما تتحمل البيانات
    });
  }

  onTypeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedType = select.value;
    this.updateSelectedColors(); // تحديث الألوان عند تغيير النوع
    this.selectedColor = null; // إعادة تعيين الـ Color
  }

  onColorChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const colorName = select.value;
    this.selectedColor =
      this.selectedColors.find((c: any) => c.name === colorName) || null;
  }

  private updateSelectedColors() {
    const item = this.itemsMaster.find((item) => item.id === this.selectedType);
    this.selectedColors = item?.colors || [];
  }
}
