function adjusteProductLines($scope, evtdata){
    var data = $scope.productLines.getData();
    if(!data){
        data = [];
    }


    for(var i in evtdata){
        data.push(evtdata[i]);
    }
    //data.push(evtdata);
    $scope.productLines.setData(data);
}


function adjustQuantities($scope){
    var data = $scope.productLines.getData();
    var totalprice = 0;
    for(var i in data){
        var line = data[i];
        line.total = line.price*line.purchasedQuantity;
        totalprice = totalprice + line.total;
    }

    var discount = $scope.discount_input.getValue();
    var shipping = $scope.shipping_input.getValue();
    var tax = $scope.tax_input.getValue();

    if(!discount){
        discount = 0;
    }

    if(!shipping){
        shipping = 0;
    }

    if(!tax){
        tax = 0;
    }

    $scope.subtotal_input.setValue(totalprice - discount);

    $scope.discount.setHtml(discount + ' MUR');
    $scope.subtotal.setHtml((totalprice - discount) + ' MUR');
    $scope.shipping.setHtml(shipping + ' MUR');

    var netTotal = (totalprice - discount) + shipping;
    var taxAmount = (tax*netTotal)/100;
    var total = netTotal + taxAmount;

    $scope.tax.setHtml(taxAmount + ' MUR');
    $scope.total.setHtml(total +  ' MUR');

    $scope.productLines.setData(data);
}

function saveShipping($scope,evt){
    $scope.companyName.setHtml(evt.data.company);
    $scope.firstName.setHtml(evt.data.contactFirstName + ' ' + evt.data.contactLastName);
    $scope.postalCode.setHtml(evt.data.postalCode);
    $scope.address.setHtml(evt.data.address);
    $scope.street.setHtml(evt.data.street);
    $scope.city.setHtml(evt.data.city);
    $scope.region.setHtml(evt.data.region);
    $scope.country.setHtml(evt.data.country);



   
}