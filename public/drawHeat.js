// set the dimensions and margins of the graph
// import { and } from 'vega-lite-api';
import { scatter } from './scatter_d3.js';
import { getDataConfig, getProjectionFile } from './config.js';

let hoverDismissListenerRegistered = false;

export function heatmapN(vis, headline, metric, agg_data,myColor) {
  let svgContainer = d3.select("#" + vis + " svg");

  if (svgContainer.empty()) {
    console.log("SVG does not exist.");
    return false
  } else {
    // If SVG exists, select the existing "g" element for the heatmap
    svgContainer = svgContainer.select("g");
    const dicts = agg_data[metric]; // Use the updated aggregated data

    // Select all existing rectangles in the heatmap
    const squares = svgContainer.selectAll("rect");

    // Update the fill color of each square based on the new data
    squares.style("fill", function() {
      // Obtain the Model and Emb from each rectangle's data
      const d = d3.select(this).data()[0]; // Assuming data is bound to rects
      const key = `${d.Model},${d.Emb}`;
      const value = dicts[key]; // Use the updated value from agg_data
      return myColor(value); // Update color based on the new value
    });

    console.log("Colors updated based on agg_data.");
    return true
  }
}


export async function heatmap(file_name,vis,headline,metric,agg_data){
  const selected=[];
  let pendingViewerSelection = null;
  let modelViewerReadyListenerRegistered = false;
  const margin = {top: 10, right: 100, bottom: 100, left: 50},
    width = document.getElementById(vis).getBoundingClientRect().width - margin.left - margin.right,
    height = document.getElementById(vis).getBoundingClientRect().height - margin.top - margin.bottom;

  d3.select("#" + vis).selectAll("svg").remove();

  if (!hoverDismissListenerRegistered) {
    document.addEventListener("click", function(event) {
      const heatmapContainer = document.getElementById(vis);
      const hoverPanel = document.getElementById("hover");

      if (!heatmapContainer || !hoverPanel) {
        return;
      }

      if (!heatmapContainer.contains(event.target)) {
        d3.select("#hover").style("opacity", 0);
      }
    });

    hoverDismissListenerRegistered = true;
  }


  const svg = d3.select("#"+vis)
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Read labels and values directly from the selected metric CSV.
  const [data, config] = await Promise.all([
    d3.csv(file_name),
    getDataConfig()
  ]);
  const embeddingAliases = { gpt2: "albert" };
  const classificationAliases = { trans: "transformer" };
  const canonicalName = (value, aliases) => {
    const text = String(value).trim();
    return aliases[text.toLowerCase()] || text;
  };
  data.forEach((d) => {
    d.displayModel = canonicalName(d.Model, classificationAliases);
    d.displayEmb = canonicalName(d.Emb, embeddingAliases);
  });

    const highlightTopRightViewer = function(model, emb) {
      pendingViewerSelection = { model, emb };
      const selectedId = `viewer1${canonicalName(model, classificationAliases)}_${canonicalName(emb, embeddingAliases)}`;

      d3.selectAll('.motif-viewer1').style('border', 'none');

      const selectedElement = document.getElementById(selectedId);
      if (!selectedElement) {
        return false;
      }

      d3.select(selectedElement)
        .style('border', '4px solid #4daf4a')
        .style('border-radius', '10px');
      selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      return true;
    };

    if (!modelViewerReadyListenerRegistered) {
      document.addEventListener('modelViewerDone', function() {
        if (pendingViewerSelection) {
          highlightTopRightViewer(pendingViewerSelection.model, pendingViewerSelection.emb);
        }
      }, { once: true });

      modelViewerReadyListenerRegistered = true;
    }

    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    const configuredModels = config.classification_models.map((model) =>
      canonicalName(model, classificationAliases));
    const configuredEmbeddings = config.embedding_models.map((embedding) =>
      canonicalName(embedding, embeddingAliases));
    const myGroups = configuredModels.filter((model) =>
      data.some((d) => d.displayModel === model));
    const myVars = configuredEmbeddings.filter((embedding) =>
      data.some((d) => d.displayEmb === embedding));
    data.forEach((d) => {
      if (!myGroups.includes(d.displayModel)) myGroups.push(d.displayModel);
      if (!myVars.includes(d.displayEmb)) myVars.push(d.displayEmb);
    });
    let agg = agg_data;

    // Build X scales and axis:
    const x = d3.scaleBand()
      .range([ 0, width ])
      .domain(myGroups)
      .padding(0.05);
    svg.append("g")
      .style("font-size", 15)
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSize(0))
      .select(".domain").remove()

    // Build Y scales and axis:
    const y = d3.scaleBand()
      .range([ 0, height ])
      .domain(myVars)
      .padding(0.05);
    svg.append("g")
      .style("font-size", 15)
      .call(d3.axisLeft(y).tickSize(0))
      .select(".domain").remove()

    // Build color scale
    const myColor = d3.scaleSequential()
      .interpolator(d3.interpolateReds)
      .domain([1,100])

    // create a tooltip
    const tooltip = d3.select(vis)
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function(event,d) {
      tooltip
        .style("opacity", 1)

      svg.selectAll("rect")
          .style("stroke", "none")
          .style("opacity", 0.8)
      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
    }

    const getMetricScore = function(metricKey, datum) {
      const metricValues = agg[metricKey];
      if (!metricValues) {
        return null;
      }

      const key = `${datum.Model},${datum.Emb}`;
      const value = metricValues[key];
      return Number.isFinite(value) ? value : null;
    };

    const formatScore = function(value) {
      return value === null ? "N/A" : `${value}%`;
    };

    const applySelection = async function(cellSelection, d, event) {
      selected.length=0;
      const hoverPanel = d3.select("#hover");
      const selectedScore = getMetricScore(metric, d);
      const container = document.getElementById(vis);
      const containerRect = container.getBoundingClientRect();
      const clickX = event ? event.clientX : containerRect.left + 12;
      const clickY = event ? event.clientY : containerRect.top + 12;
      const left = Math.max(8, clickX - containerRect.left + 12);
      const top = Math.max(8, clickY - containerRect.top + 12);

      hoverPanel
        .html(`
          ${formatScore(selectedScore)}
        `)
        .style("left", `${left}px`)
        .style("top", `${top}px`)
        .style("opacity", 1)

      svg.selectAll(".heatmap-cell")
        .style("stroke", "none")
        .style("opacity", 0.8);

      cellSelection
          .style("stroke", "black")
          .style("opacity", 1);

      selected.push([d.Model, d.Emb]);

      const scatterVis = document.querySelector("#scatter-vis");
      const svgElement = scatterVis ? scatterVis.querySelector("svg") : null;
      if (svgElement) {
        svgElement.remove();
      }

      await scatter(await getProjectionFile(), d.displayEmb)

      highlightTopRightViewer(d.displayModel, d.displayEmb);
      console.log(selected);
  }

    const click = async function(event, d) {
      await applySelection(d3.select(this), d, event);
  }

    const mouseleave = function() {
      d3.select("#hover").style("opacity", 0);
    }

    // add the squares
    const dicts = agg[metric];
    const cells = svg.selectAll()
      .data(data, function(d) {return d.Model+':'+d.Emb;})
      .join("rect")
        .attr("class", "heatmap-cell")
        .attr("x", function(d) { return x(d.displayModel) })
        .attr("y", function(d) { return y(d.displayEmb) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )


        .style("fill", function(d) {
          // Concatenate Model and Emb to form the key as in dict
          const key = `${d.Model},${d.Emb}`;
          // Extract the value for this combination from dict
          const value = dicts[key];
          // Use this value with your myColor scale to set the fill color
          return myColor(value);
        })
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
          .style("cursor", "pointer")
        .on("mouseover", mouseover)
        .on("mouseleave", mouseleave)
        .on("click",click)

    const defaultDatum = data[0];
    if (defaultDatum) {
      const defaultCell = cells.filter(cell => cell.Model === defaultDatum.Model && cell.Emb === defaultDatum.Emb);
      if (!defaultCell.empty()) {
        applySelection(defaultCell, defaultDatum);
      }
    }
  // Add title to graph
  svg.append("text")
          .attr("x", 0)
          .attr("y", -20)
          .attr("text-anchor", "left")
          .style("font-size", "22px")
          .text(headline);

  // Add subtitle to graph
  svg.append("text")
          .attr("x", 0)
          .attr("y", -20)
          .attr("text-anchor", "left")
          .style("font-size", "14px")
          .style("fill", "grey")
          .style("max-width", 100)
          
  const cols = d3.scaleSequential()
          .interpolator(d3.interpolateReds)
          .domain([0, 100]); // Adjusted domain to start from 0
  const numSteps = 5;
  const range = cols.domain();
  const stepSize = (range[1] - range[0]) / (numSteps - 1);
  const legendValues = d3.range(range[0], range[1] + stepSize, stepSize);

  const svgLegend = d3.select("#heat-vis").append("svg")
    .attr("width", 100) // Adjust as needed
    .attr("height", 200) // Adjust as needed
    .style("position", "absolute")
    .style("bottom", "30px") // Positioning at the bottom
    .style("left", String(width+10)+"px")
    .style("pointer-events", "none");
  const gLegend = svgLegend.append("g")
    // Translate to the center of the area where you want to rotate
    .attr("transform", "translate(100, 25) rotate(90) ");
  
  gLegend.selectAll("rect")
    .data(legendValues.reverse())
    .enter().append("rect")
      .attr("x", (d, i) => i * (200 / numSteps)) // Adjust width (400) as needed
      .attr("y", 0)
      .attr("width", 200 / numSteps) // Adjust width (400) as needed
      .attr("height", 10) // Adjust height as needed
      .style("fill", d => cols(d));
  const specialValues = [22, 33, 56, 67, 89];

  gLegend.selectAll("text")
    .data(legendValues)
    .enter().append("text")
      .attr("x", (d, i) => i * (200 / numSteps) + (200 / numSteps / 2)) // Center text under each rect
      .attr("y", 15) // Position below the rectangles
      .attr("text-anchor", "middle") // Center text
      .attr("transform", (d, i) => `rotate(-90, ${i * (200 / numSteps) + (200 / numSteps / 2)}, 25)`) // Rotate the labels

      .text(d => Math.round(d))
      .style("font-size", "10px") // Adjust as needed
      .style("fill", d => specialValues.includes(Math.round(d)) ? "white" : "currentColor"); // Change color conditionally

          
  return selected;
          
}
