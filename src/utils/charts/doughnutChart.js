export default (data=[{name:'',value:0}],times) => ({
    title: {
        text: "各订单分类占比数",
        subtext: "上"+times+"订单数量（非实时）",
        textStyle: {
            fontSize: 24,
        },
        subtextStyle: {
            fontSize: 14,
        },
    },
    tooltip: {
        trigger: "item",
        padding: [14, 24],
        borderWidth: 1,
        textStyle: {
            fontWeight: "bold",
        },
    },
    graphic: [{
        type: 'text',
        left:"center",
        top: 'middle',
        z:0,
        style:{
            fontSize: '18',
            fontWeight: "bold",
            text:[
                '\n\n',
                '订单总数',
                data.reduce((temp,item)=>{
                    return temp + item.value
                },0)
            ].join('\n\n'),
            textAlign:'center'
        }
    }],
    series: [
        {
            type: "pie",
            radius: ["50%", "70%"],
            startAngle: 160,
            top: 60,
            label: {
                show: true,
                position: "outer",
                alignTo: "labelLine",
                edgeDistance: "3%",
                distanceToLabelLine: 20,
                // color: "hsl(0deg, 100%, 98%)",
                fontSize: 14,
                fontWeight: "bold",
                formatter: "{b} {d|{d}%}",
                rich: {
                    d: {
                        backgroundColor: "hsl(0deg, 100%, 70%)",
                        borderRadius: 4,
                        padding: [4, 8],
                        color: "white",
                        fontWeight: "bold",
                    },
                },
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 18,
                    fontWeight: "bold",
                },
            },
            labelLine: {
                length: 30,
                length2: "13%",
                smooth: true,
                lineStyle: {
                    type: "dashed",
                },
            },
            data: data,
        },
    ],
    backgroundColor: "transparent",
});