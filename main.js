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
        name: "Violent Crime",
        type: "lollipop",
        data: data[1],
        color: "orange"
        },
        {
        name: "Murder",
        type: "lollipop",
        data: data[2],
        color: "red"
        }
        {
        name: "Rape",
        type: "lollipop",
        data: data[3],
        color: "yellow"
        },
        {
        name: "Robbery",
        type: "lollipop",
        data: data[4],
        color: "pink"
        },
        {
        name: "Aggravated Assault",
        type: "lollipop",
        data: data[5],
        color: "grey"
        },      
        {
        name: "Property crime",
        type: "lollipop",
        data: data[6],
        color: "black"
        },
        {
        name: "Burglary",
        type: "lollipop",
        data: data[7],
        color: "magenta"
        },
        {
        name: "Larceny-Theft",
        type: "lollipop",
        data: data[8],
        color: "pastel pink"
        }, 
        {
        name: "Motor vehicile theft",
        type: "lollipop",
        data: data[9],
        color: "pastel purple"
        },  
        {
        name: "Arson",
        type: "lollipop",
        data: data[10],
        color: "pastel blue"
        },                 
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
