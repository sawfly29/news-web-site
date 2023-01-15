import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NewsService } from '../../../../services/news.service';

@UntilDestroy()
@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.scss'],
})
export class CreateNewsComponent implements OnInit {
  uploadedImage?: File;
  readonly imageUploadControl = new FormControl<File[]>([], [Validators.required]);

  readonly newsForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
    imageUpload: this.imageUploadControl,
  });

  constructor(public dialogRef: MatDialogRef<CreateNewsComponent>,
              private newsService: NewsService) {
  }

  ngOnInit() {
    this.initializeDialogRef();
  }

  onCancelClick() {
    this.closeModalConfirmation();
  }

  onImageUploadClick(fileInputEvent: Event) {
    const formUploadedImage = (<HTMLInputElement>fileInputEvent.target).files;

    if (formUploadedImage) this.uploadedImage = formUploadedImage[0];
  }

  async onSaveClick() {
    this.newsForm.controls.imageUpload.markAsTouched();
    if (this.newsForm.invalid) return this.newsForm.updateValueAndValidity();

    await this.saveCustomNews();

    this.dialogRef.close({
      title: this.newsForm.value.title,
      description: this.newsForm.value.description,
      uploadedImage: this.uploadedImage,
    });
  }

  private async toBase64(uploadedFile: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  private closeModalConfirmation() {
    if (this.newsForm.dirty) {
      this.checkCloseModalIntention();
    } else {
      this.dialogRef.close();
    }
  }

  private checkCloseModalIntention() {
    if (confirm('Закрыть форму? Внесенные изменения не сохранятся.')) {
      this.dialogRef.close();
    }
  }

  private async saveCustomNews() {
    if (this.uploadedImage) {
      const { title, description } = this.newsForm.value;
      const base64Image = await this.toBase64(this.uploadedImage);
      this.newsService.saveNews({
        titleImageRaw: base64Image,
        title: title || '',
        description: description || '',
        publishedDate: `${new Date().toJSON()}`,
      });
    }
  }

  private initializeDialogRef() {
    this.dialogRef.disableClose = true;

    this.subscribeOnDialogRefBakcdropClick();
  }

  private subscribeOnDialogRefBakcdropClick() {
    this.dialogRef.backdropClick().subscribe(() => {
      this.closeModalConfirmation();
    });
  }
}
