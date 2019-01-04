var accessToken;
var developerKey = 'AIzaSyDN0Jge2P3VSgiD4P5Mpv2DGckgrjsNFoI';
var clientId = '1051503511303-3d96627idvnjqo0l3bqd4h453amsopp0.apps.googleusercontent.com';
var appId = "1234567890";

function loadPicker(){
    //alert('loaded');
    gapi.load('picker', {'callback': onPickerApiLoad});
}

function onPickerApiLoad(){
//alert(JSON.stringify(accessToken));
setTimeout(function(){
       

        
        var folders = (new google.picker.DocsView(google.picker.ViewId.FOLDERS)).setParent("root").setIncludeFolders(true).setSelectFolderEnabled(true);
        var googledrives = (new google.picker.DocsView).setIncludeFolders(true).setSelectFolderEnabled(true).setMimeTypes('application/vnd.google-apps.folder');
        var teamdrives = (new google.picker.DocsView).setIncludeFolders(true).setEnableTeamDrives(true).setSelectFolderEnabled(true).setMimeTypes('application/vnd.google-apps.folder')
        var picker = new google.picker.PickerBuilder()
            .setAppId(appId)
            .setOAuthToken(accessToken.access_token)
            .enableFeature(google.picker.Feature.SUPPORT_TEAM_DRIVES)
            .addView(folders)
            .addView(googledrives)
            .addView(teamdrives)
            .setDeveloperKey(developerKey)
            .setCallback(pickerCallback)
            .setTitle('Select A Folder')
            .build();
        picker.setVisible(true);
    },0);
}

 function pickerCallback(data) {
    if (data.action == google.picker.Action.PICKED) {
        window.scope.$root.fireListener('selectFolderCallback',{'data':data});
    }
}