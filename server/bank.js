
Meteor.startup(function () {
     process.env.MAIL_URL="smtp://houttyty7%40gmail.com:tytyhout7@smtp.gmail.com:465/";
});
Meteor.methods({
	verifyBank: function(reponse){
		var error = 0;
        var success = 0;
		if (reponse.state == 'OK') {
                    var check = receipts.find({ refnum: reponse.refnum }).fetch();
                    if (check.length > 0) {
                        error = 'Error this receipt exist already!';
                    } else {
                        receipts.insert(reponse);
                        var url = 'https://SEP.shaparak.ir/payments/referencepayment.asmx?WSDL';
                        var args = {
                            RefNum: reponse.refnum,
                            MID: reponse.mid
                        };
                        try {
                            var client = Soap.createClient(url);
                            var result = client.VerifyTransaction(args);
                            if (result < 0) {
                                switch (result) {
                                    case -1:
                                        error = 'Internal Error';
                                        break;
                                    case -2:
                                        error = 'Deposits are not alike';
                                        break;
                                    case -3:
                                        error = 'Inputs include invalid characters';
                                        break;
                                    case -4:
                                        error = 'Merchant Authentication Failed (user name or password is incorrect)';
                                        break;
                                    case -5:
                                        error = 'Database Exception';
                                        break;
                                    case -6:
                                        error = 'The transaction has been completely reversed already';
                                        break;
                                    case -7:
                                        error = 'RefNum is Null';
                                        break;
                                    case -8:
                                        error = 'Input length is more than allowed one';
                                        break;
                                    case -9:
                                        error = 'Invalid characters in reversed value';
                                        break;
                                    case -10:
                                        error = 'RefNum is not in form of Base64 (includes invalid characters)';
                                        break;
                                    case -11:
                                        error = 'Input length is less than allowed one';
                                        break;
                                    case -12:
                                        error = 'Reversed amount is negative';
                                        break;
                                    case -13:
                                        error = 'Reversed amount of a partial reverse is more than a non-reversed value of RefNum';
                                        break;
                                    case -14:
                                        error = 'The transaction is not recorded';
                                        break;
                                    case -15:
                                        error = 'Data type of reversed amount is double or float';
                                        break;
                                    case -16:
                                        error = 'Internal Error';
                                        break;
                                    case -17:
                                        error = 'Partial reversed of a transaction has been done by a bank card except for Saman card';
                                        break;
                                    case -18:
                                        error = 'Invalid IP address of merchant';
                                        break;
                                    default:
                                        error = 'VERIFY success!';
                                }
                            } else {
                                console.log("VERIFY...");
                                console.log(result);
                                var myInvoice = invoices.find({ resNum: reponse.resNum }).fetch();
                                if (myInvoice.length == 1) {
                                    myInvoice = myInvoice[0];
                                    if (myInvoice.amount == result) {
                                        //success
                                        success = 'Payment success! No error!';
                                    } else {
                                        error = 'The amount are different... Refund in progress';
                                        //reverseTransaction
                                        var newArg = {
                                            RefNum: reponse.refnum,
                                            MID: reponse.mid,
                                            Username: reponse.mid,
                                            Password: '9224397'
                                        }
                                        var statusReverse = client.ReverseTransaction(newArg);
                                        if (statusReverse == 1)
                                            error = error + ' Refund succes!';
                                        else
                                            error = error + ' Refund failed!';
                                    }
                                } else {
                                    error = 'Too much invoice with the same ID. Amount=' + result + ';ResNum=' + reponse.resNum;
                                }
                            }


                        } catch (err) {
                            if (err.error === 'soap-creation') {
                                console.log('SOAP Client creation failed');
                            } else if (err.error === 'soap-method') {
                                console.log('SOAP Method call failed');
                            }
                        }

                    }
                } else {
                    error = 'Transaction failed: ' + reponse.state;
                }

                //this.response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                //this.response.setHeader( 'access-control-allow-origin', '*' );
                if (success == 0) {
                    var html = '<div class="alert alert-success"><strong>Validated!</strong> Payment success!</div><a href="/checkout">Back to safir</a>';

                } else {
                    var html = '<div class="alert alert-danger"><strong>Error!</strong> The payment failed. Here is the reasons: ' + error + '</div><a href="/checkout">Back to safir</a>';

                }
                
                return html;
                //this.response.end(JSON.stringify(html));
	},
    sendMail:function(){
        this.unblock();
        Email.send({
          to: 'tinhamly@gmail.com',
          from: 'houttyty7@gmail.com',
          subject: 'banking',
          text: 'safir banking'
        });
    },
    earnPointShop:function(userid,point){
        return Meteor.users.update({_id:userid},{$set: {"profile.shipcard.point":point}});
    }
})