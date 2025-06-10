import { Component, OnInit, inject } from '@angular/core';
import {
  CommonModule,
  NgFor,
  AsyncPipe,
  TitleCasePipe,
  NgIf,
} from '@angular/common';
import { Observable, firstValueFrom } from 'rxjs';
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-clothes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-clothes.component.html',
  styleUrls: ['./add-clothes.component.css'],
})
export class AddClothesComponent implements OnInit {
  private fsService = inject(FirestoreService);
  private authService = inject(AuthService);

  itemsMaster$!: Observable<any[]>;

  ngOnInit() {
    this.itemsMaster$ = this.fsService.getItemsMaster();
  }

  async addToMyWardrobe(clothingItem: any) {
    // أولاً، نحصل على المستخدم الحالي للتأكد من أنه مسجل دخوله
    const currentUser = await firstValueFrom(this.authService.authState$);

    if (currentUser) {
      // إذا كان المستخدم مسجلاً دخوله، نستدعي دالة الإضافة
      try {
        await this.fsService.addUserClothing(currentUser.uid, clothingItem);
        alert(
          `'${clothingItem.type} - ${clothingItem.color}' added to your wardrobe!`
        );
      } catch (error) {
        console.error('Error adding document: ', error);
        alert('Failed to add item. Please try again.');
      }
    } else {
      // إذا لم يكن مسجلاً دخوله، نطلب منه ذلك
      alert('Please login first to add items to your wardrobe.');
    }
  }
}
