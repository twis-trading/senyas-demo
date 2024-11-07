$(function() {
    "use strict";
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    var total = ["2.3", "3.1", "4.0", "10.1", "12.0", "3.6", "200.2"];

    var mm = [];
    var tt = [];

    for (var i = 0; i < month.length; i++) {
      mm[i] = month[i];
      tt[i] = total[i];
    }
    console.log(mm);
    var options = {
            chart: {
				foreColor: '#e4e6eb',
                height: 500,
                type: 'bar',
           toolbar: {
                     show: false
                }
            },
            plotOptions: {
                bar: {
            columnWidth: '50%',
              endingShape: 'rounded',
                    dataLabels: {
                        position: 'top', // top, center, bottom
                    },
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function(val) {
                  return parseInt(val);
                },
                offsetY: -20,
                style: {
                    fontSize: '14px',
                    colors: ["#e4e6eb"]
                }
            },
            stroke: {
              width: 0
              },
            series: [{
                name: 'App users',
                data: tt
            }],
            xaxis: {
                categories: mm,
                position: 'bottom',
                labels: {
                    offsetY: 0,
                },
                axisBorder: {
                    show: true
                },
                axisTicks: {
                    show: true
                }
            },
              tooltip: {
                    enabled: true,
                    theme: 'dark',
             },
            grid:{
                show: true,
                borderColor: 'rgba(255, 255, 255, 0.06)',
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    gradientToColors: [ '#08a50e'],
                    shadeIntensity: 1,
                    type: 'vertical',
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100, 100, 100]
                },
            },
            colors: ["#cddc35"],
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                    formatter: function(val) {
                    return parseInt(val);
                  }
                }

            },
            title: {
                text: 'Total App Users per Barangay',
                floating: true,
                offsetY: 0,
                align: 'center',
                style: {
                fontSize: '15px',
                    color: '#e4e6eb'
                }
            },
            // responsive: [{
            //     breakpoint: 480,
            //     options: {
            //         chart: {
            //             height: 310
            //         },
            //         legend: {
            //             position: 'bottom'
            //         },
            //   title: {
            //     text: 'Total App Users per Barangay, 2018',
            //     floating: true,
            //     offsetY: 0,
            //     align: 'center',
            //     style: {
            //       fontSize: '13px',
            //       color: '#e4e6eb'
            //     }
            //   }
            //         }
            //     }]
        }

        var chart = new ApexCharts(
            document.querySelector("#submitted-application"),
            options
        );
        chart.render();

    });
