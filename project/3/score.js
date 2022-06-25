let FAIL = function( msg ){
    return {"pass":false, "message":msg};
}

let PASS = function(){
    return {"pass":true, "message":"通过"};
}

let makeErrMsgOneline = function( name, value ){
    let msg = "";
    if( value != null ){
        msg += name;
        msg += ": ";
        msg += value;
        msg += "<br>";
    }
    return msg;
}

let makeErrMsg = function( title, input, expect, got ){
    let msg = "";
    msg += title;
    msg += "<br>";
    msg += makeErrMsgOneline("input",input);
    msg += makeErrMsgOneline("expect",expect);
    msg += makeErrMsgOneline("got",got);
    return msg;
}

let checkFunction = function( fn, args, expect ){
    let ret = fn.apply(this,args);
    if( JSON.stringify(ret) == JSON.stringify(expect) ){
        return PASS();
    }
    else{
        return FAIL(makeErrMsg(
            "未通过",
            JSON.stringify(args),
            JSON.stringify(expect),
            JSON.stringify(ret)));
    }
}

let checkTagCollection = function( tagname, collection, length ){
    if( collection.length != length ){
        return FAIL(
            makeErrMsg(
                "未通过<br>"+tagname+"数目不对",
                null,
                length.toString(),
                collection.length.toString())
            );
    }
    return PASS();
}

let checkTrContent = function( tr, values ){
    let tds = tr.getElementsByTagName("td");
    let ret = checkTagCollection("td", tds, values.length);
    if( !ret.pass ){
        return ret;
    }
    for( let i=0; i<tds.length; ++i){
        let td = tds[i];
        let v = values[i];
        if( td.innerText != v){
            return FAIL(
                makeErrMsg(
                    "未通过<br>"+"第"+(i+1).toString()+"格 内容不对：",
                    null,
                    v,
                    td.innerText
                )
            );
        }
    }
    return PASS();
}

let checkTableRows = function( tag, matrix ){
    let trs = tag.getElementsByTagName("tr");
    let ret = checkTagCollection("tr",trs, matrix.length);
    if( !ret.pass ){
        return ret;
    }
    for( let i=0; i<trs.length; ++i ){
        let ret = checkTrContent(trs[i],matrix[i]);
        if( !ret.pass ){
            ret.message = "未通过：<br>"+"第"+(i+1).toString()+"行不正确。<br>"+ret.message;
            return ret;
        }
    }
    return PASS();
}

let checkSolution = function( suit ){
    fn = suit.fn;
    cases = suit.cases;
    for( let i=0; i<cases.length; ++i ){
        let ret = checkFunction(fn, cases[i].input, cases[i].expect);
        cases[i].pass = ret.pass;
        cases[i].message = ret.message;
    }
}

let isSuitPassed = function( suit ){
    for( let i=0; i<suit.cases.length; ++i){
        if( !suit.cases[i].pass ){
            return false;
        }
    }
    return true;
}

let makeCase = function( trigger_params, checker_params ){
    return {
        trigger_params:trigger_params,
        checker_params:checker_params
    }
}

let makeSuitTableCheck = function( reqNo, trigger, tbody_id, params, result ){
    let cases = []
    for( let i=0; i<params.length; ++i ){
        cases.push(makeCase(params[i],result[i]));
    }
    return{
        reqNo:reqNo,
        trigger:trigger,
        checker:checkTagTableRow(document.getElementById(tbody_id)),
        cases:cases
    }
}

let makeSuitFunctionCheck = function( reqNo, fn, params, result ){
    let cases = []
    for( let i=0; i<params.length; ++i ){
        cases.push(makeCase(params[i],result[i]));
    }
    return{
        reqNo:reqNo,
        trigger:fn,
        checker:function( ret, args, expect ){
            if( JSON.stringify(ret) == JSON.stringify(expect) ){
                return PASS();
            }
            else{
                return FAIL(makeErrMsg(
                    "未通过",
                    JSON.stringify(args),
                    JSON.stringify(expect),
                    JSON.stringify(ret)));
            }
        },
        cases:cases
    }
}

let runCase = function( test_case, trigger, checker ){
    let ret = trigger( ...test_case.trigger_params );
    return checker(ret, test_case.trigger_params, test_case.checker_params);
}

let runCases = function( cases, trigger, checker ){
    for( let i=0; i<cases.length; ++i){
        let ret = runCase(cases[i], trigger, checker );
        if(!ret.pass){
            return ret;
        }
    }
    return PASS();
}

let checkTagTableRow = function( tag ){
    return function(trigger_params, ret, result){
        let res = checkTableRows( tag, result );
        tag.innerHTML = "";
        return res;
    }
}

let checkSuits = function( tagid, suits ){
    let tag = document.getElementById(tagid);
    let src = "";
    for( let i=0; i<suits.length; ++i){
        suit = suits[i];
        let ret = PASS();
        try{
            ret = runCases( suit.cases, suit.trigger, suit.checker );
        }catch(e){
            err_msg = "运行期错误：<br>";
            err_msg += e.message;
            err_msg += "<br>具体信息查看console输出"
            console.log(e);
            ret = FAIL(err_msg);
        }
        src += "<tr class='";
        if(ret.pass){
            src += "correct";
        }
        else{
            src += "wrong";
        }
        src += "'>"
        src += "<td>"+suit.reqNo+"</td>";
        let fn = suit.trigger.name;
        src += "<td>"+fn+"</td>";
        src += "<td>"+ret.message+"</td>";
        src += "</tr>";
    }
    tag.innerHTML = src;
}