
// artist models
export class user_model{
    uid!:number; 
    uname!:string; 			
    uemail!:string;  
    uwhatsappno!:string;  
    upassword!:string; 
    uconfirmpassword!:string;  
    uaddress!:string; 
    ucity!:string; 
    utypeartist!:any; 
    utypeorganizer!:any;  
    utypeuser!:any; 
    uprofilephoto!:string;  
    uregistrationdate!:string;
    userstatus!:string; 
    usersubsdate!:string; 
    ulikes!:string; 
    uwishlist!:string;  
    aprofilephoto!:string;  
    afblink!:string; 
    ainstalink!:string;  
    awebsite!:string;  
    alikes!:string;  
    awishlist!:string;  
    acategory!:string;  
    asubcategory!:string;
    aworkexperience!:string;  
    aspeciality!:string;  
    alink1!:string; 
    alink2!:string; 
    alink3!:string;
    aphotos!:string; 
    abookeddate!:string; 
    artistsubsdate!:string;  
    arequirements!:string; 
    adescription!:string;  
    artiststaus!:string;  
    oprofilephoto!:string; 
    obusinessname!:string;  
    obusinesscategory!:string;  
    ofacilities!:string ;
    oinstalink!:string; 
    ofblink!:string; 
    owebsite!:string ; 
    ophotos!:string;  
    olikes!:string;  
    owishlist!:string ; 
    ofacilitesforartist!:string ;
    odescription!:string ;
    organizersubsdate!:string ; 
    organizerstatus!:string ;
    }

    // artist product model
    export class product_model{
        pid!:number;
        pbrand!:string;
        pmodel!:string;
        pprice!:string;
        pimages!:File;
    }

    // subscription model
    export class subscription_model{
        sid!:number;
        sname!:string;
        sprice!:string;
        sduration!:number;
        planfor!:string;
        sbenefits!:string;
        sbenefitsmuted!:string;
    }

    // transaction models
    // artist transactions model
    export class transaction_artist{
        atdate!:string;
        atamount!:string;
        atdescription!:string;
        uid!:number;
        sid!:number
    }

    // organizer transaction model
    export class transaction_organizer{
        otdate!:string;
        otamount!:string;
        otdescription!:string;
        uid!:number;
        sid!:number
    }

    // User transaction Model
    export class transaction_user{
        utdate!:string;
        utamount!:string;
        utdescription!:string;
        uid!:number;
        sid!:number
    }

    // carousel model
    export class carousel_model{
       
        [key: string]: string | null; 
    
    }

    // Artist categoies model
    export class artist_category_model{
        cname!:string;
        scname:string[]=[];
     
    }
    // Organizer categoies model
    export class Organizer_category_model{
        bid!:number;
        businesscategory!:string;
     
    }

    // change password
    export class changePassword_model{
        aid!:number;
        aname!:string;
        apassword!:string;
        aconfirmpassword!:string;
    }