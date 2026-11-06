import {zoomScale} from './motif.js'
import {getCsvFileForModel, getLabels, getModelList} from './config.js'

//const color_hues_for_consensus= ["#f7fbff","#f6faff","#f5fafe","#f5f9fe","#f4f9fe","#f3f8fe","#f2f8fd","#f2f7fd","#f1f7fd","#f0f6fd","#eff6fc","#eef5fc","#eef5fc","#edf4fc","#ecf4fb","#ebf3fb","#eaf3fb","#eaf2fb","#e9f2fa","#e8f1fa","#e7f1fa","#e7f0fa","#e6f0f9","#e5eff9","#e4eff9","#e3eef9","#e3eef8","#e2edf8","#e1edf8","#e0ecf8","#e0ecf7","#dfebf7","#deebf7","#ddeaf7","#ddeaf6","#dce9f6","#dbe9f6","#dae8f6","#d9e8f5","#d9e7f5","#d8e7f5","#d7e6f5","#d6e6f4","#d6e5f4","#d5e5f4","#d4e4f4","#d3e4f3","#d2e3f3","#d2e3f3","#d1e2f3","#d0e2f2","#cfe1f2","#cee1f2","#cde0f1","#cce0f1","#ccdff1","#cbdff1","#cadef0","#c9def0","#c8ddf0","#c7ddef","#c6dcef","#c5dcef","#c4dbee","#c3dbee","#c2daee","#c1daed","#c0d9ed","#bfd9ec","#bed8ec","#bdd8ec","#bcd7eb","#bbd7eb","#b9d6eb","#b8d5ea","#b7d5ea","#b6d4e9","#b5d4e9","#b4d3e9","#b2d3e8","#b1d2e8","#b0d1e7","#afd1e7","#add0e7","#acd0e6","#abcfe6","#a9cfe5","#a8cee5","#a7cde5","#a5cde4","#a4cce4","#a3cbe3","#a1cbe3","#a0cae3","#9ec9e2","#9dc9e2","#9cc8e1","#9ac7e1","#99c6e1","#97c6e0","#96c5e0","#94c4df","#93c3df","#91c3df","#90c2de","#8ec1de","#8dc0de","#8bc0dd","#8abfdd","#88bedc","#87bddc","#85bcdc","#84bbdb","#82bbdb","#81badb","#7fb9da","#7eb8da","#7cb7d9","#7bb6d9","#79b5d9","#78b5d8","#76b4d8","#75b3d7","#73b2d7","#72b1d7","#70b0d6","#6fafd6","#6daed5","#6caed5","#6badd5","#69acd4","#68abd4","#66aad3","#65a9d3","#63a8d2","#62a7d2","#61a7d1","#5fa6d1","#5ea5d0","#5da4d0","#5ba3d0","#5aa2cf","#59a1cf","#57a0ce","#569fce","#559ecd","#549ecd","#529dcc","#519ccc","#509bcb","#4f9acb","#4d99ca","#4c98ca","#4b97c9","#4a96c9","#4895c8","#4794c8","#4693c7","#4592c7","#4492c6","#4391c6","#4190c5","#408fc4","#3f8ec4","#3e8dc3","#3d8cc3","#3c8bc2","#3b8ac2","#3a89c1","#3988c1","#3787c0","#3686c0","#3585bf","#3484bf","#3383be","#3282bd","#3181bd","#3080bc","#2f7fbc","#2e7ebb","#2d7dbb","#2c7cba","#2b7bb9","#2a7ab9","#2979b8","#2878b8","#2777b7","#2676b6","#2574b6","#2473b5","#2372b4","#2371b4","#2270b3","#216fb3","#206eb2","#1f6db1","#1e6cb0","#1d6bb0","#1c6aaf","#1c69ae","#1b68ae","#1a67ad","#1966ac","#1865ab","#1864aa","#1763aa","#1662a9","#1561a8","#1560a7","#145fa6","#135ea5","#135da4","#125ca4","#115ba3","#115aa2","#1059a1","#1058a0","#0f579f","#0e569e","#0e559d","#0e549c","#0d539a","#0d5299","#0c5198","#0c5097","#0b4f96","#0b4e95","#0b4d93","#0b4c92","#0a4b91","#0a4a90","#0a498e","#0a488d","#09478c","#09468a","#094589","#094487","#094386","#094285","#094183","#084082","#083e80","#083d7f","#083c7d","#083b7c","#083a7a","#083979","#083877","#083776","#083674","#083573","#083471","#083370","#08326e","#08316d","#08306b"]
//export const color_hues_for_blues= color_hues_for_consensus.slice(-180)

//const color_hues_green = ["#fff5f0","#fff4ef","#fff4ee","#fff3ed","#fff2ec","#fff2eb","#fff1ea","#fff0e9","#fff0e8","#ffefe7","#ffeee6","#ffeee6","#ffede5","#ffece4","#ffece3","#ffebe2","#feeae1","#fee9e0","#fee9de","#fee8dd","#fee7dc","#fee6db","#fee6da","#fee5d9","#fee4d8","#fee3d7","#fee2d6","#fee2d5","#fee1d4","#fee0d2","#fedfd1","#feded0","#feddcf","#fedccd","#fedbcc","#fedacb","#fed9ca","#fed8c8","#fed7c7","#fdd6c6","#fdd5c4","#fdd4c3","#fdd3c1","#fdd2c0","#fdd1bf","#fdd0bd","#fdcfbc","#fdceba","#fdcdb9","#fdccb7","#fdcbb6","#fdc9b4","#fdc8b3","#fdc7b2","#fdc6b0","#fdc5af","#fdc4ad","#fdc2ac","#fdc1aa","#fdc0a8","#fcbfa7","#fcbea5","#fcbca4","#fcbba2","#fcbaa1","#fcb99f","#fcb89e","#fcb69c","#fcb59b","#fcb499","#fcb398","#fcb196","#fcb095","#fcaf94","#fcae92","#fcac91","#fcab8f","#fcaa8e","#fca98c","#fca78b","#fca689","#fca588","#fca486","#fca285","#fca183","#fca082","#fc9e81","#fc9d7f","#fc9c7e","#fc9b7c","#fc997b","#fc987a","#fc9778","#fc9677","#fc9475","#fc9374","#fc9273","#fc9071","#fc8f70","#fc8e6f","#fc8d6d","#fc8b6c","#fc8a6b","#fc8969","#fc8868","#fc8667","#fc8565","#fc8464","#fb8263","#fb8162","#fb8060","#fb7f5f","#fb7d5e","#fb7c5d","#fb7b5b","#fb795a","#fb7859","#fb7758","#fb7657","#fb7455","#fa7354","#fa7253","#fa7052","#fa6f51","#fa6e50","#fa6c4e","#f96b4d","#f96a4c","#f9684b","#f9674a","#f96549","#f86448","#f86347","#f86146","#f86045","#f75e44","#f75d43","#f75c42","#f65a41","#f65940","#f6573f","#f5563e","#f5553d","#f4533c","#f4523b","#f4503a","#f34f39","#f34e38","#f24c37","#f24b37","#f14936","#f14835","#f04734","#ef4533","#ef4433","#ee4332","#ed4131","#ed4030","#ec3f2f","#eb3d2f","#eb3c2e","#ea3b2d","#e93a2d","#e8382c","#e7372b","#e6362b","#e6352a","#e5342a","#e43229","#e33128","#e23028","#e12f27","#e02e27","#df2d26","#de2c26","#dd2b25","#dc2a25","#db2924","#da2824","#d92723","#d72623","#d62522","#d52422","#d42321","#d32221","#d22121","#d12020","#d01f20","#ce1f1f","#cd1e1f","#cc1d1f","#cb1d1e","#ca1c1e","#c91b1e","#c71b1d","#c61a1d","#c5191d","#c4191c","#c3181c","#c2181c","#c0171b","#bf171b","#be161b","#bd161a","#bb151a","#ba151a","#b91419","#b81419","#b61419","#b51319","#b41318","#b21218","#b11218","#b01218","#ae1117","#ad1117","#ac1117","#aa1017","#a91016","#a71016","#a60f16","#a40f16","#a30e15","#a10e15","#a00e15","#9e0d15","#9c0d14","#9b0c14","#990c14","#970c14","#960b13","#940b13","#920a13","#900a13","#8f0a12","#8d0912","#8b0912","#890812","#870811","#860711","#840711","#820711","#800610","#7e0610","#7c0510","#7a0510","#78040f","#76040f","#75030f","#73030f","#71020e","#6f020e","#6d010e","#6b010e","#69000d","#67000d"]
//export const color_hues_green_= color_hues_green.slice(-180)



//console.log(color_hues_green)
//console.log(color_hues_green_)
export const color_hues_for_blues = d3.scaleSequential([0, 1.0],d3.interpolateBlues);
export const color_hues_green_ = d3.scaleSequential([0, 1.0],d3.interpolateReds);
//const _color = d3.scaleSequential(d3.interpolateBlues);

const featureMax = 0.283842954431189;

function getLabelIndex(value, labels) {
    const numericValue = Number(value);
    if (Number.isInteger(numericValue) && numericValue >= 0 && numericValue < labels.length) {
        return numericValue;
    }
    const textValue = String(value).trim().toLowerCase();
    return labels.findIndex((label) => {
        const configuredLabel = label.toLowerCase();
        return textValue === configuredLabel || textValue.startsWith(`${configuredLabel}::`);
    });
}

export function getClassColor(label, labels) {
    const index = getLabelIndex(label, labels);
    const palette = d3.schemeDark2;
    return palette[(index < 0 ? 0 : index) % palette.length];
}

function getConsensusScore(d, labels) {
    const predictions = d.classifierPredictions || [];
    const trueLabel = getLabelIndex(d.label, labels);
    if (trueLabel < 0 || predictions.length === 0) return 0;

    const validPredictions = predictions
        .map((prediction) => getLabelIndex(prediction, labels))
        .filter((prediction) => prediction >= 0);
    if (validPredictions.length === 0) return 0;

    const correct = validPredictions.filter((prediction) => prediction === trueLabel).length;
    return correct / validPredictions.length;
}

function getCircleValue(d, mode, labels) {
    if (mode === "consensus") {
        return getConsensusScore(d, labels);
    }

    return getJaccardSimilarity(d, labels);
}

function parseFeatureArray(value, fallback = []) {
    console.log("Parsing feature array:", value);
    if (value === undefined || value === null || value === "") return fallback;
    try {
        const parsed = JSON.parse(String(value).replace(/'/g, '"'));
        const removeInvalidFeature = (item) => {
            if (Array.isArray(item)) {
                return item
                    .filter((child) => String(child).trim().toLowerCase() !== "ad><p")
                    .map(removeInvalidFeature);
            }
            return item;
        };
        return removeInvalidFeature(parsed);
    } catch (error) {
        console.error("Unable to parse classifier feature data:", error);
        return fallback;
    }
}

function getAlignedFeaturePositions(row) {
    const motifs = parseFeatureArray(row.motifs, []);
    const ranges = parseFeatureArray(row.align_start_stop, []);
    const positions = new Set();
    ranges.forEach((range) => {
        if (!Array.isArray(range) || range.length < 2) return;
        const start = Math.max(0, Math.ceil(Number(range[0])));
        const end = Math.max(start, Math.floor(Number(range[1])));
        if (!Number.isFinite(start) || !Number.isFinite(end)) return;
        for (let position = start; position < end; position++) {
            positions.add(position);
        }
    });
    return { motifs, positions };
}

function getJaccardSimilarity(d, labels) {
    const trueLabel = getLabelIndex(d.label, labels);
    const threshold = Number.isFinite(d.featureThreshold) ? d.featureThreshold : 0;
    const aligned = d.aligned || d.classifierFeatureRows?.[0]?.aligned || "";
    if (trueLabel < 0 || !aligned || !d.classifierFeatureRows) return 0;

    const visualized = new Set();
    d.classifierFeatureRows.forEach((row) => {
        if (getLabelIndex(row.label, labels) !== trueLabel) return;
        const featureData = getAlignedFeaturePositions(row);
        const counts = d.featurePositionCounts?.get(row.modelId)?.get(trueLabel);
        if (!counts) return;
        featureData.positions.forEach((position) => {
            if (counts.get(position) > threshold) {
                const aminoAcid = aligned[position];
                if (/[A-Za-z]/.test(aminoAcid || "")) {
                    visualized.add(`${position}:${aminoAcid}`);
                }
            }
        });
    });

    const extracted = new Set();
    [...aligned].forEach((aminoAcid, position) => {
        if (/[A-Za-z]/.test(aminoAcid)) {
            extracted.add(`${position}:${aminoAcid}`);
        }
    });

    const union = new Set([...visualized, ...extracted]);
    if (union.size === 0) return 0;
    let intersection = 0;
    visualized.forEach((token) => {
        if (extracted.has(token)) intersection++;
    });
    return intersection / union.size;
}

function createValueScale(data, mode, labels) {
    const values = data.map((d) => getCircleValue(d, mode, labels));
    const extent = d3.extent(values);
    if (!Number.isFinite(extent[0]) || !Number.isFinite(extent[1])) {
        return () => 1;
    }
    if (extent[0] === extent[1]) {
        return () => 0.65;
    }
    return d3.scaleLinear().domain(extent).range([0.15, 1]).clamp(true);
}

function getSimilarityColor(label, value, labels, valueScale) {
    const score = valueScale ? valueScale(value) : 1;
    return d3.interpolate("white", getClassColor(label, labels))(score);
}

function attachClassifierPredictions(data, classifierDataSets, labels, predictionModelIds) {
    const rowsBySequence = classifierDataSets.map((rows) => {
        const bySequence = new Map();
        const featurePositionCounts = new Map();
        rows.forEach((row) => {
            row.modelId = rows.modelId;
            if (row.sequence) bySequence.set(row.sequence, row);
            const labelIndex = getLabelIndex(row.label, labels);
            if (labelIndex < 0) return;
            const featureData = getAlignedFeaturePositions(row);
            if (!featurePositionCounts.has(labelIndex)) {
                featurePositionCounts.set(labelIndex, new Map());
            }
            const counts = featurePositionCounts.get(labelIndex);
            featureData.positions.forEach((position) => {
                counts.set(position, (counts.get(position) || 0) + 1);
            });
        });
        return { rows, bySequence, featurePositionCounts };
    });

    data.forEach((datum, index) => {
        datum.featurePositionCounts = new Map();
        datum.classifierFeatureRowsByModel = new Map();
        datum.classifierFeatureRows = rowsBySequence.map(({ rows, bySequence, featurePositionCounts }) => {
            const prediction = datum.sequence
                ? bySequence.get(datum.sequence)
                : undefined;
            const featureRow = prediction || rows[index];
            if (!featureRow) return undefined;

            datum.featurePositionCounts.set(rows.modelId, featurePositionCounts);
            datum.classifierFeatureRowsByModel.set(rows.modelId, featureRow);
            return featureRow;
        }).filter((row) => row !== undefined && row !== "");
        datum.classifierPredictions = datum.classifierFeatureRows
            .filter((row) => !predictionModelIds ||
                predictionModelIds.includes(row.modelId))
            .map((row) => row.label);
    });
}

function parseCoordinate(value) {
    if (value === null || value === undefined || String(value).trim() === "") {
        return NaN;
    }

    const numericValue = Number(value);
    if (Number.isFinite(numericValue)) return numericValue;

    try {
        const parsed = JSON.parse(String(value).replace(/'/g, '"'));
        if (Array.isArray(parsed)) {
            const numericValues = parsed.map(Number).filter(Number.isFinite);
            return numericValues.length ? d3.mean(numericValues) : NaN;
        }
        return Number(parsed);
    } catch {
        return NaN;
    }
}

function paddedDomain(values) {
    const min = d3.min(values);
    const max = d3.max(values);
    if (!Number.isFinite(min) || !Number.isFinite(max)) return [-1, 1];
    if (min === max) {
        const padding = Math.max(Math.abs(min) * 0.05, 1);
        return [min - padding, max + padding];
    }
    const padding = (max - min) * 0.05;
    return [min - padding, max + padding];
}


//console.log(_color(100));
//console.log(_color(1));

// function getSelectedColors(colors) {
//   const lowColors = colors.slice(0, 3);
//   const midIndex = Math.floor(colors.length / 2) - 1;
//   const midColors = colors.slice(midIndex, midIndex + 3);
//   const highColors = colors.slice(-3);
//   return lowColors.concat(midColors, highColors);
// }
// export const selectedColors_sim_blues = getSelectedColors(color_hues_for_blues);

const colorScales = {
    '0': {
        '0':'#d8eaf3',
        '0.33': '#9ea9e1', // Lighter version of #9ecae1
        '0.67': '#9ecae1', // Original color
        '1': '#64aacf', // Darker version of #9ecae1
    },
    '1': {
      '0':'#f1b4b4',
      '0.33': '#e57373', // Light red (similar lightness to #6eb76a)
      '0.67': '#f44336', // Red (a standard shade that matches the intensity of #7fbf7b)
      '1':  '#d32f2f'  // Deep red (darker version similar to #90c78c)
  }
};
// const color_hues_green =["#f7fcf5","#f6fcf4","#f6fcf4","#f5fbf3","#f5fbf2","#f4fbf2","#f4fbf1","#f3faf0","#f2faf0","#f2faef","#f1faee","#f1faee","#f0f9ed","#f0f9ec","#eff9ec","#eef9eb","#eef8ea","#edf8ea","#ecf8e9","#ecf8e8","#ebf7e7","#ebf7e7","#eaf7e6","#e9f7e5","#e9f6e4","#e8f6e4","#e7f6e3","#e7f6e2","#e6f5e1","#e5f5e1","#e4f5e0","#e4f4df","#e3f4de","#e2f4dd","#e1f4dc","#e1f3dc","#e0f3db","#dff3da","#def2d9","#ddf2d8","#ddf2d7","#dcf1d6","#dbf1d5","#daf1d4","#d9f0d3","#d8f0d2","#d7efd1","#d6efd0","#d5efcf","#d4eece","#d4eece","#d3eecd","#d2edcb","#d1edca","#d0ecc9","#cfecc8","#ceecc7","#cdebc6","#ccebc5","#cbeac4","#caeac3","#c9eac2","#c8e9c1","#c6e9c0","#c5e8bf","#c4e8be","#c3e7bd","#c2e7bc","#c1e6bb","#c0e6b9","#bfe6b8","#bee5b7","#bde5b6","#bbe4b5","#bae4b4","#b9e3b3","#b8e3b2","#b7e2b0","#b6e2af","#b5e1ae","#b3e1ad","#b2e0ac","#b1e0ab","#b0dfaa","#aedfa8","#addea7","#acdea6","#abdda5","#aadca4","#a8dca3","#a7dba2","#a6dba0","#a5da9f","#a3da9e","#a2d99d","#a1d99c","#9fd89b","#9ed799","#9dd798","#9bd697","#9ad696","#99d595","#97d494","#96d492","#95d391","#93d390","#92d28f","#91d18e","#8fd18d","#8ed08c","#8ccf8a","#8bcf89","#8ace88","#88cd87","#87cd86","#85cc85","#84cb84","#82cb83","#81ca82","#80c981","#7ec980","#7dc87f","#7bc77e","#7ac77c","#78c67b","#77c57a","#75c479","#74c478","#72c378","#71c277","#6fc276","#6ec175","#6cc074","#6bbf73","#69bf72","#68be71","#66bd70","#65bc6f","#63bc6e","#62bb6e","#60ba6d","#5eb96c","#5db86b","#5bb86a","#5ab769","#58b668","#57b568","#56b467","#54b466","#53b365","#51b264","#50b164","#4eb063","#4daf62","#4caf61","#4aae61","#49ad60","#48ac5f","#46ab5e","#45aa5d","#44a95d","#42a85c","#41a75b","#40a75a","#3fa65a","#3ea559","#3ca458","#3ba357","#3aa257","#39a156","#38a055","#379f54","#369e54","#359d53","#349c52","#339b51","#329a50","#319950","#30984f","#2f974e","#2e964d","#2d954d","#2b944c","#2a934b","#29924a","#28914a","#279049","#268f48","#258f47","#248e47","#238d46","#228c45","#218b44","#208a43","#1f8943","#1e8842","#1d8741","#1c8640","#1b8540","#1a843f","#19833e","#18823d","#17813d","#16803c","#157f3b","#147e3a","#137d3a","#127c39","#117b38","#107a37","#107937","#0f7836","#0e7735","#0d7634","#0c7534","#0b7433","#0b7332","#0a7232","#097131","#087030","#086f2f","#076e2f","#066c2e","#066b2d","#056a2d","#05692c","#04682b","#04672b","#04662a","#03642a","#036329","#026228","#026128","#026027","#025e27","#015d26","#015c25","#015b25","#015a24","#015824","#015723","#005623","#005522","#005321","#005221","#005120","#005020","#004e1f","#004d1f","#004c1e","#004a1e","#00491d","#00481d","#00471c","#00451c","#00441b"]


// Model list driven by data_config.json (see config.js#getModelList); populated on load.
let classes = [];
getModelList().then((list) => { classes = list; }).catch((e) => console.error("Failed to load model list:", e));


function withinThreshold(end1, start2,thresh) {
    const gap = start2 - end1;
    return gap <= thresh;
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


export function createColorLegendBar(divId,colors,range) {
    const width = 200, height = 40;
    const rect_width = width/colors.length;

    let gap = (colors.length == 101)?50:1;


    const xScale = d3.scaleLinear()
        .domain([0, colors.length])
        .range([0, width-30]);

    d3.select(`#${divId}`).select('svg').remove();

    const _svg = d3.select(`#${divId}`)
        .append('svg')
        .attr("width", width)
        .attr("height", height);

    const legend = _svg.selectAll("rect")
         .data(colors)
        .join("rect")
        .attr('x', (d, i) => xScale(i))
        .attr('y',height - 35)
        .attr("width", xScale(1)-xScale(0))
        .attr("height", 20)
        .style("fill", d => d)
        .style("stroke", d=>d)

    $(`#${divId}`).on('mouseover', function() {
        d3.selectAll("circle").style('fill-opacity', 0.2).style('stroke-opacity', 0.2);
    });

    $(`#${divId}`).on('mouseout', function() {
        d3.selectAll("circle").style('fill-opacity', 1.0).style('stroke-opacity', 1.0);
    });

    console.log(range,width/(range.length+1))
    _svg.selectAll("text")
        .data(range)
        .join("text")
        .attr("x", (d, i) => {
            //console.log(i*width/(range.length+1),xScale(i*width/(range.length+1)))
            return xScale(i*gap);
        })
        .attr("y", 35)
         .attr("dy", ".35em")
         .style("text-anchor", "start")
         .text((d) =>d);
};

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

export function createClassLegend(containerId, labels, data, mode) {
    const container = d3.select(`#${containerId}`);
    container.selectAll("*").remove();
    const palette = d3.schemeDark2;
    const values = data.map((datum) => getCircleValue(datum, mode, labels));
    const activeValueScale = createValueScale(data, mode, labels);
    const valueExtent = d3.extent(values);
    const formatValue = (value) => Number.isInteger(value)
        ? String(value)
        : d3.format(".2f")(value);
    const legend = container.append("div")
        .style("display", "flex")
        .style("flex-direction", "column")
        .style("gap", "5px");

    //Legend title (not needed for now)
    // legend.append("div")
    //     .style("font-size", "12px")
    //     .style("font-weight", "bold")
    //     .text(`${mode === "consensus" ? "Consensus" : "Similarity"} value`);

    labels.forEach((label, index) => {
        const item = legend.append("span")
            .style("display", "inline-flex")
            .style("align-items", "center")
            .style("gap", "7px")
            .style("font-size", "12px")
            .style("cursor", "pointer")
            .attr("data-label-index", index);
        const color = palette[index % palette.length];
        item.append("span")
            .style("width", "120px")
            .style("height", "12px")
            .style("display", "inline-block")
            .style("background", `linear-gradient(to right, white, ${color})`)
            .style("border", "1px solid #666");
        item.append("span").text(label);

        const previousOpacity = new Map();
        item
            .on("mouseenter", function() {
                d3.selectAll(".dot").each(function() {
                    previousOpacity.set(this, {
                        fill: this.style.fill,
                        fillOpacity: this.style.fillOpacity,
                        stroke: this.style.stroke,
                        strokeWidth: this.style.strokeWidth,
                        strokeOpacity: this.style.strokeOpacity
                    });

                    const datum = d3.select(this).datum();
                    const isMatchingClass = this.classList.contains(`dot-label-${index}`);
                    this.style.fill = getSimilarityColor(
                        datum.label,
                        getCircleValue(datum, mode, labels),
                        labels,
                        activeValueScale
                    );
                    if (isMatchingClass) {
                        this.style.stroke = getClassColor(datum.label, labels);
                        this.style.strokeWidth = "2.5px";
                    }
                    this.style.fillOpacity = isMatchingClass ? "1" : "0.15";
                    this.style.strokeOpacity = isMatchingClass ? "1" : "0.15";
                });
            })
            .on("mouseleave", function() {
                previousOpacity.forEach((opacity, dot) => {
                    dot.style.fill = opacity.fill;
                    dot.style.fillOpacity = opacity.fillOpacity;
                    dot.style.stroke = opacity.stroke;
                    dot.style.strokeWidth = opacity.strokeWidth;
                    dot.style.strokeOpacity = opacity.strokeOpacity;
                });
                previousOpacity.clear();
            });
    });

    const range = legend.append("div")
        .style("display", "flex")
        .style("justify-content", "space-between")
        .style("width", "120px")
        .style("margin-left", "0")
        .style("margin-top", "-15px")
        .style("margin-bottom", "-5px")
        .style("font-size", "10px");
    range.append("span").text(formatValue(valueExtent[0]));
    range.append("span").text(formatValue(valueExtent[1]));
}


function calculateQ1Q2Q3Q4(sorted_vals, q1,q2,q3,q4){
   // Initialize counters
    let count0toQ1 = 0;
    let countQ1toQ2 = 0;
    let countQ2toQ3 = 0;
    let countQ3toQ4 = 0

    // Count the values in each interval
    sorted_vals.forEach(value => {
        if (value <= parseInt(q1)) {
            //console.log(value);
            count0toQ1++;
        } else if (value <= parseInt(q2)) {
            countQ1toQ2++;
        } else if (value <= parseInt(q3)) {
            countQ2toQ3++;
        } else if (value <= parseInt(q4)) {
            countQ3toQ4++;
        }
    });
    return [count0toQ1,countQ1toQ2,countQ2toQ3,countQ3toQ4]
  }


function findQuartileRange(point, q1, q2, q3, q4) {
    const radius = 3.5;
    if (point <= q1) {
      return [0,0]; //40
    } else if (point <= q2) {
      return [1/3.0*radius,45]; //100
    } else if (point <= q3) {
      return [2/3.0*radius,90]; //150
    } else if (point <= q4) {
        return [3 / 3.0 * radius, 135]; //310
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


function updateDotsColor(svg, data, labels, valueScale) {
      svg.selectAll("circle")
          .data(data) // Ensure data is accessible here
          .style("fill", d => {
                  return getSimilarityColor(d.label, getCircleValue(d, "similarity", labels),
                    labels, valueScale);
              })
}

          function getAlignedModelData(d, modelName) {
            const normalizedModelName = String(modelName).toLowerCase();
            const modelRow = d.classifierFeatureRowsByModel?.get(modelName) ||
              (d.classifierFeatureRows || []).find((row) =>
                String(row.modelId || "").toLowerCase() === normalizedModelName
              );
            if (!modelRow) {
              const availableModels = [...(d.classifierFeatureRowsByModel?.keys() || [])];
              throw new Error(
                `No feature data found for classifier "${modelName}". ` +
                `Available models: ${availableModels.join(", ")}`
              );
            }

            const prob = parseFeatureArray(modelRow.prob, []);
            const positionRanges = parseFeatureArray(modelRow.align_start_stop, []);
            const alignedMotifs = parseFeatureArray(modelRow.align_motifs, []);

            const maxLength = Math.min(alignedMotifs.length, prob.length, positionRanges.length);
            const normalizedMotifs = [];
            const normalizedProb = [];
            const normalizedRanges = [];

            for (let i = 0; i < maxLength; i++) {
              const motif = alignedMotifs[i];
              const probability = Number(prob[i]);
              const range = positionRanges[i];

              if (!motif || !motif.trim()) {
                continue;
              }

              if (!Array.isArray(range) || range.length < 2) {
                continue;
              }

              const start = Number(range[0]);
              const end = Number(range[1]);

              if (!Number.isFinite(probability) || !Number.isFinite(start) || !Number.isFinite(end)) {
                continue;
              }

              if (end <= start) {
                continue;
              }

              normalizedMotifs.push(motif);
              normalizedProb.push(probability);
              normalizedRanges.push([start, end]);
            }

            return {
              motifs: normalizedMotifs,
              probabilities: normalizedProb,
              ranges: normalizedRanges
            };
          }

function replaceModelReferences(d, cls, labelIndex, labels) {
            const newModel = cls;
            const { motifs, probabilities, ranges } = getAlignedModelData(d, newModel);

    // Create and place segments based on new model data
            const data_form = formChartData(motifs, probabilities, ranges);
    const classColor = getClassColor(d.label, labels);
    addSegmentsToLine(`line${cls}_${labelIndex}`, data_form, (probability) =>
      d3.interpolate("white", classColor)(probability))
}

function formChartData(seq, prob, pos) {
  // Check if all arrays are of the same length

  if (seq.length !== prob.length || prob.length !== pos.length) {
      throw new Error("All input arrays must have the same length.");
  }

  // Create an array to hold the formatted data
  let data = [];


  const max_prob = Math.max(...prob);
  // Loop through the arrays and form the data structure
  for (let i = 0; i < seq.length; i++) {
      // let item = {
      //     start: pos[i][0],
      //     end: pos[i][1],
      //     keys: seq[i],
      //     prob: prob[i]
      // };
      for(let j=pos[i][0];j<pos[i][1];j++) {
          let item={
              ind:j,
              count:1,
              keys:seq[i],
              prob:prob[i],
              max_prob:max_prob
          }
          data.push(item);
      }

  }
  return data;
}


function addSegmentsToLine(svgId, dataObjects, color) {




    // Get the SVG container by ID
  const svgContainer = d3.select(`#${svgId}`);
  console.log(`#${svgId}`)
  // svgContainer.selectAll("rect").remove();
  svgContainer.selectAll(`rect[id="${svgId+"rect"}"]`).remove();

    const margins = { top: 5, right: 5, bottom: 10, left: 5 };
    const width = $('#accordion-wrapper').width() - margins.right - margins.left;

    const xScale = zoomScale;

  const marginTop = 40;
  const marginRight = 10;
  const marginBottom = 0;
  const marginLeft = 90;
  const barHeight = 40;  // Set the height of the bars to be constant at 20 units

  // Append each data object as a rectangle to the SVG
    svgContainer.select("g")
        .selectAll("rect")
        .data(dataObjects)
        .join("rect")
        .attr("x", function(d){
            return xScale(d.ind);
        })
        .attr("id",svgId+"rect")
        .attr("width",xScale(1)-xScale(0)) //d=>{xScale(1)-xScale(0)})
        .attr("y", 1)  // Y position aligned with existing rects
        .attr("height", 15)  // Same height as existing rects
        .attr("fill", d => {
            return color(d.prob/d.max_prob);//color(d.prob);
        });


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

function drawHistogram(counts, domains, svg_container)
{
    const width = $(svg_container).width();
    const height = $('#heat-vis').height();
    const marginTop = 10;
    const marginRight = 0;
    const marginBottom = 40;
    const marginLeft = 40;

    // Declare the x (horizontal position) scale.


    const x = d3.scaleBand()
        .domain(domains)
        .range([marginLeft, width - marginRight])
        //.padding(0.1);

    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear()
        .domain([0, d3.max(counts, (d) => d.count)])
        .range([height - marginBottom, marginTop]);

    console.log(counts,d3.max(counts, (d) => d.count))

    d3.select(svg_container).selectAll("svg").remove();
    // Create the SVG container.
    const svg = d3.select(svg_container).append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");

    // Add a rect for each bar.
    let selectedAngle = null;

    function applyScatterHighlightByAngle(angle) {
      d3.select("#scatter-vis").attr("data-active-histogram-angle", String(angle));

      d3.select("#scatter-vis")
        .selectAll("circle")
        .style('fill-opacity', function(){
          const _angle = d3.select(this).attr('orientation');
          return _angle == angle ? 1.0 : 0.1;
        })
        .style('stroke-opacity', function(){
          const _angle = d3.select(this).attr('orientation');
          return _angle == angle ? 1.0 : 0.1;
        });

      d3.select("#scatter-vis")
        .selectAll("path")
        .style('fill-opacity', function(){
          const _angle = d3.select(this).attr('orientation');
          return _angle == angle ? 1.0 : 0.1;
        })
        .style('stroke-opacity', function(){
          const _angle = d3.select(this).attr('orientation');
          return _angle == angle ? 1.0 : 0.1;
        });

      svg.selectAll('.histogram')
        .style("fill", "dimgray");

      svg.selectAll('.histogram')
        .filter(bar => bar.angle === angle)
        .style("fill", "orange");
    }

    function clearScatterHighlight() {
      d3.select("#scatter-vis").attr("data-active-histogram-angle", null);

      d3.select("#scatter-vis")
        .selectAll("circle")
        .style('fill-opacity', 1.0)
        .style('stroke-opacity', 1.0);
      d3.select("#scatter-vis")
        .selectAll("path")
        .style('fill-opacity',1.0)
        .style('stroke-opacity', 1.0);

      svg.selectAll('.histogram')
        .style("fill", "dimgray");

      selectedAngle = null;
    }

    svg.append("g")
        .attr("fill", "dimgray")
        .selectAll()
        .data(counts)
        .join("rect")
        .attr('class','histogram')
        .attr("x", (d,i) => x(domains[i]))
        .attr("y", (d) => y(d.count))
        .attr("height", (d) => y(0) - y(d.count))
        .attr("width", (d) => x(domains[1])-x(domains[0]))
        .attr('stroke-width', 3)
        .attr('stroke', 'white')
        .on("click", barClick);
    d3.select("#scatter-vis")


      function barClick(event, d) {
        event.stopPropagation();

        if (selectedAngle === d.angle) {
          clearScatterHighlight();
          return;
        }

        selectedAngle = d.angle;
        applyScatterHighlightByAngle(d.angle);
      }

      // Clear selection when clicking chart background/axes (non-bar area).
      svg.on("click", function() {
        clearScatterHighlight();
      });

    // Add the x-axis and label.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        //.call(d3.axisBottom(x).tickSizeOuter(0));
        .call(d3.axisBottom(x).tickSizeOuter(0))
        .call((g) => g.append("text")
            .attr("x", width/2 + 50)
            .attr("y", marginBottom -2)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")
            .attr('font-size', '12px')
            .text("Sequence Length"));

    // Add the y-axis and label, and remove the domain line.
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).ticks(height / 40))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", marginTop)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .attr('font-size', '12px')
            .text("Frequency"));

    // Return the SVG element.
    return svg.node();
}


export function scatter(files_name,model){


  // set the dimensions and margins of the graph
  let margin,width,height;
  margin = {top: 20, right: 10, bottom: 20, left: 10};
  width = document.getElementById("scatter-vis").getBoundingClientRect().width - margin.left - margin.right;
  height = document.getElementById("scatter-vis").getBoundingClientRect().height - margin.top - margin.bottom;

  // Model-driven UMAP coordinate columns (lowercase): t5 -> x_t5/y_t5, bert -> x_bert/y_bert, etc.
  const modelKey = String(model).toLowerCase();
  const xVar = "x_" + modelKey;
  const yVar = "y_" + modelKey;

  d3.select("#scatter-vis").selectAll("svg").remove();
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


  Promise.all([getLabels(), d3.csv(files_name), getModelList()]).then(async function([labels, data, modelIds]) {
    const predictionModelIds = modelIds.filter((modelId) =>
      modelId.toLowerCase().endsWith(`_${modelKey}`)
    );

    const classifierDataSets = await Promise.all(
      modelIds.map(async (modelId) => {
        const rows = await d3.csv(await getCsvFileForModel(modelId));
        rows.modelId = modelId;
        return rows;
      })
    );
    attachClassifierPredictions(data, classifierDataSets, labels, predictionModelIds);
    console.log("Classifier features loaded:", modelIds);
    console.log("Classifier predictions loaded for consensus:", predictionModelIds);

    // If this embedding model has no UMAP coordinate columns in the file
    // (e.g. "albert" is absent), show a notice instead of a broken plot.
    if (!data || data.length === 0 || data[0][xVar] === undefined) {
      d3.select("#scatter-vis").append("div")
        .style("padding", "20px")
        .style("font-size", "14px")
        .text('No UMAP coordinates found for model "' + model + '" (expected columns ' + xVar + '/' + yVar + ').');
      return;
    }

    const max_len = math.max(data.map((d)=>d.len))
    const min_len = math.min(data.map((d)=>d.len))
    const sortedValues = math.sort(data.map(d => d.len))

    console.log("sequence lenght=",min_len,max_len);

    // Quartile calculations using math.js
    //const q1 = math.quantileSeq(sortedValues, 0.25);
    //const q2 = math.quantileSeq(sortedValues, 0.5); // Median
    //const q3 = math.quantileSeq(sortedValues, 0.75);

      const q1 = 1000, q2 = 1300, q3 = 1380;

    //const q4 = sortedValues[sortedValues.length - 1]; // Max value, assuming sortedValues is not empty

      const q4 = max_len;
      const [count0toQ1,countQ1toQ2,countQ2toQ3,countQ3toQ4]=calculateQ1Q2Q3Q4(sortedValues, q1,q2,q3,q4)

    console.log(q1,q2,q3,q4);
    //console.log(sortedValues);
    console.log(count0toQ1,countQ1toQ2,countQ2toQ3,countQ3toQ4)
   //   const _test = count0toQ1 + countQ1toQ2 + countQ2toQ3 + countQ3toQ4;
    const counts = [
    { range: "0-Q1", count: count0toQ1, color: "blue", angle: 0},
    { range: "Q1-Q2", count: countQ1toQ2, color: "blue",angle: 45},
    { range: "Q2-Q3", count: countQ2toQ3, color: "blue",angle: 90},
    { range: "Q3-Q4", count: countQ3toQ4, color: "blue",angle: 135}
    ];
    const q1_1 = parseInt(q1)+1,  q2_1 = parseInt(q2)+1, q3_1 = parseInt(q3)+1, q4_1 = parseInt(q4)+1;

    //draw histogram for sequence length
    //drawHistogram(counts, [0+'-'+q1+"(\u2500)",q1_1+'-'+q2+"(\u2572)",q2_1+'-'+q3+"(\u2572)",q3_1+'-'+q4+"(\u2571)"],"#histogram-vis");
      drawHistogram(counts, [min_len+'-'+q1,q1_1+'-'+q2,q2_1+'-'+q3,q3_1+'-'+q4],"#histogram-vis");


      data.forEach((d) => {
        d.x = parseCoordinate(d[xVar]);
        d.y = parseCoordinate(d[yVar]);
      });
      console.table(data.slice(0, 10).map((d) => ({
        id: d.ID,
        model,
        xColumn: xVar,
        rawX: d[xVar],
        parsedX: d.x,
        yColumn: yVar,
        rawY: d[yVar],
        parsedY: d.y
      })));
      data = data.filter((d) => Number.isFinite(d.x) && Number.isFinite(d.y));
      if (!data.length) {
        d3.select("#scatter-vis").append("div")
          .style("padding", "20px")
          .text(`No finite coordinates found for model "${model}".`);
        return;
      }

      // Add X axis
      const plotPadding = radius + 2;
      let x;
      x = d3.scaleLinear()
        .domain(paddedDomain(data.map((d) => d.x)))
        .range([ plotPadding, Math.max(plotPadding, width - plotPadding) ]);

      // Add Y axis
      let y;
      y = d3.scaleLinear()
        .domain(paddedDomain(data.map((d) => d.y)))
        .range([ Math.max(plotPadding, height - plotPadding), plotPadding ]);

    const plottedCoordinates = data.map((d) => ({
      id: d.ID,
      x: x(d.x),
      y: y(d.y)
    }));
    const outOfBounds = plottedCoordinates.filter((d) =>
      d.x < plotPadding || d.x > width - plotPadding ||
      d.y < plotPadding || d.y > height - plotPadding);
    console.log("Scatter plot pixel bounds:", {
      width,
      height,
      plotPadding,
      outOfBounds
    });

    console.log(`Scatter coordinates for ${model} (${xVar}/${yVar})`);
    console.log("X domain:", x.domain(), "Y domain:", y.domain());
    // console.table(data.map((d) => ({
    //   id: d.ID,
    //   label: d.label,
    //   rawX: d[xVar],
    //   rawY: d[yVar],
    //   coordinateX: d.x,
    //   coordinateY: d.y,
    //   pixelX: x(d.x),
    //   pixelY: y(d.y)
    // })));

    // Color scale: give me a specie name, I return a color
    const color = d3.scaleOrdinal()
      .domain(labels)
      .range(labels.map((label) => getClassColor(label, labels)));
    data.forEach((d) => {
      d.targetX = x(d.x);
      d.targetY = y(d.y);
      d.x = d.targetX;
      d.y = d.targetY;
    });
    $(document).ready(function() {
        initializeSlider2(data.length, function(value) {
          data.forEach((datum) => {
            datum.featureThreshold = value;
          });
          for(let cls of classes){
            filterRectanglesByRange("line"+cls,value);
          }
          if (currentColorMode === "similarity") {
            similarityScale = createValueScale(data, "similarity", labels);
            updateDotsColor(svg, data, labels, similarityScale);
            createClassLegend("legend-color", labels, data, "similarity");
          }
          console.log("Slider Value Feature:", value);
        });
    });
    // Append dots
  // xVar / yVar are derived from the model name at the top of scatter().

  let bClicked = false;
  let selectedDatum = null;
  let lenDots = null;
  let currentColorMode = 'similarity';

  function getActiveHistogramAngle() {
    const activeAngle = d3.select("#scatter-vis").attr("data-active-histogram-angle");
    if (activeAngle === null || activeAngle === undefined || activeAngle === "") {
      return null;
    }

    const numericAngle = Number(activeAngle);
    return Number.isFinite(numericAngle) ? numericAngle : null;
  }

  function applyDotFilterFromHistogram() {
    const activeAngle = getActiveHistogramAngle();

    if (activeAngle === null) {
      dots.style('fill-opacity', 1.0)
        .style('stroke-opacity', 1.0);

      if (lenDots) {
        lenDots.style('fill-opacity', 1.0)
          .style('stroke-opacity', 1.0);
      }

      return false;
    }

    dots.style('fill-opacity', function() {
      const angle = Number(d3.select(this).attr('orientation'));
      return angle === activeAngle ? 1.0 : 0.1;
    }).style('stroke-opacity', function() {
      const angle = Number(d3.select(this).attr('orientation'));
      return angle === activeAngle ? 1.0 : 0.1;
    });

    if (lenDots) {
      lenDots.style('fill-opacity', function() {
        const angle = Number(d3.select(this).attr('orientation'));
        return angle === activeAngle ? 1.0 : 0.1;
      }).style('stroke-opacity', function() {
        const angle = Number(d3.select(this).attr('orientation'));
        return angle === activeAngle ? 1.0 : 0.1;
      });
    }

    return true;
  }

  const annotationLayer = svg.append('g')
    .attr('class', 'selected-annotation-layer')
    .style('pointer-events', 'none');

  function formatAnnotationValue(value, digits = 3) {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue.toFixed(digits) : 'N/A';
  }

  function getAnnotationLines(dat) {
    const labelIndex = getLabelIndex(dat.label, labels);
    const labelName = labelIndex >= 0 ? labels[labelIndex] : String(dat.label);
    const lines = [
      `${dat.ID ?? 'Unknown'}`,
      `Class: ${labelName}`,
      `Length: ${dat.len ?? 'N/A'}`
    ];

    if (currentColorMode === "consensus") {
      const predictionLines = (dat.classifierFeatureRows || [])
        .filter((row) => String(row.modelId || "")
          .toLowerCase()
          .endsWith(`_${modelKey}`))
        .map((row) => {
          const predictionIndex = getLabelIndex(row.label, labels);
          const prediction = predictionIndex >= 0 ? labels[predictionIndex] : String(row.label);
          return `${row.modelId ?? 'Classifier'}: ${prediction}`;
        });

      lines.push("Predictions:");
      lines.push(...(predictionLines.length > 0 ? predictionLines : ["N/A"]));
    } else {
      lines.push(`Similarity: ${formatAnnotationValue(getCircleValue(dat, "similarity", labels))}`);
    }

    return lines;
  }

  function clearSelectedAnnotation() {
    annotationLayer.selectAll('*').remove();
  }

  function drawSelectedAnnotation(dat) {
    annotationLayer.raise();
    clearSelectedAnnotation();

    if (!dat) {
      return;
    }

    const lines = getAnnotationLines(dat);
    const textGroup = annotationLayer.append('g')
      .attr('class', 'selected-dot-annotation');

    const text = textGroup.append('text')
      .attr('font-size', 12)
      .attr('font-family', 'sans-serif')
      .attr('font-weight', 600)
      .attr('fill', '#1f2937');

    lines.forEach((line, index) => {
      text.append('tspan')
        .attr('x', 0)
        .attr('dy', index === 0 ? 0 : 15)
        .text(line);
    });

    const textBox = text.node().getBBox();
    const paddingX = 8;
    const paddingY = 6;
    const annotationWidth = textBox.width + paddingX * 2;
    const annotationHeight = textBox.height + paddingY * 2;
    const xOffset = 14;
    const yOffset = 14;

    let annotationX = dat.x + xOffset;
    let annotationY = dat.y - annotationHeight - yOffset;

    annotationX = Math.max(6, Math.min(width - annotationWidth - 6, annotationX));
    annotationY = Math.max(6, Math.min(height - annotationHeight - 6, annotationY));

    textGroup.attr('transform', `translate(${annotationX}, ${annotationY})`);
    text.attr('transform', `translate(${paddingX}, ${paddingY + 11})`);

    textGroup.insert('rect', 'text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', annotationWidth)
      .attr('height', annotationHeight)
      .attr('rx', 6)
      .attr('ry', 6)
      .attr('fill', 'white')
      .attr('fill-opacity', 0.92)
      .attr('stroke', '#4b5563')
      .attr('stroke-width', 1);

    annotationLayer.insert('line', ':first-child')
      .attr('class', 'selected-dot-annotation-line')
      .attr('x1', dat.x)
      .attr('y1', dat.y)
      .attr('x2', annotationX)
      .attr('y2', annotationY + annotationHeight / 2)
      .attr('stroke', '#4b5563')
      .attr('stroke-width', 1.25);
  }

  function resetDotHighlight() {
    applyDotFilterFromHistogram();
  }

    function updateModeButtons(mode) {
      currentColorMode = mode;

      $('#sim_button').toggleClass('active', mode === 'similarity');
      $('#consensus_button').toggleClass('active', mode === 'consensus');
    }

    function setSequenceHighlight(selectedID, highlightColor) {
      const sequenceRoot = $(document.getElementById(selectedID));

      if (!sequenceRoot.length) {
        return;
      }

      sequenceRoot.find('span[data-scatter-highlight="true"]').each(function() {
        const parent = this.parentNode;

        while (this.firstChild) {
          parent.insertBefore(this.firstChild, this);
        }

        parent.removeChild(this);
      });

      if (!highlightColor) {
        return;
      }

      sequenceRoot.find('*').contents().filter(function() {
        return this.nodeType === Node.TEXT_NODE && this.textContent.trim().length > 0;
      }).each(function() {
        $(this).wrap(`<span data-scatter-highlight="true" style="background-color: ${highlightColor};"></span>`);
      });
    }

  const clampPixel = (value, min, max) => Math.max(min, Math.min(max, value));
  let similarityScale = createValueScale(data, "similarity", labels);
  const consensusScale = createValueScale(data, "consensus", labels);
  console.log("Color value ranges:", {
    similarity: d3.extent(data, (d) => getCircleValue(d, "similarity", labels)),
    consensus: d3.extent(data, (d) => getCircleValue(d, "consensus", labels))
  });
  const dots = svg.append('g')
    .selectAll("dot")
    .data(data)
    .join("circle")
      .attr("cx", d => clampPixel(x(d.x), plotPadding, width - plotPadding))
      .attr("cy", d => clampPixel(y(d.y), plotPadding, height - plotPadding))
      .attr("r", 7)
      .attr("orientation",function(d){
          let [size, angle] = findQuartileRange(d.len, q1, q2, q3, q4);
          return angle;
      })
      .attr("class", d => `dot dot-label-${getLabelIndex(d.label, labels)}`)
      .style("fill", d => getSimilarityColor(d.label, getCircleValue(d, "similarity", labels),
        labels, similarityScale))
      //.style("stroke", d => d3.rgb(color(d.label)).darker(0.5)) // Adds a darker rim
      //.style("stroke-width", "2px") // Adjust the width of the rim
      // .on("moveout",function(event,d){
      //     console.log(moveover)
      // })
        .on("click", function(event, dat){
          const isSameDot = selectedDatum && selectedDatum.ID === dat.ID;

          if (isSameDot) {
            bClicked = false;
              setSequenceHighlight(dat.ID.split('.')[0], null);
            selectedDatum = null;
            resetDotHighlight();
            clearSelectedAnnotation();

            for (let cls of classes) {
              for (let labelIndex = 0; labelIndex < labels.length; labelIndex++) {
                const svgId = `line${cls}_${labelIndex}`;
                d3.select(`#${svgId}`).selectAll(`rect[id="${svgId}rect"]`).remove();
              }
            }

            return;
          }

          const previousSelectedDatum = selectedDatum;
          bClicked = true;
          selectedDatum = dat;

          if (dat) {
            let selectedID = dat.ID.split('.')[0];
            const selectedElement = document.getElementById(selectedID);

        if (previousSelectedDatum && previousSelectedDatum.ID !== dat.ID) {
          setSequenceHighlight(previousSelectedDatum.ID.split('.')[0], null);
        }

            if (selectedElement) {
          setSequenceHighlight(selectedID, 'orange');

              const posId = selectedElement.pos;
              $('#accordion-wrapper').scrollTop(posId * 23);
            }

            const hasActiveHistogramFilter = applyDotFilterFromHistogram();

            if (!hasActiveHistogramFilter) {
              dots.style('fill-opacity', 0.3)
                .style('stroke-opacity', 0.3);

              if (lenDots) {
                lenDots.style('fill-opacity', 0.3)
                  .style('stroke-opacity', 0.3);
              }
            }

            d3.select(this)
              .style('fill-opacity', 1.0)
              .style('stroke-opacity', 1.0);

            drawSelectedAnnotation(dat);

            const labelIndex = getLabelIndex(dat.label, labels);
            if (labelIndex >= 0) {
              const availableModels = dat.classifierFeatureRowsByModel
                ? [...dat.classifierFeatureRowsByModel.keys()]
                : classes;
              for (let cls of availableModels) {
                try {
                  replaceModelReferences(dat, cls, labelIndex, labels);
                } catch (error) {
                  console.error(`Error processing model ${cls}:`, error);
                }
              }
            }
          }
        })

  const forceSimulation = d3.forceSimulation(data)
    .force("charge", d3.forceManyBody().strength(-3).distanceMax(15))
    .force("x", d3.forceX((d) => d.targetX).strength(0.08))
    .force("y", d3.forceY((d) => d.targetY).strength(0.08))
    .force("collision", d3.forceCollide(8))
    .on("tick", () => {
      data.forEach((d) => {
        const nextX = clampPixel(d.x, plotPadding, width - plotPadding);
        const nextY = clampPixel(d.y, plotPadding, height - plotPadding);
        if (nextX !== d.x) d.vx = 0;
        if (nextY !== d.y) d.vy = 0;
        d.x = nextX;
        d.y = nextY;
      });

      dots.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      if (selectedDatum) {
        drawSelectedAnnotation(selectedDatum);
      }
    });

  //depict the length of protein sequences (inner circles for sequence lengths).
//   let lenDots = svg.append('g')
//       .selectAll()
//       .data(data)
//       .join("circle")
//       .attr("class",d=>'len_dot'+d.label)
//       .attr("cx", d => x(d.x))
//       .attr("cy", d => y(d.y))
//       .attr("r", d=>{
//           const [size, angle] = findQuartileRange(parseInt(d.len), q1, q2, q3, q4);
//           //console.log(d.len,size)
//           return size;
//       })
//       // .attr("orientation",function(d){
//       //     let [color, angle] = findQuartileRange(d.len, q1, q2, q3, q4);
//       //     return angle;
//       // })
//       .attr("orientation",function(d){
//                   let [color, angle] = findQuartileRange(parseInt(d.len), q1, q2, q3, q4);
//                   return angle;
//               })
//       //.attr("class",d=>'dot'+d.label)
//       .style("fill", 'gray');
     
    // Append circles around dots instead of using an arc generator
      //const colorForPath = d3.scaleOrdinal(d3.schemeBlues[100]);
      //const colorForNonPath = d3.scaleOrdinal(d3.schemeReds[100]);
      //console.log(colorForPath)

    createClassLegend("legend-color", labels, data, "similarity");
      updateModeButtons('similarity');

    $('#sim_button').click(function(){
        console.log('similarity_button');
        updateModeButtons('similarity');
        updateDotsColor(svg, data, labels, similarityScale);

        createClassLegend("legend-color", labels, data, "similarity");
        if (selectedDatum) {
            drawSelectedAnnotation(selectedDatum);
        }
        }
    );

    $('#consensus_button').click(function(){
            console.log('consensus_button');
      updateModeButtons('consensus');
            updateDotsColorConsensus(svg, data, labels, consensusScale);

        createClassLegend("legend-color", labels, data, "consensus");
        if (selectedDatum) {
            drawSelectedAnnotation(selectedDatum);
        }
        }
    )


  function updateDotsColorConsensus(svg, data, labels, valueScale) {
      svg.selectAll("circle")
          .data(data)
          .style("fill", d => {
              return getSimilarityColor(d.label, getCircleValue(d, "consensus", labels),
                  labels, valueScale);
          });
  }
  })
}

function initializeSlider2(max, callback) {
  const min = 0;
  const slider = $('#threshold-slider2');
  const handleSlide = function(event, ui) {
    updateCurrentValuePosition(ui.value);
    console.log('Slider value:', ui.value);
    if (callback && typeof callback === 'function') {
      callback(ui.value);
    }
  };

  if (slider.hasClass('ui-slider')) {
    slider.slider('option', { min, max, step: 1 });
    slider.slider('value', min);
    $('.min-value1').text(min);
    $('.max-value1, .max-value2').text(max);
    updateCurrentValuePosition(min);
    return;
  }

  slider.slider({
    min: min,
    max: max,
    step: 1,
    value: 0,  // Start at the minimum value
    create: function() {
      $('.min-value1').text(min);
      $('.max-value1, .max-value2').text(max);
      updateCurrentValuePosition($(this).slider('value'));  // Position the tooltip at start
    },
    slide: handleSlide
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