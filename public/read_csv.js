import { getMetricFiles } from "./config.js";

export async function loadData(dataValue) {
  const files = await getMetricFiles();
  const file = files[dataValue];
  if (!file) {
    throw new Error(`Unknown metric "${dataValue}"`);
  }

  return d3.csv(file, (d) => ({
    model: d.Model,
    emb: d.Emb,
    value: Number.parseFloat(d.value)
  }));
}
