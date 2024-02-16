import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
    apiKey: 'your-api-key'
});
const index = pinecone.index('example-index');

// In a more realistic scenario, these vector values are
// the output of a model. Values must match the dimension
// of the index.
const records = [
  { id: '1', values: [0.1, 0.2, 0.3] },
  { id: '2', values: [0.4, 0.5, 0.6] }
]

// Upsert a record in the default namespace
await index.upsert(records);

// Upsert a record in a non-default namespace (for paid indexes only)
const ns = index.namespace('example-namespace');
await ns.upsert(records);