import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'na-image-cropper',
  templateUrl: './na-image-cropper.component.html',
  styleUrls: ['./na-image-cropper.component.scss']
})
export class NaImageCropperComponent implements OnInit {
  @ViewChild('NaImageCropperModal') private modal: ModalDirective;
  @Output() onApplyImage = new EventEmitter();
  @Output() onCloseModal = new EventEmitter();
  @Input() imgSrc: string;
  @Input() imageTitle: string;
  @Input() showImage = false;
  imageChangedEvent = '';
  croppedImage = 'assets/img/upload-empty.png';
  showCropper = false;

  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

  constructor() {
  }

  ngOnInit() {
    setTimeout(() => {
      this.modal.show();
    }, 10);
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    this.showCropper = true;
  }

  applyImage() {
    this.onApplyImage.emit({base64: this.croppedImage});
    this.closeModal();
  }

  openInput(event) {
    document.getElementById('imageCropperInput').click();
    event.preventDefault();
  }

  showModal(showImage = false, image?: string, title?: string) {
    this.showImage = showImage;
    if (showImage) {
      this.croppedImage = image;
      this.imageTitle = title;
    }
    this.modal.show();
  }

  closeModal() {
    this.modal.hide();
    this.onCloseModal.emit();
    this.imageChangedEvent = null;
    this.croppedImage = 'assets/img/upload-empty.png';
    this.showCropper = false;
  }
}
