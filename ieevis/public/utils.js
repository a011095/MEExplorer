import { loadData } from './read_csv.js';
import { heatmap } from './drawHeat.js';
import { heatmapN } from './drawHeat.js';
import { scatter } from './scatter_d3.js';

// import { setupButtonListeners } from './drawHeat.js';
import { modelViewer } from './motif.js';
 // renderHeat(data1)
const dictinary={"acc":"https://raw.githubusercontent.com/vikash06131721/Data-host/main/files.csv",
 "f1":"https://raw.githubusercontent.com/vikash06131721/Data-host/main/files1.csv"};

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


async function renderChart(data_val,agg_data){

  const cols = d3.scaleSequential()
    .interpolator(d3.interpolateReds)
    .domain([1,100])

  if (data_val=="accuracy"){
    const tf =heatmapN("heat-vis", " ", "acc", agg_data,cols)
    if (tf==false){
      const select = await heatmap("https://raw.githubusercontent.com/vikash06131721/Data-host/main/files.csv","heat-vis","Accuracy Heat Map","acc",agg_data)
      // scatter("https://raw.githubusercontent.com/vikash06131721/Data-host/main/cas9all.csv",select[1])
    }
    else{
      console.log("not needed");
    }
  }else if (data_val == "f1") {
    // Assuming you have another URL or selector for precision
    const tf= heatmapN("heat-vis", " ", "f1", agg_data,cols)
    if(tf==false){
      const select = await heatmap("https://raw.githubusercontent.com/vikash06131721/Data-host/main/files1.csv", "heat-vis","F1 Score Heat Map","f1",agg_data);
      // scatter("https://raw.githubusercontent.com/vikash06131721/Data-host/main/cas9all.csv",select[1])
    }
    else{
      console.log("not needed");
    }
} 
  // heatmap("files.csv","#f1-box")

  
}


// Example usage:


$( document ).ready(function(){
  //change the visualization for sequences
  //let aggregatedDataM=[]
  aggregateDataFromCSVs(dictinary).then(aggregatedData => {
    // console.log("Aggregated Data:", aggregatedData);
    //aggregatedDataM= aggregatedData;
    renderChart("f1",aggregatedData);
    scatter("cas9all_new_All6.csv","T5")
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
          aggregateDataFromCSVs(dictinary).then(aggregatedData => {
            // console.log("Aggregated Data:", aggregatedData);

            renderChart(value,aggregatedData);


            // Perform further operations with aggregatedData here
          }).catch(error => {
            console.error("Error in data aggregation:", error);
          });

      }})

  const models =["BiLSTM_T5","BiLSTM_GPT2","CNN_T5","CNN_gpt2","CNN_Bert","Trans_T5","Trans_Gpt2","Trans_Bert","BiLSTM_Bert"];
  modelViewer(models.length, "gray",models);

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