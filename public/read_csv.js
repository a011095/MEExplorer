export async function loadData(data_val) {
    try {
        if (data_val=="f1"){
          const rows = await d3.csv("/dat/files.csv", function(d) {
            return {
                model: d.Model,
                emb: d.Emb,
                value: parseFloat(d.value) // convert "Length" column to number
            };
          });
          

          console.log(rows);
        return rows;
      }

      if (data_val=="accuracy"){
          const rows = await d3.csv("/dat/files1.csv", function(d) {
            return {
                model: d.Model,
                emb: d.Emb,
                value: parseFloat(d.value)
                 // convert "Length" column to number
            };
        });
                

        console.log(rows);
      return rows;
    }
    
  } catch (error) {
      console.error("Error loading CSV:", error);
  }
}