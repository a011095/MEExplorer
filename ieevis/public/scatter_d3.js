const color_hues_for_consensus= ["#f7fbff","#f6faff","#f5fafe","#f5f9fe","#f4f9fe","#f3f8fe","#f2f8fd","#f2f7fd","#f1f7fd","#f0f6fd","#eff6fc","#eef5fc","#eef5fc","#edf4fc","#ecf4fb","#ebf3fb","#eaf3fb","#eaf2fb","#e9f2fa","#e8f1fa","#e7f1fa","#e7f0fa","#e6f0f9","#e5eff9","#e4eff9","#e3eef9","#e3eef8","#e2edf8","#e1edf8","#e0ecf8","#e0ecf7","#dfebf7","#deebf7","#ddeaf7","#ddeaf6","#dce9f6","#dbe9f6","#dae8f6","#d9e8f5","#d9e7f5","#d8e7f5","#d7e6f5","#d6e6f4","#d6e5f4","#d5e5f4","#d4e4f4","#d3e4f3","#d2e3f3","#d2e3f3","#d1e2f3","#d0e2f2","#cfe1f2","#cee1f2","#cde0f1","#cce0f1","#ccdff1","#cbdff1","#cadef0","#c9def0","#c8ddf0","#c7ddef","#c6dcef","#c5dcef","#c4dbee","#c3dbee","#c2daee","#c1daed","#c0d9ed","#bfd9ec","#bed8ec","#bdd8ec","#bcd7eb","#bbd7eb","#b9d6eb","#b8d5ea","#b7d5ea","#b6d4e9","#b5d4e9","#b4d3e9","#b2d3e8","#b1d2e8","#b0d1e7","#afd1e7","#add0e7","#acd0e6","#abcfe6","#a9cfe5","#a8cee5","#a7cde5","#a5cde4","#a4cce4","#a3cbe3","#a1cbe3","#a0cae3","#9ec9e2","#9dc9e2","#9cc8e1","#9ac7e1","#99c6e1","#97c6e0","#96c5e0","#94c4df","#93c3df","#91c3df","#90c2de","#8ec1de","#8dc0de","#8bc0dd","#8abfdd","#88bedc","#87bddc","#85bcdc","#84bbdb","#82bbdb","#81badb","#7fb9da","#7eb8da","#7cb7d9","#7bb6d9","#79b5d9","#78b5d8","#76b4d8","#75b3d7","#73b2d7","#72b1d7","#70b0d6","#6fafd6","#6daed5","#6caed5","#6badd5","#69acd4","#68abd4","#66aad3","#65a9d3","#63a8d2","#62a7d2","#61a7d1","#5fa6d1","#5ea5d0","#5da4d0","#5ba3d0","#5aa2cf","#59a1cf","#57a0ce","#569fce","#559ecd","#549ecd","#529dcc","#519ccc","#509bcb","#4f9acb","#4d99ca","#4c98ca","#4b97c9","#4a96c9","#4895c8","#4794c8","#4693c7","#4592c7","#4492c6","#4391c6","#4190c5","#408fc4","#3f8ec4","#3e8dc3","#3d8cc3","#3c8bc2","#3b8ac2","#3a89c1","#3988c1","#3787c0","#3686c0","#3585bf","#3484bf","#3383be","#3282bd","#3181bd","#3080bc","#2f7fbc","#2e7ebb","#2d7dbb","#2c7cba","#2b7bb9","#2a7ab9","#2979b8","#2878b8","#2777b7","#2676b6","#2574b6","#2473b5","#2372b4","#2371b4","#2270b3","#216fb3","#206eb2","#1f6db1","#1e6cb0","#1d6bb0","#1c6aaf","#1c69ae","#1b68ae","#1a67ad","#1966ac","#1865ab","#1864aa","#1763aa","#1662a9","#1561a8","#1560a7","#145fa6","#135ea5","#135da4","#125ca4","#115ba3","#115aa2","#1059a1","#1058a0","#0f579f","#0e569e","#0e559d","#0e549c","#0d539a","#0d5299","#0c5198","#0c5097","#0b4f96","#0b4e95","#0b4d93","#0b4c92","#0a4b91","#0a4a90","#0a498e","#0a488d","#09478c","#09468a","#094589","#094487","#094386","#094285","#094183","#084082","#083e80","#083d7f","#083c7d","#083b7c","#083a7a","#083979","#083877","#083776","#083674","#083573","#083471","#083370","#08326e","#08316d","#08306b"]

export const color_hues_for_blues= color_hues_for_consensus.slice(-180)

function getSelectedColors(colors) {
  const lowColors = colors.slice(0, 3);
  const midIndex = Math.floor(colors.length / 2) - 1;
  const midColors = colors.slice(midIndex, midIndex + 3);
  const highColors = colors.slice(-3);
  return lowColors.concat(midColors, highColors);
}
export const selectedColors_sim_blues = getSelectedColors(color_hues_for_blues);

const colorScales = {
    '0': {
        '0.0':'#d8eaf3',
        '0.33': '#9ea9e1', // Lighter version of #9ecae1
        '0.67': '#9ecae1', // Original color
        '1.0': '#64aacf', // Darker version of #9ecae1
    },
    '1': {
      '0.0':'#f1b4b4',
      '0.33': '#e57373', // Light red (similar lightness to #6eb76a)
      '0.67': '#f44336', // Red (a standard shade that matches the intensity of #7fbf7b)
      '1.0':  '#d32f2f'  // Deep red (darker version similar to #90c78c)
  }
};
// const color_hues_green =["#f7fcf5","#f6fcf4","#f6fcf4","#f5fbf3","#f5fbf2","#f4fbf2","#f4fbf1","#f3faf0","#f2faf0","#f2faef","#f1faee","#f1faee","#f0f9ed","#f0f9ec","#eff9ec","#eef9eb","#eef8ea","#edf8ea","#ecf8e9","#ecf8e8","#ebf7e7","#ebf7e7","#eaf7e6","#e9f7e5","#e9f6e4","#e8f6e4","#e7f6e3","#e7f6e2","#e6f5e1","#e5f5e1","#e4f5e0","#e4f4df","#e3f4de","#e2f4dd","#e1f4dc","#e1f3dc","#e0f3db","#dff3da","#def2d9","#ddf2d8","#ddf2d7","#dcf1d6","#dbf1d5","#daf1d4","#d9f0d3","#d8f0d2","#d7efd1","#d6efd0","#d5efcf","#d4eece","#d4eece","#d3eecd","#d2edcb","#d1edca","#d0ecc9","#cfecc8","#ceecc7","#cdebc6","#ccebc5","#cbeac4","#caeac3","#c9eac2","#c8e9c1","#c6e9c0","#c5e8bf","#c4e8be","#c3e7bd","#c2e7bc","#c1e6bb","#c0e6b9","#bfe6b8","#bee5b7","#bde5b6","#bbe4b5","#bae4b4","#b9e3b3","#b8e3b2","#b7e2b0","#b6e2af","#b5e1ae","#b3e1ad","#b2e0ac","#b1e0ab","#b0dfaa","#aedfa8","#addea7","#acdea6","#abdda5","#aadca4","#a8dca3","#a7dba2","#a6dba0","#a5da9f","#a3da9e","#a2d99d","#a1d99c","#9fd89b","#9ed799","#9dd798","#9bd697","#9ad696","#99d595","#97d494","#96d492","#95d391","#93d390","#92d28f","#91d18e","#8fd18d","#8ed08c","#8ccf8a","#8bcf89","#8ace88","#88cd87","#87cd86","#85cc85","#84cb84","#82cb83","#81ca82","#80c981","#7ec980","#7dc87f","#7bc77e","#7ac77c","#78c67b","#77c57a","#75c479","#74c478","#72c378","#71c277","#6fc276","#6ec175","#6cc074","#6bbf73","#69bf72","#68be71","#66bd70","#65bc6f","#63bc6e","#62bb6e","#60ba6d","#5eb96c","#5db86b","#5bb86a","#5ab769","#58b668","#57b568","#56b467","#54b466","#53b365","#51b264","#50b164","#4eb063","#4daf62","#4caf61","#4aae61","#49ad60","#48ac5f","#46ab5e","#45aa5d","#44a95d","#42a85c","#41a75b","#40a75a","#3fa65a","#3ea559","#3ca458","#3ba357","#3aa257","#39a156","#38a055","#379f54","#369e54","#359d53","#349c52","#339b51","#329a50","#319950","#30984f","#2f974e","#2e964d","#2d954d","#2b944c","#2a934b","#29924a","#28914a","#279049","#268f48","#258f47","#248e47","#238d46","#228c45","#218b44","#208a43","#1f8943","#1e8842","#1d8741","#1c8640","#1b8540","#1a843f","#19833e","#18823d","#17813d","#16803c","#157f3b","#147e3a","#137d3a","#127c39","#117b38","#107a37","#107937","#0f7836","#0e7735","#0d7634","#0c7534","#0b7433","#0b7332","#0a7232","#097131","#087030","#086f2f","#076e2f","#066c2e","#066b2d","#056a2d","#05692c","#04682b","#04672b","#04662a","#03642a","#036329","#026228","#026128","#026027","#025e27","#015d26","#015c25","#015b25","#015a24","#015824","#015723","#005623","#005522","#005321","#005221","#005120","#005020","#004e1f","#004d1f","#004c1e","#004a1e","#00491d","#00481d","#00471c","#00451c","#00441b"]
const color_hues_green = ["#fff5f0","#fff4ef","#fff4ee","#fff3ed","#fff2ec","#fff2eb","#fff1ea","#fff0e9","#fff0e8","#ffefe7","#ffeee6","#ffeee6","#ffede5","#ffece4","#ffece3","#ffebe2","#feeae1","#fee9e0","#fee9de","#fee8dd","#fee7dc","#fee6db","#fee6da","#fee5d9","#fee4d8","#fee3d7","#fee2d6","#fee2d5","#fee1d4","#fee0d2","#fedfd1","#feded0","#feddcf","#fedccd","#fedbcc","#fedacb","#fed9ca","#fed8c8","#fed7c7","#fdd6c6","#fdd5c4","#fdd4c3","#fdd3c1","#fdd2c0","#fdd1bf","#fdd0bd","#fdcfbc","#fdceba","#fdcdb9","#fdccb7","#fdcbb6","#fdc9b4","#fdc8b3","#fdc7b2","#fdc6b0","#fdc5af","#fdc4ad","#fdc2ac","#fdc1aa","#fdc0a8","#fcbfa7","#fcbea5","#fcbca4","#fcbba2","#fcbaa1","#fcb99f","#fcb89e","#fcb69c","#fcb59b","#fcb499","#fcb398","#fcb196","#fcb095","#fcaf94","#fcae92","#fcac91","#fcab8f","#fcaa8e","#fca98c","#fca78b","#fca689","#fca588","#fca486","#fca285","#fca183","#fca082","#fc9e81","#fc9d7f","#fc9c7e","#fc9b7c","#fc997b","#fc987a","#fc9778","#fc9677","#fc9475","#fc9374","#fc9273","#fc9071","#fc8f70","#fc8e6f","#fc8d6d","#fc8b6c","#fc8a6b","#fc8969","#fc8868","#fc8667","#fc8565","#fc8464","#fb8263","#fb8162","#fb8060","#fb7f5f","#fb7d5e","#fb7c5d","#fb7b5b","#fb795a","#fb7859","#fb7758","#fb7657","#fb7455","#fa7354","#fa7253","#fa7052","#fa6f51","#fa6e50","#fa6c4e","#f96b4d","#f96a4c","#f9684b","#f9674a","#f96549","#f86448","#f86347","#f86146","#f86045","#f75e44","#f75d43","#f75c42","#f65a41","#f65940","#f6573f","#f5563e","#f5553d","#f4533c","#f4523b","#f4503a","#f34f39","#f34e38","#f24c37","#f24b37","#f14936","#f14835","#f04734","#ef4533","#ef4433","#ee4332","#ed4131","#ed4030","#ec3f2f","#eb3d2f","#eb3c2e","#ea3b2d","#e93a2d","#e8382c","#e7372b","#e6362b","#e6352a","#e5342a","#e43229","#e33128","#e23028","#e12f27","#e02e27","#df2d26","#de2c26","#dd2b25","#dc2a25","#db2924","#da2824","#d92723","#d72623","#d62522","#d52422","#d42321","#d32221","#d22121","#d12020","#d01f20","#ce1f1f","#cd1e1f","#cc1d1f","#cb1d1e","#ca1c1e","#c91b1e","#c71b1d","#c61a1d","#c5191d","#c4191c","#c3181c","#c2181c","#c0171b","#bf171b","#be161b","#bd161a","#bb151a","#ba151a","#b91419","#b81419","#b61419","#b51319","#b41318","#b21218","#b11218","#b01218","#ae1117","#ad1117","#ac1117","#aa1017","#a91016","#a71016","#a60f16","#a40f16","#a30e15","#a10e15","#a00e15","#9e0d15","#9c0d14","#9b0c14","#990c14","#970c14","#960b13","#940b13","#920a13","#900a13","#8f0a12","#8d0912","#8b0912","#890812","#870811","#860711","#840711","#820711","#800610","#7e0610","#7c0510","#7a0510","#78040f","#76040f","#75030f","#73030f","#71020e","#6f020e","#6d010e","#6b010e","#69000d","#67000d"]
export const color_hues_green_= color_hues_green.slice(-180)
export const selectedColors_sim_green = getSelectedColors(color_hues_green_);

// const classes = [
//   "BiLSTM_T5"
// ];
const classes = [
  "BiLSTM_T5","BiLSTM_GPT2", "BiLSTM_Bert", "CNN_T5", "CNN_gpt2", 
  "CNN_Bert", "Trans_Gpt2", "Trans_T5", "Trans_Bert"
];
// const thresholdPercentage = 10;
const totalRange = 2620; // Constant total range

function withinThreshold(end1, start2,thresh) {
    
    // const gap = (start2 - end1) / totalRange * 100;
    const gap = start2 - end1;
    return gap <= thresh;
}



function mergeSegments(segments, threshold, len,colors) {
  let mergedSegments = [];
  for (let i = 0; i < len; i++) {
      let currentSegment = segments[i];
      if (i === 0) {
          // First segment automatically starts a new merged segment
          mergedSegments.push({...currentSegment});
      } else {
          let lastMergedSegment = mergedSegments[mergedSegments.length - 1];
          if (currentSegment.range_start - lastMergedSegment.range_start <= threshold) {
              // Merge current segment into the last merged segment
              let lastElement = lastMergedSegment.element;
              let currentElement = currentSegment.element;
              let lastLeft = parseFloat(lastElement.style.left);
              let currentLeft = parseFloat(currentElement.style.left);
              let currentWidth = parseFloat(currentElement.style.width);

              // Update combined probability
              let prob1 = parseFloat(lastElement.dataset.prob);
              let prob2 = parseFloat(currentElement.dataset.prob);
              let combinedProbability = prob1 + prob2;
              lastElement.dataset.prob = combinedProbability; // Update the dataset for combined probability

              // Calculate the new width to extend the last element
              let newWidth = Math.max(lastLeft + parseFloat(lastElement.style.width), currentLeft + currentWidth) - lastLeft;
              lastElement.style.width = `${newWidth}px`;

              // Update the background color based on combined probability
              const index = Math.round(combinedProbability * (colors.length - 1));
              let correspondingColor;
              if(index>colors.length){
                correspondingColor = colors[colors.length-1]
              }
              else{
                correspondingColor = colors[index];
              }
           
              lastElement.style.backgroundColor = correspondingColor;

              // Optionally hide the current element since it's merged
              currentElement.style.display = 'none';

              // Update lastMergedSegment range_start to the minimum
              lastMergedSegment.range_start = Math.min(lastMergedSegment.range_start, currentSegment.range_start);
          } else {
              // Far enough to not merge, start new merged segment
              mergedSegments.push({...currentSegment});
          }
      }
  }
  return mergedSegments;
}

function extract_all_child_nodes_start(lineName,thresh_hold,colors){
  // const svgContainer = d3.select(`#${svgId}`);

  const childs = d3.select(`#${lineName}`).childNodes
  const filterNodes = Array.from(childs).filter(
    (node) => node.id && node.id.includes('segment')
  );
  const totalRange = 2950;
  const viewerWidth = 500;
  const startPixels ={};
  filterNodes.forEach((ch, index) => {
    const lft = parseFloat(ch.style.left); // Get the left style property as a float
    const range_start = (lft / viewerWidth) * totalRange; // Calculate range start based on left
    const element = ch;
    startPixels[index] = { range_start, element}; // Store in an object using the index as the key
  });

  const merged = mergeSegments(startPixels, thresh_hold,filterNodes.length,colors)

  
   
  return startPixels
  

}

function mergeIntervalsWithProbabilities(intervals, probabilities, sequences,thresh) {
  let mergedIntervals = [];
  let summedProbabilities = [];
  let mergedSequences = [];

  intervals.forEach((interval, index) => {
      if (mergedIntervals.length > 0) {
          const lastInterval = mergedIntervals[mergedIntervals.length - 1];
          const lastProbability = summedProbabilities[summedProbabilities.length - 1];
          const lastSequence = mergedSequences[mergedSequences.length - 1];

          if (withinThreshold(lastInterval[1], interval[0],thresh)) {
              lastInterval[1] = Math.max(lastInterval[1], interval[1]);
              summedProbabilities[summedProbabilities.length - 1] = lastProbability + probabilities[index];
              mergedSequences[mergedSequences.length - 1] = lastSequence + sequences[index];
          } else {
              mergedIntervals.push(interval.slice());
              summedProbabilities.push(probabilities[index]);
              mergedSequences.push(sequences[index]);
          }
      } else {
          mergedIntervals.push(interval.slice());
          summedProbabilities.push(probabilities[index]);
          mergedSequences.push(sequences[index]);
      }
  });

  return { mergedIntervals, summedProbabilities, mergedSequences };
}


// createLegend();
function sortBasedOnEndPosition(points, sequences, probabilities,thresh) {
  // Combine the arrays into a single array of objects
  const combined = points.map((point, index) => ({
    point,
    sequence: sequences[index],
    probability: probabilities[index]
  }));

  // Sort the combined array based on the end position of each point
  combined.sort((a, b) => a.point[1] - b.point[1]);

  // Separate the combined array back into individual arrays
  const sortedPointsOld = combined.map(item => item.point);
  const sortedSequencesOld = combined.map(item => item.sequence);
  const sortedProbabilitiesOld = combined.map(item => item.probability);

  const result = mergeIntervalsWithProbabilities(sortedPointsOld, sortedProbabilitiesOld,sortedSequencesOld,thresh);
  let sortedPoints = result.mergedIntervals;
  let sortedSequences = result.mergedSequences;
  let sortedProbabilities = result.summedProbabilities;

  return { sortedPoints, sortedSequences, sortedProbabilities };
}


export function createColorLegendBar(divId,color_hues) {
    const colors = [/* Array of colors */];
    const legend = document.getElementById(divId);
    legend.innerHTML=""
    legend.style.display = 'flex';
    legend.style.height = '20px';

    color_hues.forEach(color => {
        const colorBlock = document.createElement('div');
        colorBlock.style.backgroundColor = color;
        colorBlock.style.flexGrow = 1;
        colorBlock.style.height = '100%';
        legend.appendChild(colorBlock);
    });
}

export function addLegendLabels(labelsDivId) {
    const labels = ['0', '0.5','1.0'];
    const labelsDiv = document.getElementById(labelsDivId);
    labelsDiv.innerHTML=""

    labels.forEach(label => {
        const labelElement = document.createElement('span');
        labelElement.textContent = label;
        labelElement.style.fontSize = '10px'
        labelsDiv.appendChild(labelElement);
    });
}


function calculateQ1Q2Q3Q4(sorted_vals, q1,q2,q3,q4){
   // Initialize counters
    let count0toQ1 = 0;
    let countQ1toQ2 = 0;
    let countQ2toQ3 = 0;
    let countQ3toQ4 = 0;

    // Count the values in each interval
    sorted_vals.forEach(value => {
        if (value <= q1) {
            count0toQ1++;
        } else if (value <= q2) {
            countQ1toQ2++;
        } else if (value <= q3) {
            countQ2toQ3++;
        } else {
            countQ3toQ4++;
        }
    });
    return [count0toQ1,countQ1toQ2,countQ2toQ3,countQ3toQ4]
  }


function findQuartileRange(point, q1, q2, q3, q4) {
    if (point <= q1) {
      return ['red',40];
    } else if (point <= q2) {
      return ['gray',100];
    } else if (point <= q3) {
      return ['blue',150];
    } else if (point <= q4) {
      return ['orange',310];
    } else {
      return ["NA",180]; // For points greater than q4
    }
  }


function calculatePositionOnArc(arcCenterX, arcCenterY, radius, angleDegrees) {
  const angleRadians = (angleDegrees - 90) * (Math.PI / 180); // Convert degrees to radians, adjust by -90°
  // const adjustedRadius = radius - arrowLength / 2; // Adjust radius to move arrow back towards center of arc

  // const arcCenterX_new = arcCenterX+2;
  const arrowX = arcCenterX + (radius+4) * Math.cos(angleRadians);
  const arrowY = arcCenterY + (radius+4) * Math.sin(angleRadians);
  return [arrowX, arrowY];
}


function updateDotsColor(svg, data, color_hue,color_hue_green) {
    //if(useSimScoreForColor){
      svg.selectAll("circle")
          .data(data) // Ensure data is accessible here
          .style("fill", d => {
            
                // Use similarity scores to determine color
                if (d.label==0){
                  if(d.similarity_T5==0.0){
                    return color_hue[0]
                  }
                  const scoreIndex = Math.floor(d.similarity_T5 * (color_hue.length - 1));
                  if (!scoreIndex){
                    return "#000000"; 

                  }
                  return color_hue[scoreIndex];

                }
                else if(d.label==1){
                  if(d.similarity_T5==0.0){
                    return color_hue_green[0]
                  }
                  const scoreIndex = Math.floor(d.similarity_T5 * (color_hue_green.length - 1));
                  if (!scoreIndex){
                    return "#000000"; 

                  }
                  return color_hue_green[scoreIndex];
                }
              })
              
    //       }
    // else {
    //     svg.selectAll("circle")
    //     .data(data) // Ensure data is accessible here
    //     .style("fill", d => {
    //
    //           // Use similarity scores to determine color
    //           if (d.label==0){
    //             const scoreIndex = Math.floor(d.sim_scores * (color_hue.length - 1));
    //             return color_hue[scoreIndex];
    //
    //           }
    //           else if(d.label==1){
    //             const scoreIndex = Math.floor(d.sim_scores * (color_hue_green.length - 1));
    //             return color_hue_green[scoreIndex];
    //           }
    //         })
    //       }
}


function replaceModelReferences2(d, cls,thresh) {
  // Constants for old and new model names
  const oldModel = "BiLSTM_GPT2";
  const newModel = cls;

  // Update properties dynamically
  const prob = JSON.parse(d[`${newModel}_prob`]);
  const lineElement = document.getElementById("model-wrapper").querySelector(`#line2${newModel}`);
  const positionRanges = JSON.parse(d[`${newModel}_align_start_stop`]);
  const alignedMotifs = d[`${newModel}_align_motifs`].replace(/^\[|]$/g, "").split(", ").map(item => item.replace(/^'|'$/g, ""));

  const sorted = sortBasedOnEndPosition(positionRanges, alignedMotifs, prob, thresh);
  const data_form = formChartData(alignedMotifs, prob, positionRanges);

  addSegmentsToLine("line2"+cls, data_form,color_hues_green_)


  // Create and place segments based on new model data
  // createAndPlaceSegments(sorted['sortedPoints'], 500, 2620, lineElement, color_hues_green_, sorted['sortedProbabilities'], sorted["sortedSequences"]);
}

function formChartData(seq, prob, pos) {
  // Check if all arrays are of the same length

  if (seq.length !== prob.length || prob.length !== pos.length) {
      throw new Error("All input arrays must have the same length.");
  }

  // Create an array to hold the formatted data
  let data = [];

  // Loop through the arrays and form the data structure
  for (let i = 0; i < seq.length; i++) {
      let item = {
          start: pos[i][0],
          end: pos[i][1],
          keys: seq[i],
          prob: prob[i]
      };
      data.push(item);
  }

  return data;
}


function addSegmentsToLine(svgId, dataObjects,color) {
  // Get the SVG container by ID
  const svgContainer = d3.select(`#${svgId}`);
  // svgContainer.selectAll("rect").remove();
  svgContainer.selectAll(`rect[id="${svgId+"rect"}"]`).remove();

  // Constants for the SVG canvas
  const totalWidthPx = 1000; // Assuming the width is always 1000 for simplicity
  const totalRange = 3065; // Total range of positions
  const scaleFactor = totalWidthPx / totalRange; // Scale factor for converting positions to pixel
  // const width = 1000; // Set a constant width
  const height = 30; // Use container's height or a fixed value if needed
  const marginTop = 40;
  const marginRight = 10;
  const marginBottom = 0;
  const marginLeft = 90;
  const barHeight = 40;  // Set the height of the bars to be constant at 20 units

  // Append each data object as a rectangle to the SVG
  dataObjects.forEach(dataObject => {
      const segmentStartPx = scaleFactor * dataObject.start;
      const segmentWidthPx = scaleFactor * (dataObject.end - dataObject.start);

      svgContainer.select("g")
          .append("rect")
          .attr("x", segmentStartPx+85)
          .attr("id",svgId+"rect")
          .attr("width", segmentWidthPx)
          .attr("y", 1)  // Y position aligned with existing rects
          .attr("height", 15)  // Same height as existing rects
          .attr("fill", d => {
            const index = Math.round(dataObject.prob * (color.length - 1));
            return color[index];
          })
          .on("click", function() {  // Add click event handler
              alert(`Motif clicked: ${dataObject.keys}, Prob: ${dataObject.prob}`);
          });
      });
     
}

function replaceModelReferences(d, cls,thresh) {
  // Constants for old and new model names
  const oldModel = "BiLSTM_GPT2";
  const newModel = cls;

  // Update properties dynamically
  const prob = JSON.parse(d[`${newModel}_prob`]);
  const lineElement = document.getElementById("model-wrapper").querySelector(`#line1${newModel}`);
  const positionRanges = JSON.parse(d[`${newModel}_align_start_stop`]);
  const alignedMotifs = d[`${newModel}_align_motifs`].replace(/^\[|]$/g, "").split(", ").map(item => item.replace(/^'|'$/g, ""));
  let newAlignedMotifs = [];
  let newProb = [];
  let newPositionRanges = [];
  for (let i = 0; i < alignedMotifs.length; i++) {
    if (alignedMotifs[i] !== '') {
        newAlignedMotifs.push(alignedMotifs[i]);
        newProb.push(prob[i]);
        newPositionRanges.push(positionRanges[i]);
    }
  }
  const sorted = sortBasedOnEndPosition(newPositionRanges, newAlignedMotifs, newProb, thresh);

  // Create and place segments based on new model data
  console.log("line1"+cls);
  const data_form = formChartData(newAlignedMotifs, newProb, newPositionRanges);
  // const cont = document.getElementById("viewer1"+cls);

  addSegmentsToLine("line1"+cls, data_form,color_hues_for_blues)

  // createAndPlaceSegments(sorted['sortedPoints'], 500, 2620, lineElement, color_hues_for_blues, sorted['sortedProbabilities'], sorted["sortedSequences"]);
}


function filterRectanglesByRange(svgId, N) {
  // Select the SVG container by its ID
  const svg = d3.select(`#${svgId}`);

  // Select all rectangles within the SVG
  const rects = svg.selectAll("rect");

  // Filter rectangles by data-keys-length attribute
  rects.each(function() {
      const rect = d3.select(this);
      const keysLength = rect.datum()["count"]; // Convert attribute to number
   
      if(N==0){
        rect.style("display", "");
      }
      else if(keysLength>N){
        rect.style("display", "");
      }
      else if(keysLength<=N){
        rect.style("display", "none");
      }
  });
}

export function scatter(files_name,model){


  // set the dimensions and margins of the graph
  let margin,width,height;
  if (model=="Gpt2"){
    margin = {top: 20, right: 0, bottom: 20, left: 10},
      width = document.getElementById("scatter-vis").getBoundingClientRect().width - margin.left - margin.right,
      height = document.getElementById("scatter-vis").getBoundingClientRect().height - margin.top - margin.bottom;
  }
  else if(model=="T5"){
    margin = {top: 20, right: 10, bottom: 20, left: 10},
      width = document.getElementById("scatter-vis").getBoundingClientRect().width - margin.left - margin.right,
      height = document.getElementById("scatter-vis").getBoundingClientRect().height - margin.top - margin.bottom;

  }
  else if(model=="Bert"){
    margin = {top: 20, right: 10, bottom: 20, left: 10},
      width = document.getElementById("scatter-vis").getBoundingClientRect().width - margin.left - margin.right,
      height = document.getElementById("scatter-vis").getBoundingClientRect().height - margin.top - margin.bottom;

  }


  // append the svg object to the body of the page
  const svg = d3.select("#scatter-vis")
  .append("svg")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`) // Set viewBox for scaling
    .attr("preserveAspectRatio", "xMidYMid meet") // Preserve aspect ratio
    .attr("width", "100%") // Set width to 100% of parent container
    .attr("height", "100%") // Set height to 100% of parent container
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const radius = 10;


  d3.csv(files_name).then(function(data) {

    
    const max_len = math.max(data.map((d)=>d.len))
    const min_len = math.min(data.map((d)=>d.len))
    const sortedValues = math.sort(data.map(d => d.len))
    // Quartile calculations using math.js
    const q1 = math.quantileSeq(sortedValues, 0.25);
    const q2 = math.quantileSeq(sortedValues, 0.5); // Median
    const q3 = math.quantileSeq(sortedValues, 0.75);
    const q4 = sortedValues[sortedValues.length - 1]; // Max value, assuming sortedValues is not empty
    const [count0toQ1,countQ1toQ2,countQ2toQ3,countQ3toQ4]=calculateQ1Q2Q3Q4(sortedValues, q1,q2,q3,q4)
    const counts = [
    { range: "0-Q1", count: count0toQ1, color: "blue" },
    { range: "Q1-Q2", count: countQ1toQ2, color: "blue" },
    { range: "Q2-Q3", count: countQ2toQ3, color: "blue" },
    { range: "Q3-Q4", count: countQ3toQ4, color: "blue" }];
    // drawHistogram(counts, "#hist-container")
    // Add X axis
    let x;
    if (model=="T5"){
      const max_val_x = math.ceil(math.max(data.map((d)=>d.x_t5)))
      const min_val_x = math.floor(math.min(data.map((d)=>d.x_t5)))
      x = d3.scaleLinear()
        .domain([min_val_x, max_val_x])
        .range([ 0, width ]);
    }
    else if(model=="Gpt2"){
      const max_val_x = math.ceil(math.max(data.map((d)=>d.x_gpt)))
      const min_val_x = math.floor(math.min(data.map((d)=>d.x_gpt)))
      x = d3.scaleLinear()
        .domain([min_val_x, max_val_x])
        .range([ 0, width ]);

    }
    else if(model=="Bert"){
      const max_val_x = math.ceil(math.max(data.map((d)=>d.x_bert)))
      const min_val_x = math.floor(math.min(data.map((d)=>d.x_bert)))
      x = d3.scaleLinear()
        .domain([min_val_x, max_val_x])
        .range([ 0, width ]);

    }

    // Add Y axis
    let y;

    if (model=="T5"){
      const max_val_y = math.ceil(math.max(data.map((d)=>d.y_t5)))
      const min_val_y = math.floor(math.min(data.map((d)=>d.y_t5)))
      y = d3.scaleLinear()
        .domain([min_val_y, max_val_y])
        .range([ height, 0]);
    }
    else if (model=="Gpt2"){
      const max_val_y = math.ceil(math.max(data.map((d)=>d.y_gpt)))
      const min_val_y = math.floor(math.min(data.map((d)=>d.y_gpt)))
      y = d3.scaleLinear()
        .domain([min_val_y, max_val_y])
        .range([ height, 0]);

    }
    else if (model=="Bert"){
      const max_val_y = math.ceil(math.max(data.map((d)=>d.y_bert)))
      const min_val_y = math.floor(math.min(data.map((d)=>d.y_bert)))
      y = d3.scaleLinear()
        .domain([min_val_y, max_val_y])
        .range([ height, 0]);

    }
    


    // Color scale: give me a specie name, I return a color
    const color = d3.scaleOrdinal()
      .domain(['0', '1'])
      .range([ "#9ecae1", "#f44336"])
    $(document).ready(function() {
        initializeSlider2(function(value) {
            // Here you can add code to handle the slider value.
            // For example, you might want to log it or update some part of your UI.
            const classes = ["BiLSTM_T5",
              "BiLSTM_GPT2", "BiLSTM_Bert", "CNN_T5", "CNN_gpt2", 
              "CNN_Bert", "Trans_Gpt2", "Trans_T5", "Trans_Bert"
          ];

          for(let cls of classes){
            filterRectanglesByRange("line"+cls,value);
            filterRectanglesByRange("line"+cls,value);
            console.log("Slider Value Feature:", value);
          }
    
        });
    });
  


    // Append dots

  let thresh_hold = 10; // Global variable to hold the threshold

  // $(document).ready(function() {
  //   initializeSlider(function(value) {
  //     thresh_hold = parseInt(value, 10); // Update the global variable when the slider value changes
  //
  //   for(let cls of classes){
  //       const start_all =extract_all_child_nodes_start("line1"+cls,thresh_hold,color_hues_for_blues);
  //       const start_all1 =extract_all_child_nodes_start("line2"+cls,thresh_hold,color_hues_green_);
  //       console.log('Thresh in document ready:', thresh_hold);
  //   }
  //
  //   });
  // });
  let xVar, yVar;

  if (model=="T5"){
      xVar = "x_t5";
      yVar = "y_t5";
  }
  else if (model=="Bert"){
      xVar = "x_gpt";
      yVar = "y_gpt";
  }
  else if (model == "Gpt2"){
      xVar = "x_bert";
      yVar = "y_bert";
  }

  data.forEach(d => {
    d.x = +d[xVar];  // Set the initial x position for the force layout
    d.y = +d[yVar];  // Set the initial y position for the force layout
  });

  //for force direct simulation
  let _strength = -3, distanceMax = 15;

  if (model == "Gpt2"){
          _strength  = -5;
  }
  else if (model == "Bert"){
      distanceMax = 20;
  }
  var force = d3.forceSimulation(data)
      .force("charge", d3.forceManyBody().strength(_strength).distanceMax(distanceMax))
    //.force("charge", d3.forceManyBody().strength(-3).distanceMax(4))
      .force("center", d3.forceCenter(width/2 , height/2 ))
      .on("tick", tick);

  let bClicked = false;

  const dots = svg.append('g')
    .selectAll("dot")
    .data(data)
    .join("circle")
      .attr("cx", d => x(d.x))
      .attr("cy", d => y(d.y))
      .attr("r", 7)
      .style("fill",d=>{
          if (d.label==0){
              if(d.similarity_T5==0.0){
                  return color_hues_for_blues[0]
              }
              let scoreIndex = Math.floor(d.similarity_T5 * (color_hues_for_blues.length - 1));
              if (!scoreIndex){
                  return "#000000";
              }
              return color_hues_for_blues[scoreIndex];
          }
          else if(d.label==1){
              if(d.similarity_T5==0.0){
                  return color_hues_green_[0]
              }
              let scoreIndex = Math.floor(d.similarity_T5 * (color_hues_green_.length - 1));
              if (!scoreIndex){
                  return "#000000";
              }
              return color_hues_green_[scoreIndex];
          }
      })
      .style("stroke", d => d3.rgb(color(d.label)).darker(0.5)) // Adds a darker rim
      .style("stroke-width", "2px") // Adjust the width of the rim
      .on("click", function(event, d) {
          console.log(d,event)
          if(d) {
              bClicked = true;
              //highlight the selected circle
              dots.style('fill-opacity', 0.3)
              dots.style('stroke-opacity', 0.3)
              d3.select(this).style('fill-opacity', 1.0)
              d3.select(this).style('stroke-opacity', 1.0)

              //display motif candidates of the selected seq.
              if (d.label == 0) {

                  for (let cls of classes) {
                      try {
                          replaceModelReferences(d, cls);
                      } catch (error) {
                          console.error(`Error processing model ${cls}:`, error);
                      }
                  }
              } else if (d.label == 1) {
                  for (let cls of classes) {
                      try {
                          replaceModelReferences2(d, cls);
                      } catch (error) {
                          console.error(`Error processing model ${cls}:`, error);
                      }
                  }
              }
          }
      });

      // svg.on("click",function(d){
      //     console.log(d)
      //     //     dots.style('fill-opacity', 1.0)
      //     //     dots.style('stroke-opacity', 1.0)
      //     //
      //     //     for (let cls of classes) {
      //     //         try {
      //     //             replaceModelReferences(d, cls);
      //     //         } catch (error) {
      //     //             console.error(`Error processing model ${cls}:`, error);
      //     //         }
      //     //     }
      //     //     for (let cls of classes) {
      //     //         try {
      //     //             replaceModelReferences2(d, cls);
      //     //         } catch (error) {
      //     //             console.error(`Error processing model ${cls}:`, error);
      //     //         }
      //     //     }
      //     // }
      // })

  //depict the length of protein sequences.
  let lines = svg.append('g')
      .selectAll()
      .data(data)
      .join('path')
        .attr('d', 'M7,0 L15,0') // Simple arrow shape
        //.attr('fill', 'none')
        .attr('stroke', "black")
        .attr('stroke-width', 2)
        .attr('transform',d=>{
            const arcCenterX = d.x;
            const arcCenterY = d.y;
            const [color, angle] = findQuartileRange(d.len, q1, q2, q3, q4);
            const [arrowX, arrowY] = calculatePositionOnArc(arcCenterX, arcCenterY, radius, angle);
            return `translate(${arrowX}, ${arrowY}) rotate(${angle + 90})`} // Position and rotate the arrow
        );


  function tick() {
        dots.attr("cx", d => d.x)
            .attr("cy", d => d.y);

        lines.attr('transform',d=>{
            const arcCenterX = d.x;
            const arcCenterY = d.y;

            const [color, angle] = findQuartileRange(d.len, q1, q2, q3, q4);
            const [arrowX, arrowY] = calculatePositionOnArc(arcCenterX, arcCenterY, radius, angle);

            return `translate(${arrowX}, ${arrowY}) rotate(${angle + 90})`}
        );
  }

    // Append circles around dots instead of using an arc generator
    createColorLegendBar('legend-color',color_hues_for_blues);
    addLegendLabels('legend-labels');

    createColorLegendBar('legend-color1',color_hues_green_);
    addLegendLabels('legend-labels1');

    $('#sim_button').click(function(){
        console.log('similarity_button');
        updateDotsColor(svg, data, color_hues_for_blues,color_hues_green_);

        }
    );

    $('#consensus_button').click(function(){
            console.log('consensus_button');
            updateDotsColorConsensus(svg, data);
        }
    )


  function updateDotsColorConsensus(svg, data) {
      svg.selectAll("circle")
          .data(data)

          .style("fill", d => {
              //if (useConsensusForColor) {
                  // Use color based on consensus_scores
                  const colorValue = colorScales[d.label] && colorScales[d.label][d.consensus_scores.toString()];
                  if (!colorValue) {
                      // Log consensus_scores if the corresponding color is undefined
                      console.log("Undefined color for consensus_scores:", d.consensus_scores);
                      return "#000000";  // Fallback to a default color like black
                  }
                  return colorValue;
              // } else {
              //     // Fallback to the original color (medium brightness)
              //     return colorScales[d.label]['1'];
              // }
          });
  }



  })
}

function initializeSlider2(callback) {
  const min = 0;
  const max = 150;

  $('#threshold-slider2').slider({
    min: min,
    max: max,
    step: 1,
    value: 0,  // Start at the minimum value
    create: function() {
      $('.min-value1').text(min);
      $('.max-value1').text(max);
      updateCurrentValuePosition($(this).slider('value'));  // Position the tooltip at start
    },
    slide: function(event, ui) {
      updateCurrentValuePosition(ui.value);  // Update the tooltip on slide

      console.log('Slider value:', ui.value);  // Log the slider value
      
      // Execute the callback function if provided, with the current slider value
      if (callback && typeof callback === 'function') {
        callback(ui.value);
      }
    }
  });
}

function updateCurrentValuePosition(value) {
  const $slider = $('#threshold-slider2');
  const $handle = $slider.find('.ui-slider-handle');
  // The left offset of the slider handle within the slider
  const handlePosition = $handle.position().left;
  
  // Update the tooltip text and position
  $('.slider-tooltip').text(`${value}`).css('left', handlePosition);
}