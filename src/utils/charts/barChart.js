export default (categories = [], data = [],times) => {
    const week =['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    function countmonth(){
        const month=[];
        for (let i=0;i<=times?.fate;i++)
            month.push(i);
        return month;
    }
    function suture(){
        const datalist=[];
        for(let i=0;i<categories.length;i++){
            datalist.push({
                name: categories[i],
                type: 'bar',
                data: data[i],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            });
        }
        return datalist;
    }
    return {
        title: {
            text: '上'+ times?.time +'订单数量',
            // subtext: '（非实时）'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            data: categories
        },
        grid: {
            left: '1%',
            right: '7%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: times?.fate>7 ?countmonth():week
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        dataZoom:times?.fate>7?[
            {
                type: 'slider',
                xAxisIndex: 0,
                start: 10,
                end: 60
            },
            {
                type: 'inside',
                xAxisIndex: 0,
                start: 10,
                end: 60
            }
        ]:[] ,
        series: suture()
    };
};