import { createColorLegendBar } from './scatter_d3.js';
import { addLegendLabels } from './scatter_d3.js';
import { color_hues_for_blues } from './scatter_d3.js';
import { color_hues_green_ } from './scatter_d3.js';
import { getClassColor } from './scatter_d3.js';
import { getCsvFileForModel, getLabels, getProjectionFile } from './config.js';

let seqLen = 3065
let configuredLabels = [];

const svgGlobal = {}
const containerNames = []
export let zoomScale = 1;
//let brush;

let clickedPos;

function parseCsvValue(value, fallback) {
  if (value === undefined || value === null || value === "") return fallback;
  if (String(value).trim().toLowerCase() === "none") return fallback;
  try {
    return JSON.parse(String(value).replace(/'/g, '"'));
  } catch (error) {
    console.error("Unable to parse motif CSV value:", value, error);
    return fallback;
  }
}

function labelIndex(value, labels) {
  const numeric = Number(value);
  if (Number.isInteger(numeric) && numeric >= 0 && numeric < labels.length) return numeric;
  return labels.findIndex((label) => label.toLowerCase() === String(value).trim().toLowerCase());
}

function getDisplayedSequenceId(value) {
  const sequenceId = String(value ?? "");
  const separatorIndex = sequenceId.indexOf("::");
  if (separatorIndex < 0) return sequenceId;

  const suffix = sequenceId.slice(separatorIndex + 2).trim();
  return suffix.split(/[|,\s]/, 1)[0] || sequenceId;
}

function createLabelChart(container, datasets, labels, chartId, alignSequences,
                          accordionTable, idsList, labelsList, model, models) {
  const margins = { top: 5, right: 5, bottom: 10, left: 15 };
  const width = $('#accordion-wrapper').width() - margins.right - margins.left;
  const rowHeight = 45;
  const height = Math.max(100, labels.length * rowHeight);
  const chartHeight = rowHeight - 10;
  const barHeight = 20;
  const svg = d3.select(container).append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`).attr("tabindex", 0)
    .attr("width", width).attr("height", height).attr("id", chartId)
    .style("max-width", "100%").style("height", "auto");
  svgGlobal[container.id] = svg;
  containerNames.push(container.id);

  const xScale = d3.scaleLinear().domain([0, seqLen])
    .range([margins.left, width - margins.right - 20]);
  let currentScale = xScale;
  const groups = datasets.map((dataset, index) => {
    const group = svg.append("g").attr("id", `line${model}_${index}`)
      .attr("transform", `translate(0, ${margins.top + index * rowHeight})`);
    group.append("text").attr("x", margins.left + 5).attr("y", 15)
      .style("font-size", "11px").text(labels[index]);
    group.append("g").attr("class", "x-axis").attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScale).ticks(5).tickSizeOuter(0));
    const max = d3.max(dataset, (d) => d.prob) || 1;
    const classColor = getClassColor(labels[index], labels);
    group.selectAll("rect").data(dataset).join("rect")
      .attr("x", (d) => xScale(d.ind)).attr("y", chartHeight - barHeight)
      .attr("width", (d) => d.count > 0 ? Math.abs(xScale(1) - xScale(0)) : 0)
      .attr("height", barHeight)
      .attr("fill", (d) => d3.interpolate("white", classColor)(d.prob / max));
    return group;
  });

  const zoom = d3.zoom().scaleExtent([1, 32])
    .translateExtent([[margins.left, 0], [width - margins.right - 20, height]])
    .extent([[margins.left, 0], [width - margins.right - 20, height]])
    .on("zoom", (event) => {
      currentScale = event.transform.rescaleX(xScale);
      zoomScale = currentScale;
      groups.forEach((group) => {
        group.selectAll("rect").attr("x", (d) => currentScale(d.ind))
          .attr("width", (d) => d.count > 0 ? Math.abs(currentScale(1) - currentScale(0)) : 0);
        group.select(".x-axis").call(d3.axisBottom(currentScale).ticks(5).tickSizeOuter(0));
      });
    });
  svg.on("keydown", (event) => {
    if (event.key.toLowerCase() === "c") {
      const brush = d3.brushX().on("end", ({ selection }) => {
        if (!selection) return;
        createAccordion(alignSequences, 0, accordionTable,
          [currentScale.invert(selection[0]), currentScale.invert(selection[1])],
          " ", " ", idsList, labelsList, idsList.length);
      });
      svg.select(".brush_g").call(brush);
    }
  });
  svg.append("g").attr("class", "brush_g");
  svg.call(zoom).transition().duration(500).call(zoom.scaleTo, 1);
}

function createDualChart(container, data1, color1, label1, data2, color2, label2, chartId,
                         align_sequences, accordion_table, ids_list, labels_list,model,models) {
    // Create the SVG element
  const margins = { top: 5, right: 5, bottom: 10, left: 15 };
  const width = $('#accordion-wrapper').width() - margins.right - margins.left;
    const height = 100;
    const chartHeight = height / 2 - 20;
  const barHeight = 20;


  const svg = d3.select(container).append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("tabindex",0)
      .attr("width", width)
      .attr("height", height)
      .attr("id", chartId)
      .style("max-width", "100%")
      .style("height", "auto");

    svgGlobal[container.id] = svg;
    containerNames.push(container.id)


  const xScale = d3.scaleLinear()
      .domain([0, 3065])
      .range([margins.left, width - margins.right - 20]);


    let _xScale = xScale.copy();

  const chartGroups = [
      svg.append("g").attr("transform", `translate(0,${margins.top})`).attr("id", "line1"+model),
      svg.append("g").attr("transform", `translate(0, ${ margins.top + height / 2})`).attr("id", "line2"+model)
  ];
  chartGroups.forEach((group, i) => {
    group.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${chartHeight - margins.bottom})`)
        .call(d3.axisBottom(xScale).tickValues(d3.range(xScale.domain()[0],xScale.domain()[1]+1,(xScale.domain()[1]-xScale.domain()[0])/5)).tickSizeOuter(0))


    // Adding label for each chart
    const label = (i === 0) ? label1 : label2;  // Choose the label based on the index
    // group.append("text")
    //     .attr("x", 42) // Position label at the center of the width
    //     .attr("y", (height / 2)-10) // Position at half the top margin
    //     .attr("text-anchor", "middle") // Center the text horizontally
    //     .style("font-size", "13px") // Set the font size
    //     .text(label); // Text content
});

    let maxprob = data1.reduce((max, obj) => obj.prob > max ? obj.prob : max, data1[0].prob);
    let minprob = data1.reduce((min, obj) => obj.prob < min ? obj.prob : min, data1[0].prob);

    chartGroups[0]
        .selectAll("rect")
        .data(data1)
        .join("rect")
        .attr("y", chartHeight - margins.bottom - barHeight)
        .attr("x", (d) => xScale(d.ind))
        .attr("width", function(d){
          if(d.count > 0) {
              return xScale(1);
          }
          else
              return 0;
        })
        .attr("height", barHeight)
        .attr("fill", d => color1((d.prob-minprob)/maxprob));

    maxprob = data2.reduce((max, obj) => obj.prob > max ? obj.prob : max, data2[0].prob);
    minprob = data2.reduce((min, obj) => obj.prob < min ? obj.prob : min, data2[0].prob);

    chartGroups[1]
        .selectAll("rect")
        .data(data2)
        .join("rect")
        .attr("x", d => xScale(d.ind))
        .attr("width", function(d){
            if(d.count > 0) {
                return Math.abs(xScale(1) - xScale(0));
            }
            else
                return 0;
        })
        .attr("y", chartHeight - margins.bottom - barHeight)
        .attr("height", barHeight)
        .attr("fill", d=>color2((d.prob-minprob)/maxprob));
        //.attr("fill", d=>color2[Math.round((d.prob-minprob)/maxprob  * (color2.length - 1))])
        //.call(brush);
        // .on("click", function(event, d) {
        //     createAccordion(align_sequences, 0, accordion_table,
        //         d, " ", " ", ids_list, labels_list, 437)
        // });




    //https://codesandbox.io/p/sandbox/zoom-and-brush-forked-pr1g3c?file=%2Fsrc%2Findex.js%3A20%2C1

  // Apply zoom to the entire SVG
  const zoom = d3.zoom()
        .scaleExtent([1, 32])
        .translateExtent([[margins.left,0],[width - margins.right - 20,height]])
        .extent([[margins.left,0],[width - margins.right - 20,height]])
        .on("zoom", (event) => {
            console.log(event.type)

            const t = event.transform;

            // Update the x scale
            _xScale = t.rescaleX(xScale);

            if (event.type === "brush") return;

            const xz = event.transform.rescaleX(xScale);
            zoomScale = xz;

            for(let _i of models){
                let _svg = d3.select("#line" + _i);

                _svg.selectAll("rect")
                    .attr("x", d => xz(d.ind))
                    .attr("width",function(d){
                        if(xz(d.ind)>margins.left && xz(d.ind)<width - margins.right - 20)
                            if(d.count > 0) {
                                return Math.abs(xz(1) - xz(0));
                            }
                            else
                                return 0;
                        else
                            return 0;
                    });
                _svg.select("#line1"+_i).select(".x-axis")
                    .call(d3.axisBottom(xz).tickValues(d3.range(xz.domain()[0],xz.domain()[1]+1,(xz.domain()[1]-xz.domain()[0])/5)).tickSizeOuter(0));

                _svg.select("#line2"+_i).select(".x-axis")
                    .call(d3.axisBottom(xz).tickValues(d3.range(xz.domain()[0],xz.domain()[1]+1,(xz.domain()[1]-xz.domain()[0])/5)).tickSizeOuter(0));
            }
        });

    svg.append("g")
        .attr("class", "brush_g")


    let bZoom = false;


    svg.on('keydown', (event) => {
        if (event.key === "C" || event.key === "c") {
            //if(!bZoom){
                const brush = d3.brushX()
                    .on("end", ({selection}) =>{

                        const [x0, x1] = selection

                        const startRange = _xScale.invert(x0);
                        const endRange = _xScale.invert(x1);

                        console.log(startRange, endRange);

                        clickedPos = (selection[0] + selection[1] )/2.0;
                        createAccordion(align_sequences, 0, accordion_table, [startRange,endRange]
                              , " ", " ", ids_list, labels_list, ids_list.length)





                    });

                d3.select(event.srcElement).select(".brush_g").call(brush)
            // }
            // // else{
            // //     d3.select(event.srcElement).call(zoom)
            // //         .transition()
            // //         .duration(500)
            // //         .call(zoom.scaleTo, 1);
            // // }
            bZoom != bZoom;
        }
    })

    svg.on('keyup', (event) => {
        d3.select(event.srcElement).call(zoom)
            .transition()
            .duration(500)
            .call(zoom.scaleTo, 1);
    });

    svg.call(zoom)
        .transition()
        .duration(500)
        .call(zoom.scaleTo, 1);

    // svg.on('keyup', (event) => {
    //
    //     if (event.key === "C" || event.key === "c") {
    //
    //         d3.select(event.srcElement).call(zoom)
    //                 .transition()
    //                 .duration(500)
    //                 .call(zoom.scaleTo, 1);
    //     }
    // })
}




  async function return_popular_motifs0(modelType,N) {
    // Load and process the CSV file (path resolved from data_config.json)
    const csvFile = await getCsvFileForModel(modelType);
    let all_data;
    all_data = await d3.csv(csvFile);

    let strings_l0=[]; //motif seq
    let probs_l0=[] //motif prob
    let all_pos_l0=[] //motif locations

      let strings_l1=[]; //motif seq
    let probs_l1=[] //motif prob
    let all_pos_l1=[] //motif locations

    all_data.forEach(d => {
        const mot = d.align_motifs;
        const pos = d.align_start_stop
        let pos1 = pos.replace(/'/g, '"')
        let pos2 = pos1.replace('None','[0,0]')

        if(d.label==0){
            strings_l0.push(JSON.parse(mot.replace(/'/g, '"')))
            probs_l0.push(JSON.parse(d.prob))
            all_pos_l0.push(JSON.parse(pos2))
        }
        else if(d.label == 1){
            strings_l1.push(JSON.parse(mot.replace(/'/g, '"')))
            probs_l1.push(JSON.parse(d.prob))
            all_pos_l1.push(JSON.parse(pos2))
        }
    });

    let sequenceL0 = [],sequenceL1 = [];//new Array(seqLen);
    for (let i = 0; i < seqLen; i++){
        let info0 = {count:0, prob:0,ind:i};
        sequenceL0.push(info0);
        let info1 = {count:0, prob:0,ind: i};
        sequenceL1.push(info1);
    }

      strings_l0.forEach((seqList, index) => { //for each protein sequence

          let tempSeq = new Array(seqLen).fill(0);
          let tempSeqProb = new Array(seqLen).fill(0);

        seqList.forEach((seq, seqIndex) => { //for each motif candidate
            let [startPos, endPos] = all_pos_l0[index][seqIndex];

            endPos = (endPos > seqLen)?seqLen:endPos;

            for (let j = startPos; j < endPos; j++) {
                if (tempSeq[j] != 0 ){
                    tempSeqProb[j] = (tempSeqProb[j]<probs_l0[index][seqIndex])?probs_l0[index][seqIndex] : tempSeqProb[j];
                }
                else{
                    tempSeq[j] = 1;
                    tempSeqProb[j] = probs_l0[index][seqIndex];
                }
            }
        });
            for (let j = 0; j < seqLen; j++) {
                if (tempSeq[j] == 1){
                    sequenceL0[j].count += 1;
                    sequenceL0[j].prob += tempSeqProb[j];
                }
            }
    });


      strings_l1.forEach((seqList, index) => { //for each protein sequence
          let tempSeq = new Array(seqLen).fill(0);
          let tempSeqProb = new Array(seqLen).fill(0);

          seqList.forEach((seq, seqIndex) => { //for each motif candidate
              let [startPos, endPos] = all_pos_l1[index][seqIndex];


              endPos = (endPos > seqLen)?seqLen:endPos;

              for (let j = startPos; j < endPos; j++) {
                  if (tempSeq[j] != 0 ){
                      tempSeqProb[j] = (tempSeqProb[j]<probs_l1[index][seqIndex])?probs_l1[index][seqIndex] : tempSeqProb[j];
                  }
                  else{
                      tempSeq[j] = 1;
                      tempSeqProb[j] = probs_l1[index][seqIndex];
                  }
              }
          });
            for (let j = 0; j < seqLen; j++) {
                if (tempSeq[j] == 1){
                    sequenceL1[j].count += 1;
                    sequenceL1[j].prob += tempSeqProb[j];
                }
            }
      });

    return [sequenceL0,sequenceL1];
  }

  async function return_popular_motifs(modelType, labels) {
    const csvFile = await getCsvFileForModel(modelType);
    const allData = await d3.csv(csvFile);
    const sequences = labels.map(() =>
      Array.from({ length: seqLen }, (_, ind) => ({ count: 0, prob: 0, ind }))
    );

    allData.forEach((row) => {
      const index = labelIndex(row.label, labels);
      if (index < 0) return;
      const motifs = parseCsvValue(row.align_motifs, []);
      const probabilities = parseCsvValue(row.prob, []);
      const positions = parseCsvValue(row.align_start_stop, []);
      const covered = new Map();
      motifs.forEach((_, motifIndex) => {
        const position = positions[motifIndex];
        if (!Array.isArray(position)) return;
        const start = Math.max(0, Number(position[0]) || 0);
        const end = Math.min(seqLen, Number(position[1]) || start);
        for (let positionIndex = start; positionIndex < end; positionIndex++) {
          const probability = Number(probabilities[motifIndex]) || 0;
          covered.set(positionIndex, Math.max(covered.get(positionIndex) || 0, probability));
        }
      });
      covered.forEach((probability, positionIndex) => {
        sequences[index][positionIndex].count += 1;
        sequences[index][positionIndex].prob += probability;
      });
    });
    return sequences;
  }


  //block for each model output
  function createHtmlViews(uniqueId,width_style) {
    let viewer1 = document.createElement("div");

    viewer1.id = uniqueId; // Setting a unique ID to the div
    viewer1.classList.add("seq-viewer");
    viewer1.style.width = width_style;

    return viewer1; // Return the created div element
  }

  
  //main entrance to visualize the model view
  export async function modelViewer(numOfContainers, color,motif) {
    // Select or create the motif-single container

    setTimeout(() => {
      document.dispatchEvent(new CustomEvent('modelViewerDone'));
    }, 3000);
    let motifSingle = document.getElementById("model-wrapper");
    let acc = document.getElementById("accordion-wrapper");

    let align_sequences;
    let idsL;
    let labels;

    //for the sequence view
    const [labelsConfig, projectionFile] = await Promise.all([getLabels(), getProjectionFile()]);
    configuredLabels = labelsConfig;
    d3.csv(projectionFile).then(function(data) {
      const view_table_accordion_main = createHtmlViews("accordion_main","98%")
      acc.append(view_table_accordion_main)
      // acc.append(view_side_tabel)
      const align0_new = data.map(d => {
        const aligned = String(d.aligned || "").trim();
        return aligned || d.sequence || "";
      });
      align_sequences = align0_new;
      const ids = Array.from(data.map(d => d.ID));
      const label_list = Array.from(data.map(d => d.label));
      idsL=ids;
      labels=label_list;
      createAccordion(align0_new, 0, "accordion_main",
        [], " ", " ", ids,label_list, align_sequences.length)

        //sequences, label, div, seqRange, highlightRange, right_left, color, id_list, label_list, N


      // createAccordion(align0_new, 0, "accordion_main", " ","",false,ids,label_list,align_sequences.length)
      // createAccordion(ids, 0, "side_table", " ","right",true)
    });

    // Create the specified number of motifs-viewer containers
    for (let i = 0; i < numOfContainers; i++) {
      const viewer = document.createElement("div");
      viewer.classList.add("motif-viewer");
  
      // Create a new div element to serve as the text container
      let textContainer = document.createElement("div");
      textContainer.classList.add("motif-view-label");
      textContainer.innerText = motif[i]; // Assuming 'motif' is an array and 'i' is the index

      // Append the container to the document body or another specific element
      document.body.appendChild(textContainer);

      viewer.appendChild(textContainer);

      let N=10;
      /*const [pop0,all_prob0] = await return_popular_motifs0(motif[i],N);
      const [pop1,all_prob1]= await return_popular_motifs1(motif[i],N);

      let keys1 = Object.keys(pop0); // Get all keys
      let keys2 = Object.keys(pop1);
        */
      const datByLabel = await return_popular_motifs(motif[i], labelsConfig);

      const viewer1 = document.createElement("div");
      viewer1.id = "viewer1"+motif[i]; // Setting a unique ID to the div
  
      viewer1.classList.add("motif-viewer1");
      viewer1.addEventListener('click', function() {
         if (viewer1.innerText === "Label 0"){
          // createAccordion(align0, 0, "accordion1", " ");
          alert('Label 0');
        }
      });
      viewer.append(viewer1);

        createLabelChart(viewer1, datByLabel, labelsConfig, "line"+motif[i],
          align_sequences, "accordion_main", idsL, labels, motif[i], motif)

      // createDualChart(viewer1, indexRangesProb, color_hues_for_blues, "Pathogenic", indexRangesProb1,
      // color_hues_green_, "Non-Pathogenic", "line"+motif[i], align_sequences, "accordion_main", idsL, labels,motif[i])
      motifSingle.appendChild(viewer);
    }
  }

  
  function getCharacterWidth(fontFamily, fontSize) {
      // Create a temporary span element
      const tempElement = document.createElement('span');
      tempElement.style.visibility = 'hidden'; // Hide the element
      tempElement.style.fontFamily = fontFamily;
      tempElement.style.fontSize = fontSize;
      tempElement.textContent = 'M'; // Use 'M' as it's typically wide, or use the character(s) you expect to measure
  
      // Append to the body to get the width
      document.body.appendChild(tempElement);
      const characterWidth = tempElement.offsetWidth;
      document.body.removeChild(tempElement); // Clean up
  
      return characterWidth;
  }


  //Sequence Viz....
  function createAccordion(sequences, label, div, seqRange, right_left, color, id_list, label_list, N) {
    console.log("number of sequences: ", N);
  
    const container = document.getElementById(div);
    container.innerHTML = ''; // Clear previous content
  
    let filteredSequences = sequences; // Use all sequences

    const filteredSequences_new = filteredSequences.slice(0, N);
    const maxSeqLength = Math.max(...filteredSequences_new.map(seq => seq.length));
  
    // CSS for highlighting and panel scrolling
    const style = document.createElement('style');
    style.textContent = `.highlight { background-color: lightgray; } .panel { width: 100%; display: block; } table { width: 100%; table-layout: fixed; } td { font-family: 'Courier New', monospace; vertical-align: top; text-align: left; white-space: pre;}`;
    document.head.appendChild(style);
  
    const panel = document.createElement('div');
    panel.classList.add('panel');
    const table = document.createElement('table');
  
    filteredSequences_new.forEach((seq, index) => {
      const tr = document.createElement('tr');
        tr.id = id_list[index].split('.')[0];
        tr.pos = index;
      const td1 = document.createElement('td');
      const td2 = document.createElement('td');
      td1.classList.add('seq-meta-cell');
      td1.style.width = '13%';
      td2.style.width = '75%';
      td1.style.position = 'relative';
      td1.style.zIndex = '3';
      td1.style.backgroundColor = '#ffffff';
      td1.style.whiteSpace = 'nowrap';
      td1.style.paddingLeft = '8px';
  
      let box = document.createElement('span');
      box.style.display = 'inline-block';
      box.style.width = '10px';
      box.style.height = '10px';
      box.style.backgroundColor = getClassColor(label_list[index], configuredLabels);
      box.style.marginRight = '5px';
  
      td1.appendChild(box);

      let textLabel = document.createTextNode(getDisplayedSequenceId(id_list[index]))


      td1.appendChild(textLabel);
      td1.style.fontSize = "18px";
      td1.style.textAlign = "left";
      td1.style.fontFamily = "'Courier New', monospace";

  
      let paddedSeq = seq.padEnd(maxSeqLength, ' ');
      let modifiedSeq = '';


      //TODO: handle this!!! click nothing clickedPos
      if (seqRange.length === 0) {
        modifiedSeq = paddedSeq; // Display without highlights if highlightRange is empty
      } else {
        for (let i = 0; i < paddedSeq.length; i++) {
          if (seqRange[0] <= i && i <= seqRange[1]) {

             // console.log(paddedSeq[i])
            modifiedSeq += `<span class="highlight">${paddedSeq[i]}</span>`;
          } else {
            modifiedSeq += paddedSeq[i];
          }
        }
      }
  
      td2.innerHTML = modifiedSeq;
      td2.style.position = 'relative';
      td2.style.zIndex = '1';
      td2.style.fontSize = "18px";
      td2.style.textAlign = "right";
      td2.style.fontFamily = "'Courier New', monospace";
  
      tr.appendChild(td1);
      tr.appendChild(td2);
      table.appendChild(tr);
    });
  
    panel.appendChild(table);
    container.appendChild(panel);

    const scrollHost = document.getElementById('accordion-wrapper') || container;

    if (container._seqMetaScrollHandler && container._seqMetaScrollHost) {
      container._seqMetaScrollHost.removeEventListener('scroll', container._seqMetaScrollHandler);
    }

    const pinMetaCells = () => {
      const hostOffset = scrollHost ? scrollHost.scrollLeft : 0;
      const containerOffset = container ? container.scrollLeft : 0;
      const offset = Math.max(hostOffset, containerOffset);
      const leftNudge = 14;

      table.querySelectorAll('.seq-meta-cell').forEach((cell) => {
        cell.style.transform = `translateX(${offset - leftNudge}px)`;
      });
    };

    pinMetaCells();
    scrollHost.addEventListener('scroll', pinMetaCells);
    container._seqMetaScrollHandler = pinMetaCells;
    container._seqMetaScrollHost = scrollHost;
  
    if (seqRange.length > 0) {
      // Scroll adjustment to center the highlighted area if highlightRange is not empty
      const characterWidth = getCharacterWidth("'Courier New', monospace", "18px");
      const viewableAreaWidth = container.clientWidth; 
      //const midPoint = (highlightRange[0] + highlightRange[1]) / 2;
        const midPoint = (seqRange[0] + seqRange[1]) / 2;

      const scrollPosition = midPoint * characterWidth - viewableAreaWidth / 2;

        console.log(midPoint,scrollPosition);
        const wrapper = document.getElementById('accordion-wrapper')
      setTimeout(() => container.scrollLeft = scrollPosition, 0);
        setTimeout(() => wrapper.scrollLeft = scrollPosition, 0);

    }
  }
  






