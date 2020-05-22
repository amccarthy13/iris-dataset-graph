/* global d3 */

// RUN WITH THE COMMAND: 'live-server --port=1234 --open=public --entry-file=index.html'
// https://amazing-curran-800fab.netlify.app/

const margin = {
  top: 40, right: 50, bottom: 40, left: 50,
};
const width = 900 - margin.left - margin.right;
const height = 900 - margin.top - margin.bottom;

const svg = d3.select('body')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);


d3.json('iris.json', (error, data) => {
  data.forEach((d) => {
    const tmp = d;
    tmp.sepalLength = +d.sepalLength;
    tmp.sepalWidth = +d.sepalWidth;
  });

  const xScale = d3.scaleLog()
    .range([width, 0])
    .domain(d3.extent(data, (d) => d.sepalLength)).nice();

  const yScale = d3.scaleLog()
    .range([0, height])
    .domain(d3.extent(data, (d) => d.sepalWidth)).nice();

  const radius = d3.scaleSqrt()
    .range([2, 5]);


  const xAxis = d3.axisBottom()
    .scale(xScale);

  const yAxis = d3.axisLeft()
    .scale(yScale);

  const color = d3.scaleOrdinal(d3.schemeCategory10);


  svg.append('g')
    .attr('transform', 'translate(0,0')
    .attr('class', 'x axis')
    .call(xAxis);

  svg.append('g')
    .attr('transform', `translate(${width},0)`)
    .attr('class', 'y axis')
    .call(yAxis);


  const bubble = svg.selectAll('.bubble')
    .data(data)
    .enter().append('circle')
    .attr('class', 'bubble')
    .attr('cx', (d) => xScale(d.sepalLength))
    .attr('cy', (d) => yScale(d.sepalWidth))
    .attr('r', radius(0.25))
    .style('fill', (d) => color(d.species));

  bubble.append('title')
    .attr('x', radius(0.25))
    .text((d) => d.species);

  svg.append('text')
    .attr('x', 170)
    .attr('y', height - 28)
    .attr('class', 'title')
    .style('font-size', '20px')
    .style('text-decoration', 'underline')
    .text('Sepal Length vs Sepal Width Log-Log Graph');

  svg.append('text')
    .attr('x', 170)
    .attr('y', height - 8)
    .attr('class', 'title')
    .style('font-size', '15px')
    .text('Source: Ronald Fisher\'s iris flower data set');

  svg.append('text')
    .attr('x', 10)
    .attr('y', 40)
    .attr('class', 'label')
    .style('font-size', '17px')
    .text('log(Sepal Width)');


  svg.append('text')
    .attr('x', width - 40)
    .attr('y', height - 10)
    .attr('text-anchor', 'end')
    .attr('class', 'label')
    .style('font-size', '17px')
    .text('log(sepal length)');

  const legend = svg.selectAll('legend')
    .data(color.domain())
    .enter().append('g')
    .attr('class', 'legend')
    .attr('transform', (d, i) => `translate(0,${i * 20})`);

  svg.append('text')
    .attr('x', 0)
    .attr('y', height - 40)
    .attr('class', 'title')
    .style('font-size', '17px')
    .style('text-decoration', 'underline')
    .text('Species:');

  legend.append('rect')
    .attr('x', 50)
    .attr('y', height - 30)
    .attr('width', 18)
    .attr('height', 18)
    .style('fill', color);

  legend.append('text')
    .attr('x', 42)
    .attr('y', height - 22)
    .attr('dy', '.35em')
    .style('text-anchor', 'end')
    .text((d) => d);
});
