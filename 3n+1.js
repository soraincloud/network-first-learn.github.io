var myChart = echarts.init(document.getElementById('main'));

option = 
{
    xAxis: 
    {
        type: 'category',
        data: [],
        name:'次数',
        nameLocation:'middle',
        nameTextStyle:
        {                
            color:"#777881", 
            fontSize:20,  
            padding:10
        }
        
    },
    yAxis: 
    {
        name:'取值',
        nameLocation:'middle',
        nameTextStyle:
        {
        color:"#777881", 
        fontSize:20,  
        padding:10
        }
    },
    series: 
    {
        data: [],
        type: 'line',
        label: 
        {
            show: true,
            position: 'bottom',
            textStyle: 
            {
                fontSize: 10
            }
        }
    }

};

let onClick = function()
{
    num = parseInt(document.getElementById("input").value);
    i = 0;

    while(1)
    {
        option.xAxis.data[i] = i + 1;
        option.series.data[i] = num;
        if(num % 2 == 0)
        {
            num = num / 2;
        }
        else
        {
            num = (num * 3 + 1) / 2;
        }
        i ++;
        if(num == 1)
        {
            break;
        }
    }
    myChart.setOption(option);
}