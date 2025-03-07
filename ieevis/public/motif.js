import { createColorLegendBar } from './scatter_d3.js';
import { addLegendLabels } from './scatter_d3.js';
import { color_hues_for_blues } from './scatter_d3.js';
import { color_hues_green_ } from './scatter_d3.js';

let seqLen = 3065

const svgGlobal = {}
const containerNames = []

export let zoomScale = 1;
//let brush;

let clickedPos;

function createDualChart(container, data1, color1, label1, data2, color2, label2, chartId,
                         align_sequences, accordion_table, ids_list, labels_list,model,models) {
    // Create the SVG element
  const margins = { top: 5, right: 5, bottom: 10, left: 5 };
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
        .call(d3.axisBottom(xScale).tickValues(d3.range(xScale.domain()[0],xScale.domain()[1]+1,(xScale.domain()[1]-xScale.domain()[0])/10)).tickSizeOuter(0))


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
            //console.log("test")
            const xz = event.transform.rescaleX(xScale);
            zoomScale = xz;

            for(let _i of models){
                let _svg = d3.select("#line" + _i);

                _svg.selectAll("rect")
                    .attr("x", d => xz(d.ind))
                    .attr("width",function(d){
                        if(xz(d.ind)>margins.left)
                            if(d.count > 0) {
                                return Math.abs(xz(1) - xz(0));
                            }
                            else
                                return 0;
                        //return xz(d.end) - xz(d.start);
                        else
                            return 0;
                    });
                _svg.select("#line1"+_i).select(".x-axis")
                    .call(d3.axisBottom(xz).tickValues(d3.range(xz.domain()[0],xz.domain()[1]+1,(xz.domain()[1]-xz.domain()[0])/10)).tickSizeOuter(0));

                _svg.select("#line2"+_i).select(".x-axis")
                    .call(d3.axisBottom(xz).tickValues(d3.range(xz.domain()[0],xz.domain()[1]+1,(xz.domain()[1]-xz.domain()[0])/10)).tickSizeOuter(0));
            }



            // chartGroups.forEach(group => {
            //     group.select("g")
            //         .call(d3.axisBottom(xz).tickValues(d3.range(xz.domain()[0],xz.domain()[1]+1,(xz.domain()[1]-xz.domain()[0])/10)).tickSizeOuter(0));
            //   });
        });

    svg.append("g")
        .attr("class", "brush_g")

    svg.on('keydown', (event) => {
        if (event.key === "C" || event.key === "c") {

            const brush = d3.brushX()
                .on("end", ({selection}) =>{

                    const [x0, x1] = selection

                    const startRange = _xScale.invert(x0);
                    const endRange = _xScale.invert(x1);

                    clickedPos = (selection[0] + selection[1] )/2.0;
                    createAccordion(align_sequences, 0, accordion_table,
                        [xScale(startRange),xScale(endRange)]   , " ", " ", ids_list, labels_list, 437)
                });

            d3.select(event.srcElement).select(".brush_g").call(brush)
        }
    })

    svg.call(zoom)
        .transition()
        .duration(500)
        .call(zoom.scaleTo, 1);

    svg.on('keyup', (event) => {
        //console.log(event)
        if (event.key === "C" || event.key === "c") {
            //console.log("ctl_zoom")


            d3.select(event.srcElement).call(zoom)
                    .transition()
                    .duration(500)
                    .call(zoom.scaleTo, 1);
        }
    })
}




  async function return_popular_motifs0(modelType,N) {
    // Load and process the CSV file
    const motif_data = await d3.json("https://raw.githubusercontent.com/vikash06131721/Data-host/main/group0.json");
    let all_data;
    if(modelType=="BiLSTM_T5"){
        all_data = await d3.csv("cas9_bisltm_t5.csv");
      }
    else if(modelType=="CNN_T5"){
        all_data = await  d3.csv("cas9_cnn_t5.csv");
      }
    else if(modelType=="BiLSTM_GPT2"){
        all_data = await d3.csv("cas9_bilstm_gpt2.csv");
      }
    else if(modelType=="BiLSTM_Bert"){
        all_data = await d3.csv("cas9_bert_lstm.csv");
      }
    else if(modelType=="CNN_GPT2"){
        all_data = await d3.csv("cas9_cnn_gpt2.csv");
      }
    else if(modelType=="CNN_Bert"){
        all_data = await d3.csv("cas9_bert_cnn.csv");
      }
    else if(modelType=="Trans_GPT2"){
        all_data = await d3.csv("cas9_gpt2_only.csv");
      }
    else if(modelType=="Trans_T5"){
        all_data = await d3.csv("cas9_t5_only.csv");
      }
    else if(modelType=="Trans_Bert"){
        all_data = await d3.csv("cas9_bert_only.csv");
      }
    
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
        seqList.forEach((seq, seqIndex) => { //for each motif candidate
            let [startPos, endPos] = all_pos_l0[index][seqIndex];

            endPos = (endPos > seqLen)?seqLen:endPos;

            for (let j = startPos; j < endPos; j++) {
                try{
                    sequenceL0[j].count += 1;
                    sequenceL0[j].prob += probs_l0[index][seqIndex];
                }
                catch(error){
                    console.error(j)
                }

            }
        });
    });

      strings_l1.forEach((seqList, index) => { //for each protein sequence
          seqList.forEach((seq, seqIndex) => { //for each motif candidate
              let [startPos, endPos] = all_pos_l1[index][seqIndex];

              endPos = (endPos > seqLen)?seqLen:endPos;

              for (let j = startPos; j < endPos; j++) {
                  sequenceL1[j].count += 1;
                  sequenceL1[j].prob += probs_l1[index][seqIndex];
              }
          });
      });
    return [sequenceL0,sequenceL1];
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
    d3.csv("cas9_align_umap_with_gpt2_bert_t5.csv").then(function(data) {
      const view_table_accordion_main = createHtmlViews("accordion_main","98%")
      acc.append(view_table_accordion_main)
      // acc.append(view_side_tabel)
      const align0_new = Array.from(new Set(data.map(d => d.aligned)));
      align_sequences = align0_new;
      const ids = Array.from(data.map(d => d.ID));
      const label_list = Array.from(data.map(d => d.label));
      idsL=ids;
      labels=label_list;
      createAccordion(align0_new, 0, "accordion_main",
        [], " ", " ", ids, label_list, align_sequences.length)
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
      let [datL0,datL1] =  await return_popular_motifs0(motif[i],N);

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

        createDualChart(viewer1, datL0, color_hues_for_blues, "Pathogenic", datL1,
            color_hues_green_, "Non-Pathogenic", "line"+motif[i], align_sequences, "accordion_main", idsL, labels,motif[i],motif)

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

  function createAccordion(sequences, label, div, highlightRange, right_left, color, id_list, label_list, N) {
    console.log("number of sequences: ", N);
  
    const container = document.getElementById(div);
    container.innerHTML = ''; // Clear previous content
  
    let filteredSequences = sequences; // Use all sequences


      //console.log(sequences)
      //for(let i=0;i<sequences.length;i++){
      //    console.log(sequences[i].length)
      //}
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
      const td1 = document.createElement('td');
      const td2 = document.createElement('td');
      td1.style.width = '25%';
      td2.style.width = '75%';
  
      let box = document.createElement('span');
      box.style.display = 'inline-block';
      box.style.width = '10px';
      box.style.height = '10px';
      box.style.backgroundColor = label_list[index] == 0 ? '#9ecae1' : '#f44336';
      box.style.marginRight = '5px';
  
      td1.appendChild(box);
      td1.appendChild(document.createTextNode(id_list[index]));
      td1.style.fontSize = "18px";
      td1.style.textAlign = "left";
      td1.style.fontFamily = "'Courier New', monospace";

  
      let paddedSeq = seq.padEnd(maxSeqLength, ' ');
      let modifiedSeq = '';


      //TODO: handle this!!! click nothing clickedPos
      if (highlightRange.length === 0) {
        modifiedSeq = paddedSeq; // Display without highlights if highlightRange is empty
      } else {
        for (let i = 0; i < paddedSeq.length; i++) {
          if (highlightRange[0] <= i && i <= highlightRange[1]) {
            modifiedSeq += `<span class="highlight">${paddedSeq[i]}</span>`;
          } else {
            modifiedSeq += paddedSeq[i];
          }
        }
      }
  
      td2.innerHTML = modifiedSeq;
      td2.style.fontSize = "18px";
      td2.style.textAlign = "right";
      td2.style.fontFamily = "'Courier New', monospace";
  
      tr.appendChild(td1);
      tr.appendChild(td2);
      table.appendChild(tr);
    });
  
    panel.appendChild(table);
    container.appendChild(panel);
  
    if (highlightRange.length > 0) {
      // Scroll adjustment to center the highlighted area if highlightRange is not empty
      const characterWidth = getCharacterWidth("'Courier New', monospace", "18px");
      const viewableAreaWidth = container.clientWidth; 
      const midPoint = (highlightRange[0] + highlightRange[1]) / 2;


      const scrollPosition = midPoint * characterWidth - viewableAreaWidth / 2;

        console.log(midPoint,scrollPosition);

      //  container.scrollLeft = scrollPosition
      //  panel.scrollLeft = scrollPosition
        const wrapper = document.getElementById('accordion-wrapper')
      setTimeout(() => container.scrollLeft = scrollPosition, 0);
        setTimeout(() => wrapper.scrollLeft = scrollPosition, 0);

    }
  }
  
















