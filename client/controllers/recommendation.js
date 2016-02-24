Template.recommendation.helpers({
    
    products: function(categoryid){
        function shuffle(o){
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }
        var myArray=[];
        var resultRandom=[];
        var result=products.find({category:categoryid});
        result.forEach(function(value){
            myArray.push(value);
        });
        var arrayRandom=shuffle(myArray);
        for(var ran=0;ran<4;ran++){
            if(arrayRandom[ran]){
               resultRandom.push(arrayRandom[ran]); 
            }
            
        }
        return resultRandom;
    },
    getImage: function(id){

            var img = images.findOne({_id:id});
            console.log(img);
            
            if(img){
                console.log(img.copies.images.key);
                return img.copies.images.key;
            }else{
                return;
            }
    }
});