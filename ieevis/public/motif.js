import { createColorLegendBar } from './scatter_d3.js';
import { addLegendLabels } from './scatter_d3.js';
import { color_hues_for_blues } from './scatter_d3.js';
import { color_hues_green_ } from './scatter_d3.js';

function createDualChart(container, data1, color1, label1, data2, color2, label2, chartId, align_sequences, accordion_table, ids_list, labels_list,model) {
  const width = 1000;
  const height = 120;
  const chartHeight = height / 2;
  // const gap = 10; 
  const margins = { top: 40, right: 10, bottom: 0, left: 90 };
  const barHeight = 20;

  const svg = d3.select(container).append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", width)
      .attr("height", height)
      .attr("id", chartId)
      .style("max-width", "100%")
      .style("height", "auto");
  const xScale = d3.scaleLinear()
      .domain([0, 3065])
      .range([margins.left, width - margins.right - 20]);


  const chartGroups = [
      svg.append("g").attr("transform", `translate(0, 0)`).attr("id", "line1"+model),
      svg.append("g").attr("transform", `translate(0, ${chartHeight-20})`).attr("id", "line2"+model)
  ];
  chartGroups.forEach((group, i) => {
    group.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${chartHeight - margins.bottom})`)
        .call(d3.axisBottom(xScale).tickValues([0, 3065]).tickSizeOuter(0));
    // Adding label for each chart
    const label = (i === 0) ? label1 : label2;  // Choose the label based on the index
    group.append("text")
        .attr("x", 42) // Position label at the center of the width
        .attr("y", (height / 2)-10) // Position at half the top margin
        .attr("text-anchor", "middle") // Center the text horizontally
        .style("font-size", "12px") // Set the font size
        .text(label); // Text content
});

  // Ensure data objects have 'start' and 'end' attributes
  data1.forEach(data => {
      chartGroups[0].append("rect")
          .datum(data)  // Bind the full data object here
          .attr("x", d => xScale(d.start))
          .attr("width", d => xScale(d.end) - xScale(d.start))
          .attr("y", chartHeight - margins.bottom - barHeight)
          .attr("height", barHeight)
          .attr("fill", color1[Math.round(data.prob * (color1.length - 1))])
          .on("click", function(event, d) {
            createAccordion(align_sequences, 0, accordion_table,
              [d.start,d.end], " ", " ", ids_list, labels_list, 437)
          });
  });

  data2.forEach(data => {
      chartGroups[1].append("rect")
          .datum(data)  // Bind the full data object here
          .attr("x", d => xScale(d.start))
          .attr("width", d => xScale(d.end) - xScale(d.start))
          .attr("y", chartHeight - margins.bottom - barHeight)
          .attr("height", barHeight)
          .attr("fill", color2[Math.round(data.prob * (color2.length - 1))])
          .on("click", function(event, d) {
            createAccordion(align_sequences, 0, accordion_table,
              [d.start,d.end], " ", " ", ids_list, labels_list, 437)
                    });
  });

  // Apply zoom to the entire SVG
  // const tickValues = [0, 500, 1000, 1500, 2000, 2500, 3065];

  const zoom = d3.zoom()
        .scaleExtent([1, 32])
        .translateExtent([[margins.left, 0], [width - margins.right, height]])
        .extent([[margins.left, 0], [width - margins.right, height]])
        .on("zoom", (event) => {
            const xz = event.transform.rescaleX(xScale);
            svg.selectAll("rect")
                .attr("x", d => xz(d.start))
                .attr("width", d => xz(d.end) - xz(d.start));
            chartGroups.forEach(group => {
                group.select("g")
                  .call(d3.axisBottom(xz).tickValues(xz.domain().map(Math.round)).tickSizeOuter(0));

                  // .call(d3.axisBottom(xScale).tickValues([0, 3065]).tickSizeOuter(0));
              });
        });


  svg.call(zoom)
    .transition()
    .duration(500)
    .call(zoom.scaleTo, 1);
}



function consoleEvent(event){
  console.log(event)
}







  function createAssoSeqViewers(numOfContainers,motif,color,subs) {
    // Select or create the motif-single container
    let motifSingle = document.getElementById("associated-sequence");

    // Clear existing viewers if any
    motifSingle.innerHTML = '';
    const highlightColor = "yellow"; // Choose any color to highlight



    // Create the specified number of motifs-viewer containers
    for (let i = 0; i < numOfContainers; i++) {
      const viewer = document.createElement("div");
      viewer.classList.add("seq-viewer"); // Use class for multiple elements instead of unique ID
      viewer.style.width = "570px";
      viewer.style.height = "80px";
      viewer.style.overflowX = "auto";

      viewer.style.border = "1px solid blue";
      viewer.style.float = "right";
      viewer.style.marginTop = "10px";
      viewer.style.position = "relative";
      viewer.style.transform = "translateX(-2px)";
      /* Enable horizontal scrolling */
      // viewer.style.overflowWrap= "break-word";
      viewer.style.color = color;
      viewer.innerText = motif[i]; // Optional: Just to identify the viewer

       // Check if the motif contains the subsequence
      if (motif[i].includes(subs)) {
        // Split the motif into parts around the subs for highlighting
        const parts = motif[i].split(subs);
        // Reconstruct the motif with the subs highlighted
        let highlightedHTML = '';
        parts.forEach((part, index) => {
          highlightedHTML += part;
          if (index < parts.length - 1) { // Don't add subs after the last part
            highlightedHTML += `<span style="background-color: ${highlightColor};">${subs}</span>`;
          }
        });
        viewer.innerHTML = highlightedHTML;
      } else {
        viewer.innerText = motif[i];
      }


      motifSingle.appendChild(viewer);
    }
  }
  
  function associatedSeq(selectedlabel,motif,color){
  
     if (selectedlabel==0){
      d3.csv("https://raw.githubusercontent.com/vikash06131721/Data-host/main/motif_dictgroup0.csv").then(function(data){
        console.log(data);
        const filteredSeq = data.filter(item => item.motifs.includes(motif)).map(item => item.sequences);
        console.log(filteredSeq);
        const containers = filteredSeq[0].split(";").length;
        const all_seqs = filteredSeq[0].split(";");
        createAssoSeqViewers(containers,all_seqs,color,motif);
  
      });
    }
    else if(selectedlabel==1){
      d3.csv("https://raw.githubusercontent.com/vikash06131721/Data-host/main/motif_dictgroup1.csv").then(function(data){
        console.log(data);
        const filteredSeq = data.filter(item => item.motifs.includes(motif)).map(item => item.sequences);
        console.log(filteredSeq);
        const containers = filteredSeq[0].split(";").length;
        const all_seqs = filteredSeq[0].split(";");
        createAssoSeqViewers(containers,all_seqs,color,motif);
  
      });
  
    }
  
  }

  
  async function return_popular_motifs0(modelType,N) {
    // Load and process the CSV file
    const motif_data = await d3.json("https://raw.githubusercontent.com/vikash06131721/Data-host/main/group0.json");
    let all_data;
    if(modelType=="BiLSTM_T5"){
        all_data = await d3.csv("cas9_bisltm_t5.csv");

        // all_data = await d3.csv("cas9_bisltm_t5_new.csv");
      }
    else if(modelType=="CNN_T5"){
        // all_data = await  d3.csv("cas9_cnn_t5.csv");
        all_data = await  d3.csv("cas9_cnn_t5.csv");

    
      }
    else if(modelType=="BiLSTM_GPT2"){
        // all_data = await d3.csv("cas9_bilstm_gpt2.csv");
        all_data = await d3.csv("cas9_bilstm_gpt2.csv");

  
      }
    else if(modelType=="BiLSTM_Bert"){
        // all_data = await d3.csv("cas9_bert_lstm.csv");
        all_data = await d3.csv("cas9_bert_lstm.csv");

  
      }
    else if(modelType=="CNN_gpt2"){
        // "https://raw.githubusercontent.com/vikash06131721/Data-host/main/cas9all_gpt2_cnn_files.csv"
        // all_data = await d3.csv("cas9_cnn_gpt2.csv");
        all_data = await d3.csv("cas9_cnn_gpt2.csv");

  
      }
    else if(modelType=="CNN_Bert"){
        // all_data = await d3.csv("cas9_bert_cnn.csv");
        all_data = await d3.csv("cas9_bert_cnn.csv");

  
      }
    else if(modelType=="Trans_Gpt2"){
        // all_data = await d3.csv("cas9_gpt2_only.csv");
        all_data = await d3.csv("cas9_gpt2_only.csv");

  
      }
    else if(modelType=="Trans_T5"){
        // all_data = await d3.csv("cas9_t5_only.csv");
        all_data = await d3.csv("cas9_t5_only.csv");

  
      }
    else if(modelType=="Trans_Bert"){
        // all_data = await d3.csv("cas9_bert_only.csv");
        all_data = await d3.csv("cas9_bert_only.csv");

      }
    
    let strings=[];
    let probs=[]
    let all_pos=[]
    all_data.forEach(d => {
      if(d.label==0){
        const mot = d.align_motifs;
        const pos = d.align_start_stop
        let pos1 = pos.replace(/'/g, '"')
        let pos2 = pos1.replace('None','[0,0]')
        strings.push(JSON.parse(mot.replace(/'/g, '"')))
        probs.push(JSON.parse(d.prob))
        all_pos.push(JSON.parse(pos2))
      }
    });

    let sequenceData = {};

    strings.forEach((seqList, index) => {
        seqList.forEach((seq, seqIndex) => {
            const [startPos, endPos] = all_pos[index][seqIndex];
            const positionSpread = endPos - startPos;
            const allowedSpread = Math.ceil(seq.length * 1.5); // 50% more than the length of the sequence

            if (positionSpread <= allowedSpread) {
                if (!sequenceData[seq]) {
                    sequenceData[seq] = {
                        positions: {},
                        totalProb: 0,
                        count: 0
                    };
                }
                // Record each start and end position pair along with their occurrences
                const posKey = `${startPos}-${endPos}`;
                if (!sequenceData[seq].positions[posKey]) {
                    sequenceData[seq].positions[posKey] = 0;
                }
                sequenceData[seq].positions[posKey] += 1;

                sequenceData[seq].totalProb += probs[index][seqIndex];
                sequenceData[seq].count += 1;
            }
        });
    });

    // After collecting data, determine the most frequent range for each sequence
    Object.keys(sequenceData).forEach(seq => {
        const posEntries = Object.entries(sequenceData[seq].positions);
        const mostCommonPos = posEntries.reduce((max, entry) => {
            return (entry[1] > max[1]) ? entry : max;
        }, ['', 0]); // Initialize with empty string and zero count

        // Update sequenceData with the most common start and end positions
        const [mostCommonStart, mostCommonEnd] = mostCommonPos[0].split('-').map(Number);
        sequenceData[seq].mostCommonStart = mostCommonStart;
        sequenceData[seq].mostCommonEnd = mostCommonEnd;

        // Optional: clean up by removing the 'positions' object if not needed further
        delete sequenceData[seq].positions;
    });

// console.log(sequenceData);


    const entriesArray = Object.entries(sequenceData).map(([seq, data]) => {
      return {
          sequence: seq, // Adding the sequence string to the object
          ...data // Spread the existing data properties
      };
    });
    
    // Sort the array based on the 'count' property in descending order
    entriesArray.sort((a, b) => b.count - a.count);
    
    // Get the top 40 entries
    const topFortyEntries = entriesArray;

    const nonOverlappingEntries = [];
    const addEntryIfNonOverlapping = (entry) => {
        for (let existingEntry of nonOverlappingEntries) {
            // Check for overlap
            if (!(entry.mostCommonEnd < existingEntry.mostCommonStart || entry.mostCommonStart > existingEntry.mostCommonEnd)) {
                return false; // There is an overlap, do not add this entry
            }
        }
        return true; // No overlaps found, this entry can be added
    };

    for (let entry of topFortyEntries) {
        if (nonOverlappingEntries.length >= 200) {
            break; // Stop if we already have 10 non-overlapping entries
        }
        if (addEntryIfNonOverlapping(entry)) {
            nonOverlappingEntries.push(entry); // Add to the list if non-overlapping
        }
    }

    // console.log(nonOverlappingEntries); // This will show the top 10 non-overlapping entries based on count

    const sequences = {};
    const probability = {};

    nonOverlappingEntries.forEach(entry => {
        sequences[entry.sequence] = [entry.mostCommonStart,entry.mostCommonEnd, entry.count ];
        probability[entry.sequence] = entry.totalProb / entry.count;
    });

    // Remove overlapping sequences
    let nonOverlappingSequences = Object.entries(sequenceData).sort((a, b) => a[1].startPos - b[1].startPos);
    nonOverlappingSequences = nonOverlappingSequences.reduce((acc, current) => {
        if (!acc.some(item => item[1].endPos >= current[1].startPos)) {
            acc.push(current);
        }
        return acc;
    }, []);

    // Sort by count in descending order and selecting top sequences
    const topSequences = nonOverlappingSequences
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 20); // Change to 40 or any other number as required

    // Prepare separate dictionaries for positions and probabilities
    const positionData = {};
    const probabilityData = {};

    topSequences.forEach(([seq, data]) => {
        positionData[seq] = [data.startPos, data.endPos];
        probabilityData[seq] = parseFloat(data.totalProb.toFixed(6));
    });

    // console.log("Position Data:", positionData);
    // console.log("Probability Data:", probabilityData);

      


    // Flatten the structures and prepare for counting, summing probabilities, and positions
    let combined = [];
    let posIndex = 0; // To keep track of corresponding positions
    strings.forEach((sublist, index) => {
      sublist.forEach((item, subIndex) => {
        combined.push({ item: item, prob: probs[index][subIndex], pos: all_pos[index][subIndex] });
      });
    });

    // Count frequencies, sum probabilities, and sum positions
    let counts = {};
    let probSums = {};
    let posSums={};
    combined.forEach(({ item, prob, pos }) => {
      counts[item] = (counts[item] || 0) + 1;
      probSums[item] = (probSums[item] || 0) + prob;

      // console.log("POS values",pos);
      // console.log("POS values item",posSums[item]);
      
    });

    // let posSums = {};

    // Sum positions for each item
    combined.sort((a, b) => a.pos[1] - b.pos[1]);
    // Filter out overlapping intervals
    let lastEnd = -Infinity;
    const new_combined = combined.filter(interval => {
        if (interval.pos[0] >= lastEnd) {
            lastEnd = interval.pos[1];
            return true;
        }
        return false;
    });

    try {
      new_combined.forEach(entry => {
            if (!posSums[entry.item]) {
                posSums[entry.item] = [0, 0];
            }
            posSums[entry.item][0] += entry.pos[0];
            posSums[entry.item][1] += entry.pos[1];
        });
    } catch (error) {
        console.error("Error summing positions:", error);
    }

    // Compute average positions and round to nearest integer
    let avgPositions = {};

    try {
        Object.keys(posSums).forEach(item => {
            let avgPos = [
                Math.round(posSums[item][0] / counts[item]), 
                Math.round(posSums[item][1] / counts[item])
            ];
            avgPositions[item] = avgPos;
        });
    } catch (error) {
        console.error("Error computing average positions:", error);
    }



    // Calculate average positions and round them
    

    // Sort by frequency in decreasing order and then slice the top 5
    let sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]);

    // Extract top 5 items for probability sums and average positions to match the sorted and sliced counts
    let sortedProbSums = {};
    let sortedAvgPositions = {};
    sortedCounts.forEach(([item, _]) => {
      sortedProbSums[item] = probSums[item];
      sortedAvgPositions[item] = avgPositions[item];
    });

    // Convert to the desired object format
    let resultCounts = Object.fromEntries(sortedCounts);
    let resultProbSums = sortedProbSums;
    let resultAvgPositions = sortedAvgPositions;

    // let newPop0={}

    const popularMotifs0 = Object.keys(motif_data);
  
    // Initialize an empty object to store the 3rd values
    const thirdValues = {};
  
    // Loop over each key in the jsonData object
    for (const key in motif_data) {
        if (motif_data.hasOwnProperty(key)) {
            // Access and store the 3rd value ([min_0th_index, min_1st_index]) for the current key
            thirdValues[key] = motif_data[key][5];
        }
    }
  
    
    // Return the result
    return [sequences,probability]
    // return[positionData,probabilityData];
    // return [avgPositions,probSums];
  }

  

  async function return_popular_motifs1(modelType,N) {
        // Load and process the CSV file
      const motif_data = await d3.json("https://raw.githubusercontent.com/vikash06131721/Data-host/main/group0.json");
      let all_data;
      if(modelType=="BiLSTM_T5"){
          all_data = await d3.csv("cas9_bisltm_t5.csv");

          // all_data = await d3.csv("cas9_bisltm_t5_new.csv");
        }
      else if(modelType=="CNN_T5"){
          // all_data = await  d3.csv("cas9_cnn_t5.csv");
          all_data = await  d3.csv("cas9_cnn_t5.csv");

      
        }
      else if(modelType=="BiLSTM_GPT2"){
          // all_data = await d3.csv("cas9_bilstm_gpt2.csv");
          all_data = await d3.csv("cas9_bilstm_gpt2.csv");

    
        }
      else if(modelType=="BiLSTM_Bert"){
          // all_data = await d3.csv("cas9_bert_lstm.csv");
          all_data = await d3.csv("cas9_bert_lstm.csv");

    
        }
      else if(modelType=="CNN_gpt2"){
          // "https://raw.githubusercontent.com/vikash06131721/Data-host/main/cas9all_gpt2_cnn_files.csv"
          // all_data = await d3.csv("cas9_cnn_gpt2.csv");
          all_data = await d3.csv("cas9_cnn_gpt2.csv");

    
        }
      else if(modelType=="CNN_Bert"){
          // all_data = await d3.csv("cas9_bert_cnn.csv");
          all_data = await d3.csv("cas9_bert_cnn.csv");

    
        }
      else if(modelType=="Trans_Gpt2"){
          // all_data = await d3.csv("cas9_gpt2_only.csv");
          all_data = await d3.csv("cas9_gpt2_only.csv");

    
        }
      else if(modelType=="Trans_T5"){
          // all_data = await d3.csv("cas9_t5_only.csv");
          all_data = await d3.csv("cas9_t5_only.csv");

    
        }
      else if(modelType=="Trans_Bert"){
          // all_data = await d3.csv("cas9_bert_only.csv");
          all_data = await d3.csv("cas9_bert_only.csv");

        }
        
        let strings=[];
        let probs=[]
        let all_pos=[]
        all_data.forEach(d => {
          if(d.label==1){
            const mot = d.align_motifs;
            const pos = d.align_start_stop
            let pos1 = pos.replace(/'/g, '"')
            let pos2 = pos1.replace('None','[0,0]')
            strings.push(JSON.parse(mot.replace(/'/g, '"')))
            probs.push(JSON.parse(d.prob))
            all_pos.push(JSON.parse(pos2))
          }
        });
        let sequenceData = {};

        strings.forEach((seqList, index) => {
            seqList.forEach((seq, seqIndex) => {
                const [startPos, endPos] = all_pos[index][seqIndex];
                const positionSpread = endPos - startPos;
                const allowedSpread = Math.ceil(seq.length * 1.5); // 50% more than the length of the sequence

                if (positionSpread <= allowedSpread) {
                    if (!sequenceData[seq]) {
                        sequenceData[seq] = {
                            positions: {},
                            totalProb: 0,
                            count: 0
                        };
                    }
                    // Record each start and end position pair along with their occurrences
                    const posKey = `${startPos}-${endPos}`;
                    if (!sequenceData[seq].positions[posKey]) {
                        sequenceData[seq].positions[posKey] = 0;
                    }
                    sequenceData[seq].positions[posKey] += 1;

                    sequenceData[seq].totalProb += probs[index][seqIndex];
                    sequenceData[seq].count += 1;
                }
            });
        });

        // After collecting data, determine the most frequent range for each sequence
        Object.keys(sequenceData).forEach(seq => {
            const posEntries = Object.entries(sequenceData[seq].positions);
            const mostCommonPos = posEntries.reduce((max, entry) => {
                return (entry[1] > max[1]) ? entry : max;
            }, ['', 0]); // Initialize with empty string and zero count

            // Update sequenceData with the most common start and end positions
            const [mostCommonStart, mostCommonEnd] = mostCommonPos[0].split('-').map(Number);
            sequenceData[seq].mostCommonStart = mostCommonStart;
            sequenceData[seq].mostCommonEnd = mostCommonEnd;

            // Optional: clean up by removing the 'positions' object if not needed further
            delete sequenceData[seq].positions;
        });



        const entriesArray = Object.entries(sequenceData).map(([seq, data]) => {
          return {
              sequence: seq, // Adding the sequence string to the object
              ...data // Spread the existing data properties
          };
        });
        
        // Sort the array based on the 'count' property in descending order
        entriesArray.sort((a, b) => b.count - a.count);
        
        // Get the top 40 entries
        const topFortyEntries = entriesArray;

        const nonOverlappingEntries = [];
        const addEntryIfNonOverlapping = (entry) => {
            for (let existingEntry of nonOverlappingEntries) {
                // Check for overlap
                if (!(entry.mostCommonEnd < existingEntry.mostCommonStart || entry.mostCommonStart > existingEntry.mostCommonEnd)) {
                    return false; // There is an overlap, do not add this entry
                }
            }
            return true; // No overlaps found, this entry can be added
        };
        
        for (let entry of topFortyEntries) {
            if (nonOverlappingEntries.length >= 200) {
                break; // Stop if we already have 10 non-overlapping entries
            }
            if (addEntryIfNonOverlapping(entry)) {
                nonOverlappingEntries.push(entry); // Add to the list if non-overlapping
            }
        }

        // console.log(nonOverlappingEntries); // This will show the top 10 non-overlapping entries based on count

        const sequences = {};
        const probability = {};

        nonOverlappingEntries.forEach(entry => {
            sequences[entry.sequence] = [entry.mostCommonStart,entry.mostCommonEnd, entry.count ];
            probability[entry.sequence] = entry.totalProb / entry.count;
        });
    
    
        // Flatten the structures and prepare for counting, summing probabilities, and positions
        let combined = [];
        let posIndex = 0; // To keep track of corresponding positions
        strings.forEach((sublist, index) => {
          sublist.forEach((item, subIndex) => {
            combined.push({ item: item, prob: probs[index][subIndex], pos: all_pos[index][subIndex] });
          });
        });
    
        // Count frequencies, sum probabilities, and sum positions
        let counts = {};
        let probSums = {};
        let posSums={};
        combined.forEach(({ item, prob, pos }) => {
          counts[item] = (counts[item] || 0) + 1;
          probSums[item] = (probSums[item] || 0) + prob;
    
          // console.log("POS values",pos);
          // console.log("POS values item",posSums[item]);
          
        });
    
        // let posSums = {};
    
        // Sum positions for each item
        combined.sort((a, b) => a.pos[1] - b.pos[1]);
        // Filter out overlapping intervals
        let lastEnd = -Infinity;
        const new_combined = combined.filter(interval => {
            if (interval.pos[0] >= lastEnd) {
                lastEnd = interval.pos[1];
                return true;
            }
            return false;
        });
        try {
          new_combined.forEach(entry => {
                if (!posSums[entry.item]) {
                    posSums[entry.item] = [0, 0];
                }
                posSums[entry.item][0] += entry.pos[0];
                posSums[entry.item][1] += entry.pos[1];
            });
        } catch (error) {
            console.error("Error summing positions:", error);
        }
    
        // Compute average positions and round to nearest integer
        let avgPositions = {};
    
        try {
            Object.keys(posSums).forEach(item => {
                let avgPos = [
                    Math.round(posSums[item][0] / counts[item]), 
                    Math.round(posSums[item][1] / counts[item])
                ];
                avgPositions[item] = avgPos;
            });
        } catch (error) {
            console.error("Error computing average positions:", error);
        }
    
    
    
        // Calculate average positions and round them
        
    
        // Sort by frequency in decreasing order and then slice the top 5
        let sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, N);
    
        // Extract top 5 items for probability sums and average positions to match the sorted and sliced counts
        let sortedProbSums = {};
        let sortedAvgPositions = {};
        sortedCounts.forEach(([item, _]) => {
          sortedProbSums[item] = probSums[item];
          sortedAvgPositions[item] = avgPositions[item];
        });
    
        // Convert to the desired object format
        let resultCounts = Object.fromEntries(sortedCounts);
        let resultProbSums = sortedProbSums;
        let resultAvgPositions = sortedAvgPositions;
    
        // let newPop0={}
    
        const popularMotifs0 = Object.keys(motif_data);
      
        // Initialize an empty object to store the 3rd values
        const thirdValues = {};
      
        // Loop over each key in the jsonData object
        for (const key in motif_data) {
            if (motif_data.hasOwnProperty(key)) {
                // Access and store the 3rd value ([min_0th_index, min_1st_index]) for the current key
                thirdValues[key] = motif_data[key][5];
            }
        }
      
        // Return the result
        return [sequences,probability]
        // return [avgPositions,probSums];
      }
  

  //block for each model output
  function createHtmlViews(uniqueId,width_style) {
    let viewer1 = document.createElement("div");

    viewer1.id = uniqueId; // Setting a unique ID to the div
    viewer1.classList.add("seq-viewer");
    viewer1.style.width = width_style;

      // viewer1.style.height = "90%";
      // viewer1.style.overflowX = "auto";
      // viewer1.style.border = "1px solid white";
      // viewer1.style.float = "right";
      // viewer1.style.fontSize = "10px";
      // viewer1.style.position = "absolute";
      // viewer1.style.bottom = "0"; // Move to the bottom
      // viewer1.style.right = "0"; // Align to the right, ensures centering if left is also set to 0

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
      viewer.style.width = "98%";
      viewer.style.height = "20%";
      // viewer.style.overflowX = "auto";
      viewer.style.border = "1px solid white";
      viewer.style.float = "right";
      viewer.style.marginTop = "10px";
      viewer.style.position = "relative";
      viewer.style.transform = "translateX(-8px)";
  
      // Create a new div element to serve as the text container
      let textContainer = document.createElement("div");
      // textContainer.style.display = "flex";
      // textContainer.style.justifyContent = "center";
      textContainer.style.alignItems = "center";
      textContainer.style.height = "25px";
      textContainer.style.width = "100px";
      textContainer.style.marginTop = "0px";
      textContainer.style.marginBottom = "0px"


      textContainer.style.color = color; // Assuming 'color' is defined earlier
      textContainer.innerText = motif[i]; // Assuming 'motif' is an array and 'i' is the index
      textContainer.style.border = "1px solid white";
    

      // To move the container to the left by 200px
      textContainer.style.marginLeft = "0px"; // Moves the container left by 200px

      // Append the container to the document body or another specific element
      document.body.appendChild(textContainer);

      viewer.appendChild(textContainer);

      let N=10;
      const [pop0,all_prob0] = await return_popular_motifs0(motif[i],N);
      const [pop1,all_prob1]= await return_popular_motifs1(motif[i],N);

      let keys1 = Object.keys(pop0); // Get all keys
      let keys2 = Object.keys(pop1);

  
      const viewer1 = document.createElement("div");
      viewer1.id = "viewer1"+motif[i]; // Setting a unique ID to the div
  
      viewer1.classList.add("motif-viewer1");
      viewer1.style.width = "100%";
      viewer1.style.height = "130px";
      // viewer1.style.overflowX = "auto";
      viewer1.style.border = "1px solid white";
      viewer1.style.float = "left";
      // viewer1.style.marginTop = "2px";
      viewer1.style.position = "relative";
      viewer1.style.transform = "translateX(8px)";
      viewer1.style.left = "10px";
     
      viewer1.addEventListener('click', function() {
         if (viewer1.innerText === "Label 0"){
          // createAccordion(align0, 0, "accordion1", " ");
          alert('Label 0');
        }
      });
      viewer.append(viewer1);
  
      
  
      // const viewer2 = document.createElement("div");
      // viewer2.classList.add("motif-viewer2");
      // viewer2.style.width = "100%";
      // viewer2.style.height = "60px";
      // // viewer2.style.overflowX = "auto";
      // viewer2.style.border = "1px solid white";
      // viewer2.style.float = "left";
      // viewer2.style.marginTop = "2px";
      // viewer2.style.position = "relative";
      // viewer2.style.transform = "translateX(8px)";
      // viewer2.style.left = "10px";
      //
      // // viewer2.append(view_table2)
      // viewer2.addEventListener('click', function() {
      //    if (viewer2.innerText === "Label 1"){
      //
      //     // createAccordion(align1, 1, "accordion2", " ");
      //     alert('Label 1');
      //   }
      // });

      // Convert the dictionary into a sorted array of index ranges
      const indexRanges = Object.entries(pop0).map(([key, value]) => {
        // Destructure the array to get startPos, endPos, and count directly
        const [startPos, endPos, count] = value;
        return {
            start: startPos,
            end: endPos,
            keys: key,
            count: count // include count here
        };
    }).filter(d => d.end - d.start <= 50) 
     .sort((a, b) => a.start - b.start); // Sorting by start position

      let indexRangesProb = indexRanges.map(item => {
        // Copy the original item
        let newItem = {...item};
        // Add the 'prob' key with the corresponding value from the probDict
        newItem.prob = all_prob0[item.keys];
        return newItem;
      });

  
      // Convert the dictionary into a sorted array of index ranges
      const indexRanges1 = Object.entries(pop1).map(([key, value]) => {
        // Destructure the array to get startPos, endPos, and count directly
        const [startPos, endPos, count] = value;
        return {
            start: startPos,
            end: endPos,
            keys: key,
            count: count // include count here
        };
    }).filter(d => d.end - d.start <= 50) 
      .sort((a, b) => a.start - b.start); // Sorting by start position


      let indexRangesProb1 = indexRanges1.map(item => {
        // Copy the original item
        let newItem = {...item};
        // Add the 'prob' key with the corresponding value from the probDict
        newItem.prob = all_prob1[item.keys];
        return newItem;
    });
      createDualChart(viewer1, indexRangesProb, color_hues_for_blues, "Pathogenic", indexRangesProb1, 
      color_hues_green_, "Non-Pathogenic", "line"+motif[i], align_sequences, "accordion_main", idsL, labels,motif[i])
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
    const filteredSequences_new = filteredSequences.slice(0, N);
    const maxSeqLength = Math.max(...filteredSequences_new.map(seq => seq.length));
  
    // CSS for highlighting and panel scrolling
    const style = document.createElement('style');
    style.textContent = `.highlight { background-color: yellow; } .panel { overflow-x: auto; width: 100%; display: block; } table { width: 100%; table-layout: fixed; } td { font-family: 'Courier New', monospace; vertical-align: top; text-align: left; white-space: pre;}`;
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
  
      let paddedSeq = seq.padEnd(maxSeqLength, ' ');
      let modifiedSeq = '';
  
      if (highlightRange.length === 0) {
        modifiedSeq = paddedSeq; // Display without highlights if highlightRange is empty
      } else {
        for (let i = 0; i < paddedSeq.length; i++) {
          if (i >= highlightRange[0] && i <= highlightRange[1]) {
            modifiedSeq += `<span class="highlight">${paddedSeq[i]}</span>`;
          } else {
            modifiedSeq += paddedSeq[i];
          }
        }
      }
  
      td2.innerHTML = modifiedSeq;
      td2.style.fontSize = "18px";
      td2.style.textAlign = "right";
  
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
      setTimeout(() => panel.scrollLeft = scrollPosition, 0);
    }
  }
  
















