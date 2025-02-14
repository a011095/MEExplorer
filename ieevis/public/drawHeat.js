// set the dimensions and margins of the graph
// import { and } from 'vega-lite-api';
import { scatter } from './scatter_d3.js';

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

// function scatterN(model) {
//   let svgContainer = d3.select("#" + "scatter-vis" + " svg");

//   if (svgContainer.empty()) {
//     console.log("scatter does not exist.");
//     return false
//   } else {
//     console.log("SCatter does  exist.");
//   }
// }


async function setupButtonListeners(selected_array) {
  // Listen for clicks on buttons within the dimensionality-reduction-box
  const dim_red=[];
  console.log("from button selectors",selected_array);
  
  document.getElementById('dimensionality-reduction-box').addEventListener('click', function(event) {
      if (event.target.tagName === 'BUTTON') {
          // console.log(event.target.value + " has been selected");
          dim_red.length=0;
          dim_red.push(event.target.value);
      }
      
  });

  // Listen for clicks on buttons within the scatter-box
  const scatter_box_list=[];
  document.getElementById('scatter-box').addEventListener('click', function(event) {
      if (event.target.tagName === 'BUTTON') {
          console.log(event.target.value + " has been selected");
          scatter_box_list.length=0;

          scatter_box_list.push(event.target.value);          
      }
      
  document.getElementById('generate-box').addEventListener('click', function(event) {

    console.log("generate button has been clicked!!");
    
    if(document.getElementById("scatter-plot").innerHTML!=""){
      document.getElementById("scatter-plot").innerHTML=""; 
    
    }
    if(selected_array[0][1]=="T5"){

      if(dim_red[0]=="TSNE" & scatter_box_list[0]=="Scatter"){
        console.log("TSNE and Scatter Selected")
  
        scatter("https://raw.githubusercontent.com/vikash06131721/Data-host/main/t5_tsne_normal.csv", "#scatter-plot");
      }

    if(dim_red[0]=="TSNE" & scatter_box_list[0]=="UMAP"){
        console.log("TSNE and UMAP Selected")
  
        scatter("https://raw.githubusercontent.com/vikash06131721/Data-host/main/t5_tsne_umap.csv", "#scatter-plot");
      }
    }


      }
  )
  
  });
}


export async function heatmap(file_name,vis,headline,metric,agg_data){
  const selected=[];
  const margin = {top: 10, right: 100, bottom: 100, left: 50},
    width = document.getElementById(vis).getBoundingClientRect().width - margin.left - margin.right,
    height = document.getElementById(vis).getBoundingClientRect().height - margin.top - margin.bottom;

  
  
  
  // append the svg object to the body of the page
  // d3.select("#"+vis).remove();

  const svg = d3.select("#"+vis)
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //Read the data
  d3.csv(file_name).then(function(data) {

    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    const myGroups = Array.from(new Set(data.map(d => d.Model)))
    const myVars = Array.from(new Set(data.map(d => d.Emb)))
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
      .range([ height, 0 ])
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
    // const mousemove = function(event, d) {
    //   const tooltip = d3.select("#hover");
    //   tooltip
    //     .html("Model:"+d.Model+",Emb:"+d.Emb+","+metric+":"+ d.value)
    //     .style("position", "absolute")
    //     .style("font","20px Arial")
    //     // .style("left", (event.pageX) + "px") // Adjust if necessary for offset
    //     // .style("top", (event.pageY) + "px"); // Adjust if necessary for offset
    // };
    // const mouseleave = function(event,d) {
    //   const tooltip = d3.select("#hover");
    //   tooltip.html("");
    //
    //   d3.select(this)
    //     .style("stroke", "none")
    //     .style("opacity", 0.8)
    // }

    


    const click = async function(event, d) {
      // Hide any existing tooltips before showing the new one
      selected.length=0;
      const tooltip = d3.select("#hover");
      tooltip.html("");

      tooltip
        .html( d.Model + ", " + d.Emb +" selected")
        .style("opacity", 1)
        
      // Highlight the clicked cell
      d3.selectAll("rect")
        .style("stroke", "none")
        .style("opacity", 0.8); // Reset other cells to default state

      d3.select(this)
          .style("stroke", "black")
          .style("opacity", 1)

      selected.push([d.Model, d.Emb]);
      const scatterVis = document.querySelector("#scatter-vis");
      let svgElement = scatterVis.querySelector("svg");
      svgElement.remove();
      svgElement = null;

      // await scatter("cas9all_new_All2.csv",d.Emb)
      await scatter("cas9all_new_All6.csv",d.Emb)
      const color = d3.scaleOrdinal()
        .domain(['0', '1'])
        .range([ "#9ecae1", "#f44336"])
      // const list = d3.selectAll("#scatter-vis")
      // list.selectAll("dots").style("fill","yellow");


      // setupButtonListeners(selected);
    
      console.log(selected);
  }

    // add the squares
    const dicts = agg[metric];
    svg.selectAll()
      .data(data, function(d) {return d.Model+':'+d.Emb;})
      .join("rect")
        .attr("x", function(d) { return x(d.Model) })
        .attr("y", function(d) { return y(d.Emb) })
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
        .on("mouseover", mouseover)
        .on("click",click)
      //.on("mousemove", mousemove)
      //.on("mouseleave", mouseleave)

  })

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


          
  

  // const cols = d3.scaleSequential()
  //         .interpolator(d3.interpolateReds)
  //         .domain([1,100])

  // const numSteps = 10;
  // const range = cols.domain();
  // const stepSize = (range[1] - range[0]) / (numSteps - 1);
  // const legendValues = d3.range(range[0], range[1] + stepSize, stepSize);

  const svgLegend = d3.select("#heat-vis").append("svg")
    .attr("width", 100) // Adjust as needed
    .attr("height", 200) // Adjust as needed
    .style("position", "absolute")
    .style("bottom", "30px") // Positioning at the bottom
    .style("left", String(width+10)+"px");
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


