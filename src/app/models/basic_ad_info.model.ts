 import { APP_CONFIGS } from '../configs';

export class BasicAdInfo{

    advert_id: number = 0;
    user_id: string;
    campaign_name: string = "";
    advert_title: string = "Your advert title";
    advert_text: string = "your advert text scrolls here..";
    advert_length: string = "0";

    layout_type: string;
    image_preview_url : string = "";
    img_upload_apiEndPoint: string = "http://localhost/seyeya/uploadImage.php";

    selected_images = [];

    video_upload_name: string;
    video_upload_id: string;
    video_thumb_url: string;
    videoHasError: boolean = false;

    campaignNameHasError: boolean = false;
    advertTitleHasError: boolean = false;
    isLayoutSelected: boolean = true;
    advertTextHasError: boolean = false;
    advertImagesHaveError: boolean = false;
    advertImagesErrorMessage: string;
    advertlengthHasError: boolean = false;
    advertSubmitted = false;
    basicInfoFieldsLoading = false;

    file_upload_type: string = APP_CONFIGS.RESOURCE_TYPE_IMAGES;

    errors = [];

    fullScreenSelected(): boolean{
        return (this.layout_type == APP_CONFIGS.FULLSCREEN); 
    } 

    threeScreenSplitSelected(): boolean{
        return (this.layout_type == APP_CONFIGS.THREE_SPLIT); 
    }

    twoScreenSplitSelected(): boolean{
        return (this.layout_type == APP_CONFIGS.TWO_SPLIT);
    }

    textOnlySelected(): boolean{
        return (this.layout_type == APP_CONFIGS.TEXT) 
    }

    validateRecords(){
        this.errors = []; 
        this.validateCampaignName();
        this.validateAdvertTitle();
        this.validateAdvertLength();
        this.confirmLayoutIsSelected();  
        this.confirmRequirementsForLayout();    
        return this.errors;  
    }

    validateCampaignName(){
        if(this.campaign_name==undefined 
            || this.campaign_name.trim() == ""){
            this.campaignNameHasError = true;

            this.errors.push("Campaign name is invalid");
        }else{
            this.campaignNameHasError = false;
        }
    }

    validateAdvertTitle(){
        
        if(this.advertTextRequired()){
            if(this.advert_title==undefined 
                || this.advert_title.trim() == ""){
                this.advertTitleHasError = true;

                this.errors.push("Advert title is invalid");
            }else{
                this.advertTitleHasError = false;
            }
        }else{
            this.advertTitleHasError = false;
        }
    }

    validateAdvertLength(){
        if(Number(this.advert_length) == 0){
            this.advertlengthHasError = true;

            this.errors.push("Advert length is not selected");
        }else{
            this.advertlengthHasError = false;
        }
    }

    confirmLayoutIsSelected(){
        if(this.layout_type==undefined ||
            this.layout_type == null){
                this.isLayoutSelected = false;
            this.errors.push("Please select Advert layout");
        }else{
            this.isLayoutSelected = true;
        }
    }

    confirmRequirementsForLayout(){
        if(this.isLayoutSelected){

           if(this.advertTextRequired() && 
                this.advert_text.trim()==""){
            this.advertTextHasError = true;
            this.errors.push("Advert message is invalid");
           }else{
               this.advertTextHasError = false;
           }

           if(this.hasImageOrVideoResorce()){

               console.log("File_Upload_Type is: " + this.file_upload_type);

                if(this.file_upload_type=="VIDEO"){
                    if(this.video_upload_id==null ||
                        this.video_upload_id == undefined ||
                        this.video_upload_id.trim() == "" ){
                            this.videoHasError = true;
                            this.errors.push("Please upload video");
                        }
                }else if(this.file_upload_type=="IMAGE"){

                    console.log("Selected Images length == " + this.selected_images.length);

                    if(this.selected_images.length == 0){
                        this.advertImagesHaveError = true;
                        this.advertImagesErrorMessage = "Above selected layout requires atleast one image";
                        this.errors.push("Above selected layout requires atleast one image");
                    }else if(this.selected_images.length > 5){
                        this.advertImagesHaveError = true;
                        this.advertImagesErrorMessage = "Please select 5 images or less"
                        this.errors.push("Maximum is 5 images");   
                    }
                }
           }else{
               this.videoHasError = false;
               this.advertImagesHaveError = false;
               this.advertImagesErrorMessage = null;
           }

        //    if(this.hasImageOrVideoResorce() && 
        //         this.selected_images.length == 0){
        //             this.advertImagesHaveError = true;
        //             this.advertImagesErrorMessage = "Layout selected required atleast one image";
        //             this.errors.push("Layout selected requires atleast one image");
        //    }else if(this.hasImageOrVideoResorce() && 
        //             this.selected_images.length > 5 ){
        //                 this.advertImagesHaveError = true;
        //                 this.advertImagesErrorMessage = "Please select 5 images or less"
        //         this.errors.push("Maximum is 5 images");
        //    }else{
        //        this.advertImagesHaveError = false;
        //        this.advertImagesErrorMessage = null;
        //    }
        }
    }

    advertTextRequired(): boolean{
        if(this.layout_type == APP_CONFIGS.THREE_SPLIT || 
          this.layout_type == APP_CONFIGS.TEXT ){
             return true;
        }else{
            return false;
        }
    }

    hasImageOrVideoResorce(): boolean{
        if(this.layout_type == null || this.layout_type.trim()== "") return false; 
        if(this.layout_type == APP_CONFIGS.TEXT){
            return false;
        }else{
            return true;
        }
    }

    imageReourceTypeUsed(): boolean{
        return this.file_upload_type == APP_CONFIGS.RESOURCE_TYPE_IMAGES;
    }

    videoReourceTypeUsed(): boolean{
        return this.file_upload_type == APP_CONFIGS.RESOURCE_TYPE_VIDEO;
    }

}