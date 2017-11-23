import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BasicAdInfo } from '../models/basic_ad_info.model';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { APP_CONFIGS } from '../configs';

declare var $: any;

@Component({
  selector: 'app-basic-ad-info',
  templateUrl: './basic-ad-info.component.html',
  styleUrls: ['./basic-ad-info.component.scss']
})

export class BasicAdInfoComponent implements OnInit {

  ad_basic_info: BasicAdInfo = new BasicAdInfo;

  isImageUploadInProgress: boolean = false;
  isVideoUploadInProgress: boolean = false;

  server_images = [
    { url: "", id: "" },
    { url: "", id: "" }
  ]

  selected_image: any;

  @Output() broadCastBasicAdInfo: EventEmitter<BasicAdInfo> = new EventEmitter<BasicAdInfo>();
  @Output() updateReachEstimates: EventEmitter<BasicAdInfo> = new EventEmitter<BasicAdInfo>();

  constructor(private http: Http) { }

  ngOnInit() {
    //if existing, populate info
    this.passAdInfoToParentComponent();
  }

  campaignNameChanged() {
    if (this.ad_basic_info.campaign_name == undefined ||
      this.ad_basic_info.campaign_name.trim() == "") {
      this.ad_basic_info.campaignNameHasError = true;
    } else {
      this.ad_basic_info.campaignNameHasError = false;
    }
    this.passAdInfoToParentComponent();
  }

  advertTitleChanged() {
    if (this.ad_basic_info.advert_title == undefined ||
      this.ad_basic_info.advert_title.trim() == "") {
      this.ad_basic_info.advertTitleHasError = true;
    } else {
      this.ad_basic_info.advertTitleHasError = false;
    }
    this.passAdInfoToParentComponent();
  }

  advertLengthSeleted() {
    this.ad_basic_info.advertlengthHasError = false;
    this.passAdInfoToParentComponent();
    this.broadCastUpdateEstimatesToParent();
  }

  advertLength_30_selected() {
    this.ad_basic_info.advert_length = "30";
    this.advertLengthSeleted();
  }

  advertLength_60_selected() {
    this.ad_basic_info.advert_length = "60";
    this.advertLengthSeleted();
  }

  layoutSeleted() {
    this.ad_basic_info.isLayoutSelected = true;
    this.passAdInfoToParentComponent();
    this.broadCastUpdateEstimatesToParent();
  }

  fullScreenSelected() {
    this.ad_basic_info.layout_type = "FULLSCREEN";
    this.layoutSeleted();
  }

  threeSplitScreenSelected() {
    this.ad_basic_info.layout_type = "3SPLIT";
    this.layoutSeleted();
  }

  twoSplitScreenSelected() {
    this.ad_basic_info.layout_type = "2SPLIT";
    this.layoutSeleted();
  }

  textOnlySelected() {
    this.ad_basic_info.layout_type = "TEXT";
    this.layoutSeleted();
  }

  passAdInfoToParentComponent() {
    this.broadCastBasicAdInfo.emit(this.ad_basic_info);
  }

  broadCastUpdateEstimatesToParent() {
    this.updateReachEstimates.emit(this.ad_basic_info);
  }

  advertTextEntered() {
    if (this.ad_basic_info.advert_text.trim() == "") {
      this.ad_basic_info.advertTextHasError = true;
    } else {
      this.ad_basic_info.advertTextHasError = false;
    }
    this.passAdInfoToParentComponent();
  }

  getRemainingCharcters(): number {
    return APP_CONFIGS.ADVERT_MESSAGE_CHARACTER_LIMIT - this.ad_basic_info.advert_text.length
  }

  imagesUploadTypeSelected(): boolean {
    if (this.ad_basic_info.file_upload_type == APP_CONFIGS.RESOURCE_TYPE_IMAGES) {
      return true;
    } else {
      return false;
    }
  }

  videoUploadTypeSelected(): boolean {
    if (this.ad_basic_info.file_upload_type == APP_CONFIGS.RESOURCE_TYPE_VIDEO) {
      return true;
    } else {
      return false;
    }
  }

  selectedImagesUploadType() {
    this.ad_basic_info.file_upload_type = APP_CONFIGS.RESOURCE_TYPE_IMAGES;
  }

  selectedVideoUploadType() {
    this.ad_basic_info.file_upload_type = APP_CONFIGS.RESOURCE_TYPE_VIDEO;;
  }

  fileChange(event) {



    var main_ref = this;
    main_ref.isImageUploadInProgress = true;
    main_ref.ad_basic_info.advertImagesHaveError = false;

    console.log("Uploading file");

    var data = new FormData();
    $.each($('#image-uploads')[0].files, function (i, file) {
      data.append('file-' + i, file);
    });

    $.ajax({
      url: APP_CONFIGS.RESOURCE_UPLOAD_URL,
      data: data,
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: false,
      type: 'POST',
      success: function (data) {
        main_ref.isImageUploadInProgress = false;
        console.log(data);
        var status = data.success;
        if (status == true) {

          console.log("Server returned success");

          var upload_name = data.data[0].upload_name;
          var upload_id = data.data[0].upload_id;
          var preview_url = data.data[0].preview_url

          var image = { url: preview_url, id: upload_id };
          main_ref.ad_basic_info.selected_images.push(image);
          main_ref.ad_basic_info.image_preview_url = preview_url;

        } else {
          console.log("Server response was not success");
        }
      },
      failure: function (errMsg) {
        main_ref.isImageUploadInProgress = false;
        console.log(errMsg);
      }
    });
  }

  uploadVideo(event) {

    var main_ref = this;
    main_ref.ad_basic_info.videoHasError = false;
    main_ref.isVideoUploadInProgress = true;
    console.log("Uploading file video");
    var data = new FormData();
    $.each($('#video-uploads')[0].files, function (i, file) {
      data.append('file-' + i, file);
    });

    $.ajax({
      url: APP_CONFIGS.RESOURCE_UPLOAD_URL,
      data: data,
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: false,
      type: 'POST',
      success: function (data) {
        main_ref.isVideoUploadInProgress = false;
        console.log(data);
        var status = data.success;
        if (status == true) {
          console.log("Server returned success");

          var upload_name = data.data[0].upload_name;
          var upload_id = data.data[0].upload_id;
          var preview_url = data.data[0].preview_url

          main_ref.ad_basic_info.video_upload_id = upload_id;
          main_ref.ad_basic_info.video_upload_name = upload_name;
          main_ref.ad_basic_info.video_thumb_url = preview_url;

          main_ref.ad_basic_info.image_preview_url = preview_url;

        } else {
          console.log("Server response was not success");
        }
      },
      failure: function (errMsg) {
        main_ref.isVideoUploadInProgress = false;
        console.log(errMsg);
      }
    });
  }

  removeImage(image) {
    this.ad_basic_info.selected_images.splice(this.ad_basic_info.selected_images.indexOf(image), 1);
    if (this.ad_basic_info.selected_images.length > 0) {
      this.ad_basic_info.image_preview_url = this.ad_basic_info.selected_images[0].url;
    } else {
      this.ad_basic_info.image_preview_url = "";
    }
    this.ad_basic_info.confirmRequirementsForLayout();
  }

  removeVideo() {
    this.ad_basic_info.video_upload_id = null;
    this.ad_basic_info.video_upload_name = null;
    this.ad_basic_info.video_thumb_url = null;
    this.ad_basic_info.image_preview_url = null;
  }

  updatedSelectedImages(image) {
    this.ad_basic_info.advertImagesHaveError = false;
    this.selected_image = image;
    if (this.ad_basic_info.selected_images.indexOf(image) == -1) {
      this.ad_basic_info.selected_images.push(image);
      this.ad_basic_info.image_preview_url = image.url;
    } else {
      this.ad_basic_info.selected_images.splice(this.ad_basic_info.selected_images.indexOf(image), 1);
    }
    //this.ad_basic_info.confirmRequirementsForLayout();
  }

  updateImagePreviewUrl(image) {
    this.ad_basic_info.image_preview_url = image.url;
  }

  isImageSelected(image): boolean {
    if (this.ad_basic_info.selected_images.indexOf(image) == -1) {
      return false;
    } else {
      return true;
    }
  }

  useSelectedImage() {
    this.ad_basic_info.image_preview_url = this.selected_image.url
  }

  maxImagesReached(): boolean {
    if (this.ad_basic_info.selected_images.length < 3) {
      return false
    } else {
      return true;
    }
  }

  loadingDone(): boolean {
    return this.ad_basic_info.basicInfoFieldsLoading;
  }

}
