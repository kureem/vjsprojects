var categories = [
    {
        name:'Speakers',
        subcategories:[
            {name:'Bose'},
            {name:'Samsung'},
            {name:'Panasonic'}
        ]
    },
    {
        name:'Cables',
        subcategories:[
            {name:'electric'},
            {name: 'coaxial'},
            {name: 'microphone'}
        ]
    }

];

function buildCategoryItem($scope, thecat){
    var ui = buildListItem(thecat, true);
       
    $scope.categories.addDesignable(ui);
    ui.on('click', function(e){
        cat = e.source.getUserData();
        selectCategory(cat,$scope,e.source);
    });
    return ui;
}

function selectCategory(cat,$scope, uicat){
    clearActive($scope);
    uicat.getParent().addClass('active');
        //alert(cat);
    cat = uicat.getUserData();
    var subcategories = $scope.subcategories;
    subcategories.setUserData(cat);
    subcategories.clearChildren();
    subcategories.setRendered(false);
    for(var j in cat.subcategories){
        var sui = buildListItem(cat.subcategories[j],false);
        $scope.subcategories.addDesignable(sui);
    }
}


function clearActive($scope){
    for( var i in $scope.categories.getChildren()){
        $scope.categories.getChildren()[i].removeClass('active');
    }
}

function load($scope){
    $scope.colCategories.query({});
    
}

function buildListItem(data, iscategory){
    var ui = new framework.components.JSContainer(data.name,'div').addClass('toolbar');
    var label =new framework.components.JSContainer(data.name,'span').setHtml(data.name);
    ui.addChild(label);
    ui.setUserData(data);
    var delBtn = new framework.components.JSContainer(data.name, 'button').addClass('btn  btn-danger btn-sm');
    var title ='Delete this ';
    if(iscategory){
        title = title + ' Category';
    }else{
        title = title + ' Sub category';
    }
    ui.addChild(delBtn.setHtml('<span name="icon" id="25" identifier="html:p" class="oi oi-trash" title="'+title+'"></span>'));
    return ui;
}
