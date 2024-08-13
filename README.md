# ai-calc

A comprehensive price calculator for token-based AI models. Automatically calculate and summarize the total cost of all AI API calls in your script, providing a detailed output after execution.

## Installation

Install the package via npm:

```bash
npm install ai-calc
```

If you are installing directly from the source, run the build command:

```bash
npm run build
```

## Usage

### TypeScript Example

Calculate total for multiple calls:
```typescript
import PriceCalculator from 'ai-calc';

import OpenAI from "openai"; // your model package
const openai = new OpenAI(); // your constructor/config

// Example usage
const priceCalculator = new PriceCalculator();

// Add custom model or update/override existing
// priceCalculator.addOrUpdateModel('custom-model', 0.02, 0.04);

const model1 = "gpt-4-1106-preview";
const completion1 = await openai.chat.completions.create({
    messages: [
        { "role": "user", "content": "Say hello!" }
    ],
    model: model1,
});

const model1Price = priceCalculator.calculateTokenPrice(model1, completion1.usage);
console.log(model1Price);

const model2 = "gpt-4-turbo";
const completion2 = await openai.chat.completions.create({
    messages: [
        { "role": "user", "content": "Say good-bye!" }
    ],
    model: model2,
});

const model2Price = priceCalculator.calculateTokenPrice(model2, completion2.usage);
console.log(model2Price);

console.log('Total Input Price:', priceCalculator.getTotalInputPrice());
console.log('Total Output Price:', priceCalculator.getTotalOutputPrice());
console.log('Total Combined Price:', priceCalculator.getTotalCombinedPrice());
```

### JavaScript Example

```javascript
const PriceCalculator = require('ai-calc');

const OpenAI = require("openai"); // your model package
const openai = new OpenAI(); // your constructor/config

// Example usage
const priceCalculator = new PriceCalculator();

// Add custom model or update/override existing
// priceCalculator.addOrUpdateModel('custom-model', 0.02, 0.04);

let completion;
const model1 = "gpt-4-1106-preview";
const completion1 = await openai.chat.completions.create({
    messages: [
        { "role": "user", "content": "Say hello!" }
    ],
    model: model1,
});

const model1Price = priceCalculator.calculateTokenPrice(model1, completion1.usage);
console.log(model1Price);

const model2 = "gpt-4-turbo";
const completion2 = await openai.chat.completions.create({
    messages: [
        { "role": "user", "content": "Say good-bye!" }
    ],
    model: model2,
});

const model2Price = priceCalculator.calculateTokenPrice(model2, completion2.usage);
console.log(model2Price);

console.log('Total Input Price:', priceCalculator.getTotalInputPrice());
console.log('Total Output Price:', priceCalculator.getTotalOutputPrice());
console.log('Total Combined Price:', priceCalculator.getTotalCombinedPrice());
```

## License

MIT License

Author: James Malin
