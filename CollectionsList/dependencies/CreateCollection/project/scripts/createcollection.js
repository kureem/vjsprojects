function doSubmit($scope){
    $scope.textform.submit();
}


function adjustFields($scope){
    var data = $scope.criteria.getData();
    if(data == null || data.length == 0){
        data.push(getDefaultLine());
    }   
    $scope.criteria.setData(data);
}

function renderCells($scope, evt){
    if(evt.colIndex == 0){
        var select = new framework.components.bootstrap.input.Select('field');
        for(var i in templates){
            var template = templates[i];
            select.addOption(template.label, template.name);
        }
       // evt.data.fieldui = select;
        select.setUserData(evt.data);
        select.setValue(evt.data.field);
        select.on('change', function(e){
            var data = e.source.getUserData();
            data.field = e.source.getValue();
            $scope.criteria.setData($scope.criteria.getData());
        });
        evt.source.setHtml('');
        evt.source.addChild(select.setStyle('width','100%'));
    }else if(evt.colIndex == 1){
        var select = new framework.components.bootstrap.input.Select('operator');
        var field = evt.data.field;
        for(var i in templates){
            var template = templates[i];
            if(template.name === field){
                for(var j in template.operators){
                    var operator = template.operators[j];
                    select.addOption(operator.label, operator.name);
                }
                
            }
        }
        select.setUserData(evt.data);
        select.setValue(evt.data.operator);

        select.on('change', function(e){
            var data = e.source.getUserData();
            data.operator = e.source.getValue();
           // $scope.criteria.setData($scope.criteria.getData());
        });

        evt.source.setHtml('');
        evt.source.addChild(select.setStyle('width','100%'));
    }else if(evt.colIndex == 2){
        var field = evt.data.field;
        var uiInput;
        for(var i in templates){
            var template = templates[i];
            if(template.name === field){
                var sinput = template.input;
                if(sinput === 'text'){
                    uiInput = new framework.components.bootstrap.input.StringInput('input');
                    uiInput.setValue(evt.data.value + '');
                    uiInput.setUserData(evt.data);
                }else if(sinput === 'currency' || sinput === 'numeric'){
                    uiInput = new framework.components.bootstrap.input.NumericInput('input');
                    if(sinput === 'currency')
                        uiInput.setAttribute('step', '0.01');
                    uiInput.setValue(parseFloat( evt.data.value + ''));
                    uiInput.setUserData(evt.data);
                }
                break;
                
            }
        }

        if(uiInput){
            uiInput.setUserData(evt.data);
            uiInput.on('change', function(e){
                e.source.getUserData().value = e.source.getValue();
            })
        };

        evt.source.setHtml('');
        evt.source.addChild(uiInput.setStyle('width','100%'));
    }
}

function getDefaultLine(){
    var line = {
        field:"title",
        operator:"contains",
        value:""
    }
    return line;
}

var templates = [
	{
		name:"title",
		label:"Product Title",
		operators:[{name:"contains", label:"contains"}],
		input:"text"
	},
	{
		name:"type",
		label:"Product Type",
		operators:[{name:"contains", label:"contains"}],
		input:"text"
	},
	{
		name:"vendor",
		label:"Product Vendor",
		operators:[{name:"=", label:"Equals"}],
		input:"lookup:vendor"
	},
	{
		name:"price",
		label:"Product Price",
		operators:[{name:"=", label:"Equals"},{name:">", label:"Greater"},{name:"<", label:"Less"}],
		input:"currency"
	},
	{
		name:"tag",
		label:"Product Tag",
		operators:[{name:"=", label:"Equals"}],
		input:"text"
	},
	{
		name:"comparePrice",
		label:"Product Compare Price",
		operators:[{name:"=", label:"Equals"},{name:">", label:"Greater"},{name:"<", label:"Less"}],
		input:"currency"
	},
	{
		name:"quantity",
		label:"Stock Quantity",
		operators:[{name:"=", label:"Equals"},{name:">", label:"Greater"},{name:"<", label:"Less"}],
		input:"numeric"
	}
];