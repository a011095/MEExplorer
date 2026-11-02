import { heatmap } from './drawHeat.js';

// import { setupButtonListeners } from './drawHeat.js';
import { modelViewer } from './motif.js';
import { getMetricFiles, getModelList } from './config.js';

async function aggregateDataFromCSVs(dict) {
  let aggregatedData = {};

  const loadAndProcessCSV = async (key, fileURL) => {
    const data = await d3.csv(fileURL);
    aggregatedData[key] = {};
    
    data.forEach(d => {
      const combinedKey = `${d.Model},${d.Emb}`;
      aggregatedData[key][combinedKey] = +d.value;
    });
  };

  const allPromises = Object.entries(dict).map(([key, fileURL]) => loadAndProcessCSV(key, fileURL));
  
  await Promise.all(allPromises);
  return aggregatedData;
}

//for model comparison view
async function renderChart(data_val, agg_data, metricFiles){
  const metric = data_val === "accuracy" ? "acc" : data_val;
  const file = metric === "acc" ? metricFiles.accuracy : metricFiles.f1;
  if (!file) {
    throw new Error(`Unknown heatmap metric "${data_val}"`);
  }

  // Rebuild the heatmap for each metric so its labels come from that CSV.
  await heatmap(
    file,
    "heat-vis",
    metric === "acc" ? "Accuracy Heat Map" : "F1 Score Heat Map",
    metric,
    agg_data
  );
}


// Example usage:


$( document ).ready(async function(){
  const metricFiles = await getMetricFiles();
  const dictionary = { acc: metricFiles.accuracy, f1: metricFiles.f1 };
  //change the visualization for sequences
  //let aggregatedDataM=[]
  aggregateDataFromCSVs(dictionary).then(aggregatedData => {
    // console.log("Aggregated Data:", aggregatedData);
    //aggregatedDataM= aggregatedData;
    renderChart("f1",aggregatedData, dictionary);
    // scatter("cas9all_new_All2.csv","Gpt2")

    // Perform further operations with aggregatedData here
  }).catch(error => {
    console.error("Error in data aggregation:", error);
  });
  // $('#metric_type').dropdown({});


  $('#metric_type').dropdown(
      {action: 'hide',onChange:function(value, text, $selectedItem){
          //console.log($(this).val())
          //let gViewType = $(this).val();
          //console.log(value, gViewType);

          //console.log('metric viz is changed')
          aggregateDataFromCSVs(dictionary).then(aggregatedData => {
            // console.log("Aggregated Data:", aggregatedData);

            renderChart(value,aggregatedData, dictionary);


            // Perform further operations with aggregatedData here
          }).catch(error => {
            console.error("Error in data aggregation:", error);
          });

      }})

  getModelList().then(models => {
    modelViewer(models.length, "gray", models);
  }).catch(error => {
    console.error("Error building model list:", error);
  });

  //$('#sim_button');
  var content = document.querySelector('#accordion-wrapper');
  var offset = 0;//panel.offsetWidth - panel.clientWidth;

  // content.style['left'] = -offset + 'px';
  // content.style['width'] = (content.offsetWidth + offset) + 'px';
  // content.style['float'] = 'left';
  // content.style['margin-right'] = -offset + 'px';

  // content.addEventListener('scroll', function(event) {
  //   panel.scrollTop = event.target.scrollTop;
  // });

});