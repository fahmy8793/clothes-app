import { Component, OnInit, inject } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-add-clothes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-clothes.component.html',
  styleUrls: ['./add-clothes.component.css'],
})
export class AddClothesComponent implements OnInit {
  fsService: FirestoreService = inject(FirestoreService);
  auth: Auth = inject(Auth);

  itemsMaster$!: Observable<any[]>;
  currentUserId: string | null = null;

  ngOnInit() {
    this.itemsMaster$ = this.fsService.getItemsMaster();

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.currentUserId = user.uid;
      } else {
        this.currentUserId = null;
        console.log('User is not logged in!');
      }
    });
  }

  addToMyWardrobe(clothingItem: any) {
    if (!this.currentUserId) {
      alert('Please login first!');
      return;
    }

    console.log('Adding to wardrobe for user:', this.currentUserId);
    console.log('Item to add:', clothingItem);

    alert('Item added successfully (simulation)!');
  }
}
