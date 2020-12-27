chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener((msg) => {        
        if (msg.function == 'iconclick') { 
            if( $('#azex--coupon--containter').length > 0 ){
                var isdisplay = $('#azex--coupon--containter').css('display');
                if( isdisplay == 'none'){
                    $('#azex--coupon--containter').css('display', 'block')
                }else{
                    $('#azex--coupon--containter').css('display', 'none')
                }
            }            
        }
    });
});

var url = window.location.href; 
var el = document.createElement('a');
el.href = url;
var storeurl = el.host; 
// input the API url that you need to connect 
var serverurl = 'serversupport url';

$.get( serverurl, {'url':storeurl},function(data, status){ 
    if(data.flag == 1 ){
        var count = data.count.toString();
        chrome.runtime.sendMessage({type: "datagot", options: {  
            iconUrl: chrome.extension.getURL("playty_active.php"), 
            message: count
        }});
    }else{
        
    }

    setazexmodal( data );

},'json');

function setazexmodal( message ){
    
    if( message.flag == 1 ){
        var couponhtml = '<div id="azex--coupon--containter" style="position:fixed; display:none; width:390px; top:10px; right: 10px; z-index: 99999; max-height: 827px;border-radius: 4px;background-color: rgb(255, 255, 255);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px 2px;height: calc(100vh - 20px);">';
        couponhtml += '<div class="azex--coupon--header" style="box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);display:block;z-index:1;position:relative"><div><div style="padding-left:20px; padding-right: 20px;display:flex;justify-content: space-between;"><div style="color: #efefef;font-weight: bold;line-height: 30px; font-size:18px; font-family: Nunito Sans, sans-serif;"><img style="width:20px;" src="'+message.exntensionsmallimg+'" />OUPON</div><div onclick="toggle_azex()" ><span  class="azex--coupon--close--icon" ></span></div></div></div><div class="azex--coupon--storeinfo" style="text-align:center"><img src="'+message.storeimg+'" style="width:80px;display: inline-block;" /> <div class="stpf--coupon--storetitle" style="font-size:15px;padding:10px;font-family: Nunito Sans, sans-serif;">'+message.storedescription+'</div></div></div>';

        couponhtml += '<div class="azex--coupons">';
        
        $.each( message.coupons, function( key, value ){
            couponhtml += '<div class="azex--coupon--item">';
                 
                couponhtml += '<div class="azex--citem--infos">';
                    couponhtml += '<div class="azex--citem--title" style="margin:auto; text-align:center; font-family: Nunito Sans, sans-serif;"><p style="margin:0px;font-size:16px;">'+value.title+'</p><p style="margin:0px;font-size:14px">'+value.description+'</p></div>'; 
                    var affilateitemlink = value.itemURL;
                    if(affilateitemlink.length == 0){
                        affilateitemlink = message.storeaffilate;
                    }

                    if(value.itemflag == 'd'){
                        couponhtml += '<div class="azex--citem--code" onclick="azex_coupon_copy(this)" data-typeflag="d" data-url="'+affilateitemlink+'" style="background:#f30;color:#fff;margin:0 auto;font-family: Nunito Sans, sans-serif;"> Vai all\'Offerta </div>';
                    }else{
                        couponhtml += '<div class="azex--citem--code" onclick="azex_coupon_copy(this)" data-typeflag="c" data-url="'+affilateitemlink+'" style="margin:0 auto;font-family: Nunito Sans, sans-serif;"  data-couponcode="'+value.CouponCode+'">Scopri il Coupon</div>';
                    }
                    
                couponhtml += '</div>';

            couponhtml += '</div>';
        });
        couponhtml += '</div>';
        couponhtml += '</div>';
        
        couponhtml += '<link href="https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap" rel="stylesheet">';

        couponhtml += '<style>.azex--coupon--close--icon{display:block;width:30px;height:30px;cursor:pointer}.azex--coupon--close--icon:before, .azex--coupon--close--icon:after{display: block;content: ""; position: absolute;height: 1.5px;width: 12px;top: 14px;right: 28px;background: #9E9E9E}.azex--coupon--close--icon:before {transform: rotate(45deg);}.azex--coupon--close--icon:after {transform: rotate(-45deg);}.azex--coupons{flex: 1 1 auto;overflow: hidden auto;height: calc(100vh - 185px);;display: flex;flex-direction: column;position: relative;background: #fafafa;}.azex--coupon--item{background: #fff;min-height: 117px;border-bottom: solid 1px #e5e6e7;display: flex;user-select: none;cursor: pointer;}.azex--citem--discount{flex:0 0 112px;display:flex;align-items: center;justify-content: center;}.azex--discount--area{width:80px;height:80px;border-radius: 4px;border: dashed 0.5px #08c3a1; color: #08c3a1;text-align: center;overflow: hidden;display: flex;flex-direction: column;align-items: center;justify-content: center;text-transform: uppercase;}.azex--citem--infos{flex: 1 1 auto;padding: 18px 18px 10px 18px;align-items: flex-start;justify-content: center;display: flex;flex-direction: column;}.azex--citem--code{display: inline-block;padding: 6px 23px;border-radius: 4px;background-color: #f30 ;border: solid 1px #dbe0e2; font-size: 10px; letter-spacing: 1px;text-align: center;color: #fff;cursor: pointer;min-width: 130px;position: relative;overflow: hidden;}.azex--citem--title{font-size: 14px;font-style: normal;font-stretch: normal;line-height: 1.5;letter-spacing: normal;color: #747e8b;margin-bottom: 8px;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}</style>';
 
        couponhtml += '<script> setTimeout(function(){document.getElementById("azex--coupon--containter").style.display = "block";}, 3000);function toggle_azex(){ var isdisplay = document.getElementById("azex--coupon--containter").style.display;if( isdisplay == "none"){document.getElementById("azex--coupon--containter").style.display = "block";}else{document.getElementById("azex--coupon--containter").style.display = "none";}} function azex_coupon_copy(e){var itemflag = e.dataset.typeflag; if(itemflag != "d"){ var text=e.dataset.couponcode;if(window.clipboardData && window.clipboardData.setData) { return clipboardData.setData("Text", text);} else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {var textarea = document.createElement("textarea");textarea.textContent = text;textarea.style.position = "fixed";document.body.appendChild(textarea);textarea.select();try {return document.execCommand("copy");} catch (ex) {console.warn("Copy to clipboard failed.", ex);return false;} finally {document.body.removeChild(textarea);e.textContent = "codice copiato!";  e.style.color="#fff"; e.style.background="#f60";  setTimeout(function(){e.style.background = "#f60"; window.open(e.dataset.url); }, 500); }}}else{ window.open(e.dataset.url);  } }</script>';
        
        $('body').append(couponhtml); 
    }

    if( message.flag == 2 ){
        var couponhtml = '<div id="azex--coupon--containter" style="position:fixed; display:none; width:390px; top:10px; right: 10px; z-index: 99999; max-height: 827px;border-radius: 4px;background-color: rgb(255, 255, 255);box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px 2px;height: calc(100vh - 20px);">';
        couponhtml += '<div class="azex--coupon--header" style="box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.1);display:block;z-index:1;position:relative"><div><div style="padding-left:20px; padding-right: 20px;display:flex;justify-content: space-between;"><div style="color: #efefef;font-weight: bold;line-height: 30px; font-size:18px"><img style="width:20px" src="'+message.exntensionsmallimg+'" />OUPON</div><div onclick="toggle_azex()" ><span  class="azex--coupon--close--icon" ></span></div></div></div><div class="azex--coupon--storeinfo" style="text-align:center"><img src="'+message.cdnlink+'media/extension.png" style="width:80px;display: inline-block;" /> <div class="stpf--coupon--storetitle" style="font-size:18px;padding-bottom:10px;font-family: Nunito Sans, sans-serif;">Coupon da non perdere</div></div></div>';

        couponhtml += '<div class="azex--coupons">';
        $.each( message.coupons, function( key, value ){
            couponhtml += '<div class="azex--coupon--item" onclick="azex_coupon_copy(this)">';
                couponhtml += '<div class="azex--cstore--link" style="display:none;">'+value.WebsiteID+'</div>';           
                couponhtml += '<div class="azex--citem--discount">';                
                couponhtml += '<div class="azex--discount--area">' 
                    couponhtml += '<img style="width: 100%" src="'+value.storeimg+'"> '; 
                couponhtml += '</div>';
                couponhtml += '</div>';
                couponhtml += '<div class="azex--citem--infos">';
                    couponhtml += '<div class="azex--cstore--title" style="font-size:16px;color:#1f2e43; line-height: 1.71;font-family: Nunito Sans, sans-serif;">'+value.WebsiteName+'</div>';
                    couponhtml += '<div class="azex--citem--title" style="font-family: Nunito Sans, sans-serif;">'+value.title+'</div>';
                    couponhtml += '<div class="azex--citem--code" style="margin:0 auto;font-family: Nunito Sans, sans-serif;" data-couponcode="'+value.CouponCode+'">Scopri il Coupon</div>';
                couponhtml += '</div>';

            couponhtml += '</div>';
        });
        couponhtml += '</div>';

        couponhtml += '</div>';

        couponhtml += '<link href="https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap" rel="stylesheet">';

        couponhtml += '<style>.azex--coupon--close--icon{display:block;width:30px;height:30px;cursor:pointer}.azex--coupon--close--icon:before, .azex--coupon--close--icon:after{display: block;content: ""; position: absolute;height: 1.5px;width: 12px;top: 14px;right: 28px;background: #9E9E9E}.azex--coupon--close--icon:before {transform: rotate(45deg);}.azex--coupon--close--icon:after {transform: rotate(-45deg);}.azex--coupons{flex: 1 1 auto;overflow: hidden auto;height: calc(100vh - 185px);;display: flex;flex-direction: column;position: relative;background: #fafafa;}.azex--coupon--item{background: #fff;border-bottom: solid 1px #e5e6e7;display: flex;user-select: none;cursor: pointer;}.azex--citem--discount{flex:0 0 112px;display:flex;align-items: center;justify-content: center;}.azex--discount--area{width:80px;height:80px;text-align: center;overflow: hidden;display: flex;flex-direction: column;align-items: center;justify-content: center;text-transform: uppercase;}.azex--citem--infos{flex: 1 1 auto;padding: 18px 18px 10px 18px;align-items: flex-start;justify-content: center;display: flex;flex-direction: column;}.azex--citem--code{display: inline-block;padding: 6px 23px;border-radius: 4px;background-color: #f30 ;border: solid 1px #dbe0e2;font-size: 10px;letter-spacing: 1px;text-align: center;color: #404852;cursor: pointer;min-width: 130px;position: relative;overflow: hidden;}.azex--citem--title{font-size: 14px;font-style: normal;font-stretch: normal;line-height: 1.5;letter-spacing: normal;color: #747e8b;margin-bottom: 8px;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}</style>';
        
        couponhtml += '<script>function toggle_azex(){ var isdisplay = document.getElementById("azex--coupon--containter").style.display;if( isdisplay == "none"){document.getElementById("azex--coupon--containter").style.display = "block";}else{document.getElementById("azex--coupon--containter").style.display = "none";}} function azex_coupon_copy(e){var text=e.querySelector(".azex--citem--code").dataset.couponcode; if(window.clipboardData && window.clipboardData.setData) { return clipboardData.setData("Text", text);} else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {var textarea = document.createElement("textarea");textarea.textContent = text;textarea.style.position = "fixed";document.body.appendChild(textarea);textarea.select();try {return document.execCommand("copy");} catch (ex) {console.warn("Copy to clipboard failed.", ex);return false;} finally {document.body.removeChild(textarea);e.querySelector(".azex--citem--code").textContent = "codice copiato!";  e.querySelector(".azex--citem--code").style.color="#fff"; e.querySelector(".azex--citem--code").style.background="#f60"; setTimeout(function(){ e.querySelector(".azex--citem--code").style.background = "#f60"; var cstorelink = "https://www.azcoupon.it/go/"+e.querySelector(".azex--cstore--link").textContent+"/"; window.open(cstorelink);}, 500); }}}</script>';

        $('body').append(couponhtml); 
    }
}