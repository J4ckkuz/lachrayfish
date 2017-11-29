
// Global variables
    var weather = 'good';
    var money = 9500;
    var boats = 0;
    var pots = 0;
    var day = 0;

    var htmlConsole = document.getElementById("console");
    messageConsole("<°(((><");
    console.log("console: ", htmlConsole);
    var createEmptyData = function(days) {
        var newArray = [];
        for ( var i = 0; i < days; i++ ) {
            newArray[i] = null;
        }
        return newArray;
    };

    var incomeData = createEmptyData(14);
    var wealthData = createEmptyData(14);

    var startDate = new Date();

    var chartData = [];
    for (var i = 0; i < 14; i++) {
        startDate.setDate(startDate.getDate() + 1);
        chartData.push({
            date: new Date(startDate),
            'income': incomeData[i],
            'wealth': wealthData[i]
        });
    }
    console.log(chartData);
    chartData.forEach(function(element) {
        console.log(element.date.getDate());
    });

window.onload = function() {
    pageLoad();
};

function pageLoad() {

    document.getElementById("weather").innerHTML = weather;
    document.getElementById("money").innerHTML = money;
    document.getElementById("boats").innerHTML = boats;
    document.getElementById("pots").innerHTML = pots;

    AmCharts.makeChart("chartdiv",
		{
			"type": "serial",
			"categoryField": "date",
			"dataDateFormat": "YYYY-MM-DD",
			"accessibleTitle": "Daily income",
			"processCount": 1003,
			"theme": "default",
			"categoryAxis": {
				"parseDates": true
			},
			"chartCursor": {
				"enabled": true
			},
			"chartScrollbar": {
				"enabled": true
			},
			"trendLines": [],
			"graphs": [
				{
					"bullet": "round",
					"id": "AmGraph-1",
					"legendPeriodValueText": "Daily Income",
					"title": "Daily Income",
					"valueField": "income"
				},
				{
					"bullet": "square",
					"cornerRadiusTop": 5,
					"customMarker": "",
					"fillColors": "undefined",
					"id": "AmGraph-2",
					"legendPeriodValueText": "Wealth",
					"legendValueText": "",
					"negativeFillAlphas": 0,
					"title": "Wealth",
					"valueField": "wealth"
				}
			],
			"guides": [],
			"valueAxes": [
				{
					"id": "ValueAxis-1",
					"title": "Income"
				}, {
                    "id": "WealthAxis",
                    "title": "Wealth",
                    "inside": true,
                    "position": "right",
                }
			],
			"allLabels": [],
			"balloon": {},
			"legend": {
				"enabled": true,
				"accessibleLabel": "",
				"fontSize": -1,
				"labelText": "",
				"periodValueText": "",
				"rollOverGraphAlpha": 0,
				"useGraphSettings": true
			},
			"titles": [
				{
					"id": "Title-1",
					"size": 15,
					"text": "Daily Income and Savings"
				}
			],
			"dataProvider": chartData,
		}
    );

}

function buyBoats() {
    console.log("buyBoats running");

        if (money >= 2500) {
            money = money + -2500;
            boats = boats + 1;
        } else {
            messageConsole("You dont have enough money");
        }

        document.getElementById("money").innerHTML = money;
        document.getElementById("boats").innerHTML = boats;
    }

function buyPots() {
    console.log("buyPots running");

        if(money>=200 && boats>(pots/10)) {
        money = money + -200;
        pots = pots + 1;
        } else {
            messageConsole("You dont have enough money / space for more cray pots");
        }
        document.getElementById("money").innerHTML = money;
        document.getElementById("pots").innerHTML = pots;
    }

function setPots() {
    if(boats > 0 && pots > 0){
        console.log("setPots running");
        var coastal = parseInt(document.getElementById("idCoastal").value);
        var deepSea = parseInt(document.getElementById("idDeepSea").value);

        if (coastal >= 0 && deepSea >= 0) {
            if(coastal + deepSea <= pots) {
                var atShore = pots - coastal - deepSea;

                document.getElementById("potsC").innerHTML = coastal;
                document.getElementById("potsD").innerHTML = deepSea;
                document.getElementById("potsS").innerHTML = atShore;

                nextDay(coastal, deepSea, atShore);
            } else {
                messageConsole("You only have " + pots + " pots");
            }
        } else {
            messageConsole("You can't have negative pots");
        }
    } else {
        messageConsole("You need to buy boats and pots first!");
    }
}

function nextDay(coastal, deepSea, atShore) {

    var weatherRoll = getRandomInt(1,6);
    var income;
    // console.log(incomeData);


    // console.log(day);

    // console.log("nextDay running");
    if (weatherRoll > 4) {
        weather = "good";
    } else if (weatherRoll < 3) {
        weather = "bad";
    }
    document.getElementById("weather").innerHTML = weather;


    if (weather == "good") {
        income = (coastal * 60) + (deepSea * 120);
        money = money + income;
    }
    else {
        pots = coastal + atShore;
        income = (coastal * 90);
        money = money + income;
    }
    console.log(weather);
    messageConsole("Today the weather is " + weather +"!");

    chartData[day].wealth = calculateWealth(boats, pots, money);
    chartData[day].income = income;
    // console.log(incomeData);
    // console.log(chartData);
    day++;
    console.log(chartData);
    pageLoad();


}

function calculateWealth(boats, pots, money) {
    return (boats * 2500) + (pots * 200) + money;
}

function getRandomInt(min, max) {
    var randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomInt;
}

function messageConsole(message) {
    htmlConsole.innerText = message;
}
