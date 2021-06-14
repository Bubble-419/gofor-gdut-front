export default (categories = [], data = [],times) => {
    function suture(){
        const datalist=[];
        for(let i=0;i<data.length;i++){
            datalist.push({
                name:categories[i],
                type: 'line',
                stack: '上'+times?.time+'单日总量',
                data:data[i]
            });
        }
        return datalist;
    }
    function countmonth(){
        const month=[];
        for (let i=0;i<=times?.fate;i++)
            month.push(i);
        return month;
    }
    const week =['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const DataList =suture();
    return {
        title: {
            text: '上'+ times?.time +'订单数量'
        },
        tooltip:{
            trigger:'item'
        },
        legend: {
            categories
        },
        grid: {
            left: '1%',
            right: '7%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                saveAsImage: {show: true}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: times?.fate>7 ?countmonth():week
        },
        yAxis: {
            type: 'value'
        },
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
        series: DataList
    }
}