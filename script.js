async function fetchData() {
  const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo');
  const data = await response.json();
  const timeSeries = data['Time Series (Daily)'];
  
  const chartData = Object.keys(timeSeries).slice(0, 30).reverse().map(date => {
    const dayData = timeSeries[date];
    return {
      x: date,
      y: [
        parseFloat(dayData['1. open']),
        parseFloat(dayData['2. high']),
        parseFloat(dayData['3. low']),
        parseFloat(dayData['4. close'])
      ]
    };
  });

  renderChart(chartData);
}

function renderChart(data) {
  const options = {
    chart: { type: 'candlestick', width: 100px, height: 200px },
    series: [{ name: 'IBM', data: data }],
    xaxis: { type: 'category' }
  };
  const chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}

fetchData();
