// Central access to data_config.json. The config is fetched once and the
// resulting promise is cached so every caller shares the same request.
let configPromise = null;

export function getDataConfig() {
  if (!configPromise) {
    configPromise = d3.json(`/data_config.json?${Date.now()}`);
  }
  return configPromise;
}

function configPath(fileName) {
  if (!fileName) throw new Error("A data file is not configured");
  return `/dat/${fileName.endsWith(".csv") ? fileName : `${fileName}.csv`}`;
}

export async function getLabels() {
  return (await getDataConfig()).classes;
}

export async function getProjectionFile() {
  return configPath((await getDataConfig()).projection);
}

export async function getMetricFiles() {
  const config = await getDataConfig();
  return {
    accuracy: configPath(config.accuracy),
    f1: configPath(config.f1score)
  };
}

// Build the list of model identifiers from the config.
// Each identifier is "Classification_Embedding" (e.g. "BiLSTM_t5").
export async function getModelList() {
  const config = await getDataConfig();
  const models = [];
  for (const cls of config.classification_models) {
    for (const emb of config.embedding_models) {
      models.push(`${cls}_${emb}`);
    }
  }
  return models;
}

// Resolve a model identifier (e.g. "BiLSTM_t5") to its CSV URL using the
// datasets defined in data_config.json.
export async function getCsvFileForModel(modelId) {
  const config = await getDataConfig();
  const lastUnderscore = modelId.lastIndexOf("_");
  const classification = modelId.slice(0, lastUnderscore);
  const embedding = modelId.slice(lastUnderscore + 1);

  const dataset = config.datasets.find(
    (d) =>
      d.classification_models[0].toLowerCase() === classification.toLowerCase() &&
      d.embedding_models[0].toLowerCase() === embedding.toLowerCase()
  );

  if (!dataset) {
    throw new Error(`No dataset configured for model "${modelId}"`);
  }
  return configPath(dataset.csv_file);
}
