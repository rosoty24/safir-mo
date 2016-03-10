TAPi18n.publish("categories", function() { //console.log('categories:'+categories.find({}).fetch().length);
    return categories.i18nFind({});
});
//Meteor.publish('products', function (limit){
TAPi18n.publish('productsFavorite', function(limit, id) {
    if (limit != -1) {
        return products.i18nFind({}, { limit: limit }); //return products.find({},{limit:limit});
    } else {
        var fav = favorite.find({ userId: id });
        var favId = [];
        fav.forEach(function(l) {
            favId = favId.concat(l.proId);
        });
        return products.find({ _id: { $in: favId } });
    }
});
TAPi18n.publish('products', function(limit) {
    if (limit != -1)
        return products.i18nFind({}, { limit: limit }); //return products.find({},{limit:limit});
    else
        return products.i18nFind({});
});
Meteor.publish('productsHome', function(limit) {
    if (limit != -1) {
        return products.find({}, { limit: limit, fields: { _id: 1, title: 1, image: 1 } }); //return products.find({},{limit:limit});
    } else {
        var lp = list_product.find({});
        var arrLp = [];
        lp.forEach(function(l) {
            arrLp = arrLp.concat(l.products);
        });
        return products.find({ _id: { $in: arrLp } });
    }
});
Meteor.publish('productsDetails', function(limit, title) {
    if (limit == -1 && title) {
        var p = products.findOne({ "title": title });
        return products.find({ $or: [{ "title": title }, { category: p.category }] });
    } else {
        return products.find({});
    }
});
Meteor.publish('productsCategory', function(limit, name) {
    if (limit == -1 && name) {
        var l = categories.findOne({ "title": name });
        if (l == null) {
            var title = name;
            title = title.replace(/\-/g, " ");
            title = title.replace(/\(percentag\)/g, "%");
            title = title.replace(/\(plush\)/g, "+");
            title = title.replace(/\(ocir\)/g, "ô");
            title = title.replace(/\(minus\)/g, "-");
            title = title.replace(/\(copyright\)/g, "®");
            title = title.replace(/\(number\)/g, "°");
            title = title.replace(/\(bigocir\)/g, "Ô");
            title = title.replace(/\(square\)/g, "²");
            title = title.replace(/\(accentaigu\)/g, "`");
            title = title.replace(/\(eaccentaigu\)/g, "é");
            title = title.replace(/\(bigeaccentaigu\)/g, "É");
            title = title.replace(/\(and\)/g, "&");
            title = title.replace(/\(slash\)/g, "/");
            title = title.replace(/\(apostrophe\)/g, "’");
            title = title.replace(/\(quote\)/g, "'");
            title = title.replace(/\(warning\)/g, "!");
            title = title.replace(/\(question\)/g, "?");
            title = title.replace(/\(dolla\)/g, "$");
            title = title.replace(/\(eaccentgrave\)/g, "è");
            title = title.replace(/\(hyphen\)/g, "–");
            l = categories.findOne({ "i18n.en.title": title });
        }
        var finalList = [];
        finalList.push(l._id);
        // //console.log('papa:'+l._id);
        var lvl1 = categories.find({ "parent": l._id }).fetch();
        ////console.log('papa:'+parent+' / '+categories.find({"parent":parent}).fetch().length);
        for (var i = 0; i < lvl1.length; i++) {
            // //console.log('lvl1');
            var cur1 = lvl1[i]._id;
            finalList.push(cur1);
            var lvl2 = categories.find({ "parent": cur1 }).fetch();
            for (var j = 0; j < lvl2.length; j++) {
                // //console.log('lvl2');
                var cur2 = lvl2[j]._id;
                finalList.push(cur2);
                var lvl3 = categories.find({ "parent": cur2 }).fetch();
                for (var k = 0; k < lvl3.length; k++) {
                    // //console.log('lvl3');
                    var cur3 = lvl3[k]._id;
                    finalList.push(cur3);
                    var lvl4 = categories.find({ "parent": cur3 }).fetch();
                    for (var l = 0; l < lvl4.length; l++) {
                        // //console.log('lvl4');
                        var cur4 = lvl4[l]._id;
                        finalList.push(cur4);
                    }
                }
            }
        }
        return products.find({ category: { $in: finalList } }); //return products.find({},{limit:limit});
    } else {
        return products.find({});
    }
});

Meteor.publish('images', function() {
    return images.find({});
});

Meteor.publish('shops', function() {
    return shops.find({})
});
TAPi18n.publish('categoryParent_tags', function(name) {
    if (name) {
        var l = categories.findOne({ "title": name });
        if (l == null) {
            var title = name;
            title = title.replace(/\-/g, " ");
            title = title.replace(/\(percentag\)/g, "%");
            title = title.replace(/\(plush\)/g, "+");
            title = title.replace(/\(ocir\)/g, "ô");
            title = title.replace(/\(minus\)/g, "-");
            title = title.replace(/\(copyright\)/g, "®");
            title = title.replace(/\(number\)/g, "°");
            title = title.replace(/\(bigocir\)/g, "Ô");
            title = title.replace(/\(square\)/g, "²");
            title = title.replace(/\(accentaigu\)/g, "`");
            title = title.replace(/\(eaccentaigu\)/g, "é");
            title = title.replace(/\(bigeaccentaigu\)/g, "É");
            title = title.replace(/\(and\)/g, "&");
            title = title.replace(/\(slash\)/g, "/");
            title = title.replace(/\(apostrophe\)/g, "’");
            title = title.replace(/\(quote\)/g, "'");
            title = title.replace(/\(warning\)/g, "!");
            title = title.replace(/\(question\)/g, "?");
            title = title.replace(/\(dolla\)/g, "$");
            title = title.replace(/\(eaccentgrave\)/g, "è");
            title = title.replace(/\(hyphen\)/g, "–");
            l = categories.findOne({ "i18n.en.title": title });
        }
        var finalList = [];
        finalList.push(l._id);
        // //console.log('papa:'+l._id);
        var lvl1 = categories.find({ "parent": l._id }).fetch();
        ////console.log('papa:'+parent+' / '+categories.find({"parent":parent}).fetch().length);
        for (var i = 0; i < lvl1.length; i++) {
            // //console.log('lvl1');
            var cur1 = lvl1[i]._id;
            finalList.push(cur1);
            var lvl2 = categories.find({ "parent": cur1 }).fetch();
            for (var j = 0; j < lvl2.length; j++) {
                // //console.log('lvl2');
                var cur2 = lvl2[j]._id;
                finalList.push(cur2);
                var lvl3 = categories.find({ "parent": cur2 }).fetch();
                for (var k = 0; k < lvl3.length; k++) {
                    // //console.log('lvl3');
                    var cur3 = lvl3[k]._id;
                    finalList.push(cur3);
                    var lvl4 = categories.find({ "parent": cur3 }).fetch();
                    for (var l = 0; l < lvl4.length; l++) {
                        // //console.log('lvl4');
                        var cur4 = lvl4[l]._id;
                        finalList.push(cur4);
                    }
                }
            }
        }
        return parent_tags.i18nFind({ category_id: { $in: finalList } }, { fields: { _id: 1, title: 1, category_id: 1 } });

    } else {
        return parent_tags.i18nFind({}, { fields: { _id: 1, title: 1, category_id: 1 } });
    }
    // return parent_tags.i18nFind({},{fields:{_id:1,title:1,category_id:1}});
});
TAPi18n.publish('detailsParent_tags', function(title) {
    if (title) {
        var p = products.findOne({ "title": { $regex: new RegExp(title, "i") } });
        var finalList = [];
        finalList.push(p.category);
        // //console.log('papa:'+l._id);
        var lvl1 = categories.find({ "parent": p.category }).fetch();
        ////console.log('papa:'+parent+' / '+categories.find({"parent":parent}).fetch().length);
        for (var i = 0; i < lvl1.length; i++) {
            // //console.log('lvl1');
            var cur1 = lvl1[i]._id;
            finalList.push(cur1);
            var lvl2 = categories.find({ "parent": cur1 }).fetch();
            for (var j = 0; j < lvl2.length; j++) {
                // //console.log('lvl2');
                var cur2 = lvl2[j]._id;
                finalList.push(cur2);
                var lvl3 = categories.find({ "parent": cur2 }).fetch();
                for (var k = 0; k < lvl3.length; k++) {
                    // //console.log('lvl3');
                    var cur3 = lvl3[k]._id;
                    finalList.push(cur3);
                    var lvl4 = categories.find({ "parent": cur3 }).fetch();
                    for (var l = 0; l < lvl4.length; l++) {
                        // //console.log('lvl4');
                        var cur4 = lvl4[l]._id;
                        finalList.push(cur4);
                    }
                }
            }
        }
        return parent_tags.i18nFind({ category_id: { $in: finalList } });
    } else {
        return parent_tags.i18nFind({});
    }
    // return parent_tags.i18nFind({},{fields:{_id:1,title:1,category_id:1}});
});
TAPi18n.publish('parent_tags', function() {
    return parent_tags.i18nFind({}, { fields: { _id: 1, title: 1, category_id: 1 } });
});
TAPi18n.publish('categoryTags', function(name) {
    if (name) {
        var l = categories.findOne({ "title": { $regex: new RegExp(name, "i") } });
        if (l == null) {
            var title = name;
            title = title.replace(/\-/g, " ");
            title = title.replace(/\(percentag\)/g, "%");
            title = title.replace(/\(plush\)/g, "+");
            title = title.replace(/\(ocir\)/g, "ô");
            title = title.replace(/\(minus\)/g, "-");
            title = title.replace(/\(copyright\)/g, "®");
            title = title.replace(/\(number\)/g, "°");
            title = title.replace(/\(bigocir\)/g, "Ô");
            title = title.replace(/\(square\)/g, "²");
            title = title.replace(/\(accentaigu\)/g, "`");
            title = title.replace(/\(eaccentaigu\)/g, "é");
            title = title.replace(/\(bigeaccentaigu\)/g, "É");
            title = title.replace(/\(and\)/g, "&");
            title = title.replace(/\(slash\)/g, "/");
            title = title.replace(/\(apostrophe\)/g, "’");
            title = title.replace(/\(quote\)/g, "'");
            title = title.replace(/\(warning\)/g, "!");
            title = title.replace(/\(question\)/g, "?");
            title = title.replace(/\(dolla\)/g, "$");
            title = title.replace(/\(eaccentgrave\)/g, "è");
            title = title.replace(/\(hyphen\)/g, "–");
            l = categories.findOne({ "i18n.en.title": title });
        }
        var finalList = [];
        finalList.push(l._id);
        var lvl1 = categories.find({ "parent": l._id }).fetch();
        ////console.log('papa:'+parent+' / '+categories.find({"parent":parent}).fetch().length);
        for (var i = 0; i < lvl1.length; i++) {
            // //console.log('lvl1');
            var cur1 = lvl1[i]._id;
            finalList.push(cur1);
            var lvl2 = categories.find({ "parent": cur1 }).fetch();
            for (var j = 0; j < lvl2.length; j++) {
                // //console.log('lvl2');
                var cur2 = lvl2[j]._id;
                finalList.push(cur2);
                var lvl3 = categories.find({ "parent": cur2 }).fetch();
                for (var k = 0; k < lvl3.length; k++) {
                    // //console.log('lvl3');
                    var cur3 = lvl3[k]._id;
                    finalList.push(cur3);
                    var lvl4 = categories.find({ "parent": cur3 }).fetch();
                    for (var l = 0; l < lvl4.length; l++) {
                        // //console.log('lvl4');
                        var cur4 = lvl4[l]._id;
                        finalList.push(cur4);
                    }
                }
            }
        }
        var pt = parent_tags.i18nFind({ category_id: { $in: finalList } }, { fields: { _id: 1, title: 1, category_id: 1 } });
        var arrTag = [];
        pt.forEach(function(t) {
            if (t._id) {
                arrTag.push(t._id);
            }
        });
        return tags.i18nFind({ parent: { $in: arrTag } }, { fields: { _id: 1, title: 1, parent: 1, categoryId: 1 } });
    } else {
        return tags.i18nFind({}, { fields: { _id: 1, title: 1, parent: 1, categoryId: 1 } });
    }
});
TAPi18n.publish('detailsTags', function(title) {
    if (title) {
        var p = products.findOne({ "title": { $regex: new RegExp(title, "i") } });
        var finalList = [];
        finalList.push(p.category);
        // //console.log('papa:'+l._id);
        var lvl1 = categories.find({ "parent": p.category }).fetch();
        ////console.log('papa:'+parent+' / '+categories.find({"parent":parent}).fetch().length);
        for (var i = 0; i < lvl1.length; i++) {
            // //console.log('lvl1');
            var cur1 = lvl1[i]._id;
            finalList.push(cur1);
            var lvl2 = categories.find({ "parent": cur1 }).fetch();
            for (var j = 0; j < lvl2.length; j++) {
                // //console.log('lvl2');
                var cur2 = lvl2[j]._id;
                finalList.push(cur2);
                var lvl3 = categories.find({ "parent": cur2 }).fetch();
                for (var k = 0; k < lvl3.length; k++) {
                    // //console.log('lvl3');
                    var cur3 = lvl3[k]._id;
                    finalList.push(cur3);
                    var lvl4 = categories.find({ "parent": cur3 }).fetch();
                    for (var l = 0; l < lvl4.length; l++) {
                        // //console.log('lvl4');
                        var cur4 = lvl4[l]._id;
                        finalList.push(cur4);
                    }
                }
            }
        }
        var pt = parent_tags.i18nFind({ category_id: { $in: finalList } });

        var arrTag = [];
        pt.forEach(function(t) {
            if (t._id) {
                arrTag.push(t._id);
            }
        });
        return tags.i18nFind({ parent: { $in: arrTag } });
    } else {
        return tags.i18nFind({});
    }
});
TAPi18n.publish('tags', function() {
    return tags.i18nFind({}, { fields: { _id: 1, title: 1, parent: 1, categoryId: 1 } });
});
Meteor.publish('stats', function() {
    return stats.find({});
});
Meteor.publish('answerquizz', function() {
    return answerquizz.find({ "userId": this.userId });
});
Meteor.publish('quizzQA', function() {
    return quizzQA.find({});
});
Meteor.publish("attributeCategory", function(name) {
    if (name) {
        var l = categories.findOne({ "title": name });
        if (l == null) {
            var title = name;
            title = title.replace(/\-/g, " ");
            title = title.replace(/\(percentag\)/g, "%");
            title = title.replace(/\(plush\)/g, "+");
            title = title.replace(/\(ocir\)/g, "ô");
            title = title.replace(/\(minus\)/g, "-");
            title = title.replace(/\(copyright\)/g, "®");
            title = title.replace(/\(number\)/g, "°");
            title = title.replace(/\(bigocir\)/g, "Ô");
            title = title.replace(/\(square\)/g, "²");
            title = title.replace(/\(accentaigu\)/g, "`");
            title = title.replace(/\(eaccentaigu\)/g, "é");
            title = title.replace(/\(bigeaccentaigu\)/g, "É");
            title = title.replace(/\(and\)/g, "&");
            title = title.replace(/\(slash\)/g, "/");
            title = title.replace(/\(apostrophe\)/g, "’");
            title = title.replace(/\(quote\)/g, "'");
            title = title.replace(/\(warning\)/g, "!");
            title = title.replace(/\(question\)/g, "?");
            title = title.replace(/\(dolla\)/g, "$");
            title = title.replace(/\(eaccentgrave\)/g, "è");
            title = title.replace(/\(hyphen\)/g, "–");
            l = categories.findOne({ "i18n.en.title": title });
        }
        var finalList = [];
        finalList.push(l._id);
        var lvl1 = categories.find({ "parent": l._id }).fetch();
        ////console.log('papa:'+parent+' / '+categories.find({"parent":parent}).fetch().length);
        for (var i = 0; i < lvl1.length; i++) {
            // //console.log('lvl1');
            var cur1 = lvl1[i]._id;
            finalList.push(cur1);
            var lvl2 = categories.find({ "parent": cur1 }).fetch();
            for (var j = 0; j < lvl2.length; j++) {
                // //console.log('lvl2');
                var cur2 = lvl2[j]._id;
                finalList.push(cur2);
                var lvl3 = categories.find({ "parent": cur2 }).fetch();
                for (var k = 0; k < lvl3.length; k++) {
                    // //console.log('lvl3');
                    var cur3 = lvl3[k]._id;
                    finalList.push(cur3);
                    var lvl4 = categories.find({ "parent": cur3 }).fetch();
                    for (var l = 0; l < lvl4.length; l++) {
                        // //console.log('lvl4');
                        var cur4 = lvl4[l]._id;
                        finalList.push(cur4);
                    }
                }
            }
        }
        var lp = products.find({ category: { $in: finalList } }); //return products.find({},{limit:limit});
        var arrLp = [];
        lp.forEach(function(l) {

            if (l.oldId) {
                arrLp = arrLp.concat(l.oldId);
            }
        });
        return attribute.find({ product: { $in: arrLp } });
    } else {
        return attribute.find({});
    }
});
Meteor.publish("attributeHome", function(product) {

    var allProdOldId = [];
    var list = list_product.find({}).fetch();
    // //console.log('HOME:'+list.length);
    for (var j = 0; j < list.length; j++) {
        var currentList = list[j];

        for (var i = 0; i < currentList.products.length; i++) {
            var current = products.findOne({ _id: currentList.products[i] });

            allProdOldId.push(current.oldId);
        }
    }

    return attribute.find({ "product": { $in: allProdOldId } });

});
Meteor.publish("attributeProDetails", function(product, title) {

    if (product == -1 && title) {
        ////console.log('publish: '+title);
        var old = products.findOne({ "title": { $regex: new RegExp(title, "i") } });
        return attribute.find({ "product": old.oldId });
        // return attribute.find({});
    } else {
        var old = products.findOne({ "title": product }, { fields: { _id: 1, title: 1, image: 1 } });
        ////console.log('SOUSCRIRE A '+old.oldId);
        return attribute.find({ "product": old.oldId }, { fields: { _id: 1, product: 1, parent: 1, productImage: 1 } });
    }

});
TAPi18n.publish("parentattr", function() {
    return parentattr.i18nFind({});
});
TAPi18n.publish("parentattrProDetails", function() {
    return parentattr.i18nFind({});
});

Meteor.publish("users", function(tab) {
    if (tab == null)
        tab = [];
    tab.push(this.userId);
    if (tab[0] == -1)
        return Meteor.users.find();
    return Meteor.users.find({ "_id": { $in: tab } });
});


Meteor.publish("cart", function(id) {
    return cart.find({ "userId": id });
});
//contents
Meteor.publish("contentsWebzineDetial", function(title) {
   return contents.find({ "title": { $regex: new RegExp("^" + title, "i") } });
});
Meteor.publish("contents", function() {
    return contents.find({});
});
Meteor.publish("contentsProDetails", function() {
    return contents.find({});
});
Meteor.publish("contents_type", function() {
    return contents_type.find({});
});
// address
Meteor.publish("address", function() {
    return address.find({});
});
Meteor.publish("favoriteCategory", function(name) {
    if (name) {
        var l = categories.findOne({ "title": name });
        if (l == null) {
            var title = name;
            title = title.replace(/\-/g, " ");
            title = title.replace(/\(percentag\)/g, "%");
            title = title.replace(/\(plush\)/g, "+");
            title = title.replace(/\(ocir\)/g, "ô");
            title = title.replace(/\(minus\)/g, "-");
            title = title.replace(/\(copyright\)/g, "®");
            title = title.replace(/\(number\)/g, "°");
            title = title.replace(/\(bigocir\)/g, "Ô");
            title = title.replace(/\(square\)/g, "²");
            title = title.replace(/\(accentaigu\)/g, "`");
            title = title.replace(/\(eaccentaigu\)/g, "é");
            title = title.replace(/\(bigeaccentaigu\)/g, "É");
            title = title.replace(/\(and\)/g, "&");
            title = title.replace(/\(slash\)/g, "/");
            title = title.replace(/\(apostrophe\)/g, "’");
            title = title.replace(/\(quote\)/g, "'");
            title = title.replace(/\(warning\)/g, "!");
            title = title.replace(/\(question\)/g, "?");
            title = title.replace(/\(dolla\)/g, "$");
            title = title.replace(/\(eaccentgrave\)/g, "è");
            title = title.replace(/\(hyphen\)/g, "–");
            l = categories.findOne({ "i18n.en.title": title });
        }
        var finalList = [];
        finalList.push(l._id);
        var lvl1 = categories.find({ "parent": l._id }).fetch();
        ////console.log('papa:'+parent+' / '+categories.find({"parent":parent}).fetch().length);
        for (var i = 0; i < lvl1.length; i++) {
            // //console.log('lvl1');
            var cur1 = lvl1[i]._id;
            finalList.push(cur1);
            var lvl2 = categories.find({ "parent": cur1 }).fetch();
            for (var j = 0; j < lvl2.length; j++) {
                // //console.log('lvl2');
                var cur2 = lvl2[j]._id;
                finalList.push(cur2);
                var lvl3 = categories.find({ "parent": cur2 }).fetch();
                for (var k = 0; k < lvl3.length; k++) {
                    // //console.log('lvl3');
                    var cur3 = lvl3[k]._id;
                    finalList.push(cur3);
                    var lvl4 = categories.find({ "parent": cur3 }).fetch();
                    for (var l = 0; l < lvl4.length; l++) {
                        // //console.log('lvl4');
                        var cur4 = lvl4[l]._id;
                        finalList.push(cur4);
                    }
                }
            }
        }
        var lp = products.find({ category: { $in: finalList } }, { fields: { _id: 1, Brand: 1, category: 1, description: 1, image: 1, price: 1, title: 1 } }); //return products.find({},{limit:limit});
        var arrLp = [];
        lp.forEach(function(l) {
            arrLp = arrLp.concat(l._id);
        });
        return favorite.find({ proId: { $in: arrLp } });
    } else {
        return favorite.find({});
    }

});
Meteor.publish("favoriteHome", function() {
    var lp = list_product.find({});
    var arrLp = [];
    lp.forEach(function(l) {
        arrLp = arrLp.concat(l.products);
    });
    return favorite.find({ proId: { $in: arrLp } });
});
Meteor.publish("favorite", function(id) {
    return favorite.find({ userId: id });
});
Meteor.publish("role", function() {
    return Meteor.roles.find({});

});
//Question
Meteor.publish("question", function() {
    return question.find({});
});

Meteor.publish("journey", function() {
    return journey.find({});
});

Meteor.publish("linkselling", function() {
    return linkselling.find({});
});

Meteor.publish("membershipcard", function() {
    return membershipcard.find({});
});

TAPi18n.publish("list_product", function() {
    return list_product.i18nFind({});
});

Meteor.publish('attribute_value', function() {
    return attribute_value.find({});
});

Meteor.publish('translation', function() {
    return translation.find({});
});

Meteor.publish('payments', function() {
    return payments.find({});
});
Meteor.publish('banner', function() {
    return banner.find({});
});
Meteor.publish('daily', function() {
    return daily.find({});
});
Meteor.publish('imedation', function() {
    return imedation.find({});
});
Meteor.publish('anwser', function() {
    return anwser.find({});
});

Meteor.publish('barcode', function() {
    return barcode.find({});
});

Meteor.publish('userTracking', function(skip, field1, field2, field3) {
    if (field1 && field2 && field3 != null) {
        return userTracking.find({ time: { $gt: field2, $lt: field3 } }, { skip: skip, limit: 20 });
    }
    if (field1 && field2 && field3 == null) {
        if (field1 == "ip") {
            return userTracking.find({ ip: field2 }, { skip: skip, limit: 20 });
        }
        if (field1 == "currenturl") {
            return userTracking.find({ currenturl: { $regex: field2, $options: 'i' } }, { skip: skip, limit: 20 });
        }
        if (field1 == "location") {
            return userTracking.find({ location: field2 }, { skip: skip, limit: 20 });
        }
        if (field1 == "userId") {
            return userTracking.find({ userId: field2 }, { skip: skip, limit: 20 });
        }
    } else {
        return userTracking.find({}, { skip: skip, limit: 20 });

    }
});

Meteor.publish('mouse', function() {
    return mouse.find({});
});
Meteor.publish('quizz', function() {
    return quizz.find({});
});
Meteor.publish('tracking', function() {
    return tracking.find({});
});

Meteor.publish('order', function() {
    return order.find({});
});
//stock publisher
Meteor.publish('stock', function(skip, sesShop, field, val) {
    if (val != "") {
        return stock.find({ Barcode: val }, { skip: skip, limit: 20 });
    } else if (field != "") {
        return stock.find({ RetailStoreName: field }, { skip: skip, limit: 20 });
    } else if (sesShop != "") {
        return stock.find({ RetailStoreName: sesShop }, { skip: skip, limit: 20 });
    } else
        return stock.find({}, { skip: skip, limit: 20 });
});
Meteor.publish('products_node', function() {
    return products_node.find({});
});
Meteor.publish('discount', function() {
    return discount.find({});
});
Meteor.publish('collect', function() {
    return collect.find({});
});
Meteor.publish("posts", function() {
    return posts.find({});
});
