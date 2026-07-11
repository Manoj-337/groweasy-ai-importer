"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBatches = createBatches;
function createBatches(items, batchSize = 25) {
    const batches = [];
    for (let i = 0; i < items.length; i += batchSize) {
        batches.push(items.slice(i, i + batchSize));
    }
    return batches;
}
