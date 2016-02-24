Template.managesurvey.events({
	'change #answertype': function(e,tpl){
		var answer=tpl.$("#answertype").val();
		//alert(answer);
		Session.set("ANSWERTYPE",answer);
		Session.set("ROWANSWER","");
	},
	'click #btnAddRow': function(e,tpl){
		e.preventDefault();
		var numberRow=tpl.$("#txtRow").val();
		//alert(numberRow);
		Session.set("ROWANSWER",numberRow);
	},
	'click #btnpreview': function(e,tpl){
		e.preventDefault();
		var string_html='';
		var getPreAnswer='';
		var an_html = '';
		var question =$('#txtquestion').val();
		var str_question ='<div class="col-md-12 dataquestion" data-q="'+question+'">Question:'+question+'</div>';
		var i = 0;
		$(".answer .txtanswer").each(function(){
			var answer = $(this).val();
			i++;
			console.log( answer);
			an_html +='<div class="col-md-12 dataanswer" data-an="'+answer+'">Answer'+i+': '+answer+'</div>';
		});
		string_html += '<div class="groupquestion">';
		string_html += str_question;
		string_html += an_html;
		string_html +='</div>';
		//getPreAnswer='<tbody><tr>'+string_html+'</tr></tbody>';
		//Session.set("PREVIEWANSWER",getPreAnswer);
		$("#allsurvey").append(string_html);

	},
	'click #submit_survey':function(e,tpl){
		e.preventDefault();
		$('#allsurvey .groupquestion').each( function(){
			var myquestion = $(this).children('.dataquestion').attr('data-q');
			var arr_answer = [];
			$(this).children('.dataanswer').each( function(){
				arr_answer.push( $(this).attr('data-an') );
			}) 
			console.log('question:'+myquestion);
			console.log(arr_answer);

		});
		
	}
});
Template.managesurvey.helpers({
    getAnswerType: function(){
        var getType=Session.get("ANSWERTYPE");
        var html='';
        if(getType==1){
        	return ;
        }else if (getType==2){
        	html+="<label>How many Answer:</label><input type='text' class='form-control' id='txtRow'/><button id='btnAddRow'>Add</button>"
        	return html;
        }else if(getType==3){
        	return;
        }else{
        	return ;
        }
    },
    getAddRow: function(){
    	var numberRow=Number(Session.get("ROWANSWER"));
    	var getType=Session.get("ANSWERTYPE"); 
    	if(getType==2){
	    	var html='';
	    	for (i=0;i<numberRow;i++){
	    		html+='<label> Answer: '+(i+1)+':</label><input type="text" class="form-control txtanswer" data-answer="answer'+i+'"><br>';
	    	}
	    	return html;
	    }

    }
});