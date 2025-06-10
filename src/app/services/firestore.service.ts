import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  async uploadImage(file: File): Promise<string> {
    const path = `clothes/${uuidv4()}_${file.name}`;
    const ref = this.storage.ref(path);
    const task = ref.put(file);
    await task;
    return await ref.getDownloadURL().toPromise();
  }

  async addItemWithSeasons(
    type: string,
    colors: any[],
    seasons: string[]
  ): Promise<void> {
    const preparedColors = await Promise.all(
      colors.map(async (color) => {
        const imageUrls = await Promise.all(
          color.imageFiles.map((file: File) => this.uploadImage(file))
        );

        return {
          name: color.name,
          style: color.style,
          images: imageUrls,
        };
      })
    );

    await this.firestore
      .collection('itemMster')
      .doc(type)
      .set({ colors: preparedColors, seasons: seasons }, { merge: true });
  }

  getItemsMaster() {
    return this.firestore
      .collection('itemMster')
      .valueChanges({ idField: 'id' });
  }
}
