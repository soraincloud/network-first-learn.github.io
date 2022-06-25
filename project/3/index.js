//--------------要求1-------------------
function oneLineStr( count, input, max_n, min_n, result )
{
    s = "<tr>";
    s +="<td>";
    s +=count;
    s +="</td>";
    s +="<td>";
    s +=input;
    s +="</td>";
    s +="<td>";
    s +=max_n;
    s +="</td>";
    s +="<td>";
    s +=min_n;
    s +="</td>";
    s +="<td>";
    s +=result;
    s +="</td>";
    s += "</tr>";
    return s;
}

function testReq1()
{
    document.getElementById("req1").innerHTML = oneLineStr( 1, 2143, 1234, 4321, 3087) + oneLineStr( 1, 2143, 1234, 4321, 3087) + oneLineStr( 1, 2143, 1234, 4321, 3087) + oneLineStr( 1, 2143, 1234, 4321, 3087);
}

//--------------要求2-------------------
function getDigital_s(n)
{
    var m=[];
    o=n.toString();
    for(i=0;i<o.length;i++)
    {
        m.push(o[i]);
    }
    return m;
}

function getDigital_d(n)
{
    var m=[];
    i=0;
    num=n;
    while(1)
    {
        m[i]=num%10;
        i++;
        num/=10;
        num=parseInt(num);
        if(num<1)break;
    }
    m.reverse();
    return m;
}

//--------------要求3-------------------
function getDigitalMax_d(digital_list)
{
    m=[];
    m=digital_list;
    m.sort();
    m.reverse();
    a=0;
    for(i=0;i<m.length;i++)
    {
        a=a*10+m[i];
    }
    return a;
}

function getDigitalMax_s(digital_list)
{
    m=[],n=[];
    m=digital_list;
    for(i=0;i<m.length;i++)
    {
        m[i]-='0';
    }
    m.sort();
    m.reverse();
    a=0;
    for(i=0;i<m.length;i++)
    {
        a=a*10+m[i];
    }
    a+="";
    return a;
}

function getDigitalMin_d(digital_list)
{
    m=[];
    m=digital_list;
    m.sort();
    a=0;
    for(i=0;i<m.length;i++)
    {
        a=a*10+m[i];
    }
    return a;
}

function getDigitalMin_s(digital_list){
    m=[],n=[];
    m=digital_list;
    for(i=0;i<m.length;i++)
    {
        m[i]-='0';
    }
    m.sort();
    a=0;
    for(i=0;i<m.length;i++)
    {
        a=a*10+m[i];
    }
    a+="";
    return a;
}

//--------------要求4-------------------
function getMax_d(n)
{
    return getDigitalMax_d(getDigital_d(n));
}
function getMax_s(n)
{
    return getDigitalMax_s(getDigital_s(n));
}

function getMin_d(n){
    return getDigitalMin_d(getDigital_d(n));
}
function getMin_s(n)
{
    return getDigitalMin_s(getDigital_s(n));
}

//--------------要求5-------------------
onButtonClick = function()
{
    tag = document.getElementsByTagName("input")[0];
    x = tag.value;
    count=1;
    s=[];
    while(1)
    {
        max=getMax_d(x);
        min=getMin_d(x);
        result=max-min;
        s+=oneLineStr(count,x,max,min,result);
        x=result;
        if(result==6174)break;
        count++;
    }
    document.getElementById("output").innerHTML = s;
}
