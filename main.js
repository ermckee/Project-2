$(document).ready(function(){
    const table = $('#dt-table').DataTable();
    const tableData = getTableData(table);
    createHighcharts(tableData);
    setTableEvents(table);  
    });
function getTableData(table) {
    const data = [],
    state = [],
    positive = [],
    death = [];
    table.rows({ search: "applied" }).every(function() {
    const data = this.data();
    state.push(data[0]);
    positive.push(parseInt(data[3].replace(/\,/g, "")));
    death.push(parseInt(data[5].replace(/\,/g, "")));
    });
    data.push(state, positive, death);
    return data;
    }
    function createHighcharts(data){
        Highcharts.chart("chart", {
        chart: {
        zoomType: 'xy'
        },
        title: {
        text: "FBI's Crime in the US"
        },
        subtitle: {
        text: "Preliminary Report of Crime in the US during the years 2018 and 2019"
        },
        xAxis: [
        {
        categories: data[0],
        labels: {
        rotation: -45
        }
        }
        ],
        yAxis: [
        {
        title: {
        text: "Category"
        }
        }
        ],
        series: [
        {
        name: "2018",
        type: "lollipop",
        data: data[1],
        color: "orange"
        },
        {
        name: "2019",
        type: "lollipop",
        data: data[2],
        color: "pink"
        }
        ],
        tooltip: {
        shared: true
        },
        legend: {
        backgroundColor: "white",
        shadow: true
        },
        credits: {
        enabled: false
        },
        noData: {
        style: {
        fontSize: "16px"
        }
        }
        });
        }
        
let draw = false;
function setTableEvents(table) {
    table.on("page", () => {
        draw = true;
    });
    table.on("draw", () => {
        if (draw) {
            draw = false;
        } else {
                const tableData = getTableData(table);
                createHighcharts(tableData);
        }
    });
}
