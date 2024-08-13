const TokenPrice: { [key: string]: number[] } = {
    // GPT-4o Models
    'gpt-4o': [0.005, 0.015],
    'gpt-4o-2024-05-13': [0.005, 0.015],
    
    // GPT-4o Mini Models
    'gpt-4o-mini': [0.00015, 0.0006],
    'gpt-4o-mini-2024-07-18': [0.00015, 0.0006],

    // GPT-4 Models
    'gpt-4': [0.03, 0.06],
    'gpt-4-32k': [0.06, 0.12],
    'gpt-4-0125-preview': [0.01, 0.03],
    'gpt-4-1106-preview': [0.01, 0.03],
    'gpt-4-vision-preview': [0.01, 0.03],

    // GPT-4 Turbo Models
    'gpt-4-turbo': [0.01, 0.03],
    'gpt-4-turbo-2024-04-09': [0.01, 0.03],

    // GPT-3.5 Turbo Models
    'gpt-3.5-turbo': [0.002, 0.004],
    'gpt-3.5-turbo-0125': [0.0005, 0.0015],
    'gpt-3.5-turbo-instruct': [0.0015, 0.002],
    'gpt-3.5-turbo-1106': [0.001, 0.002],
    'gpt-3.5-turbo-0613': [0.0015, 0.002],
    'gpt-3.5-turbo-16k-0613': [0.003, 0.004],
    'gpt-3.5-turbo-0301': [0.0015, 0.002],

    // Davinci Models
    'davinci-002': [0.012, 0.012],

    // Babbage Models
    'babbage-002': [0.0016, 0.0016],

    // Ada Models
    'ada': [0.0004, 0.0004],

    // Embedding Models
    'text-embedding-3-small': [0.00002, 0.00002],
    'text-embedding-3-large': [0.00013, 0.00013],
    'ada-v2': [0.0001, 0.0001],

    // AWS Bedrock
    'jamba-instruct': [0.0005, 0.0007],
    'jurassic-2-mid': [0.0125, 0.0125],
    'jurassic-2-ultra': [0.0188, 0.0188],
    'titan-text-express': [0.0002, 0.0006],
    'titan-text-lite': [0.00015, 0.0002],
    'titan-text-premier': [0.0005, 0.0015],
    'titan-embed-text': [0.0001, 0],
    'titan-embed-text-v2': [0.00002, 0],
    'claude-v2': [0.008, 0.024],
    'claude-3-sonnet': [0.003, 0.015],
    'claude-3-5-sonnet': [0.003, 0.015],
    'claude-3-haiku': [0.00025, 0.00125],
    'claude-3-opus': [0.015, 0.075],
    'claude-instant': [0.0008, 0.0024],
    'command': [0.0015, 0.0020],
    'command-light': [0.0003, 0.0006],
    'command-r': [0.0005, 0.0015],
    'command-r-plus': [0.0030, 0.0150],
    'embed-english': [0.0001, 0],
    'embed-multilingual': [0.0001, 0],
    'llama2-chat-13b': [0.00075, 0.001],
    'llama2-chat-70b': [0.00195, 0.00256],
    'llama3-8b-instruct': [0.0003, 0.0006],
    'llama3-70b-instruct': [0.00265, 0.0035],
    'llama3-1-8b-instruct': [0.0003, 0.0006],
    'llama3-1-70b-instruct': [0.00265, 0.0035],
    'llama3-1-405b-instruct': [0.00532, 0.016],
    'mistral-7b-instruct': [0.0003, 0.0006],
    'mixtral-8x7b-instruct': [0.00265, 0.0035],
    'mistral-large-2402': [0.00075, 0.001],
    'mistral-large-2407': [0.00195, 0.00256],
    'mistral-small-2402': [0.0002, 0.0006],
    'stable-diffusion-xl-v0': [0.00015, 0.0002],
    'stable-diffusion-xl-v1': [0.0002, 0.0006]
};

class PriceCalculator {
    private totalInputPrice: number = 0;
    private totalOutputPrice: number = 0;
    private totalCombinedPrice: number = 0;
    private modelFormat: (model: string) => string;

    constructor(modelFormat: (model: string) => string = (model) => {
        return model.split('-v')[0];
    }) {
        this.modelFormat = modelFormat;
    }

    public getInputPrice(modelId: string, tokens: number = 1000): number {
        const baseName = this.modelFormat(modelId);
        if (!(baseName in TokenPrice)) {
        throw new Error(`Model ${baseName} not found`);
        }
        return this.calcPrice(TokenPrice[baseName][0], tokens);
    }

    public getOutputPrice(modelId: string, tokens: number = 1000): number {
        const baseName = this.modelFormat(modelId);
        if (!(baseName in TokenPrice)) {
        throw new Error(`Model ${baseName} not found`);
        }
        return this.calcPrice(TokenPrice[baseName][1], tokens);
    }

    public getTotalPrice(modelId: string, inputTokens: number, outputTokens: number): number {
        const inputPrice = this.getInputPrice(modelId, inputTokens);
        const outputPrice = this.getOutputPrice(modelId, outputTokens);
        return inputPrice + outputPrice;
    }

    private calcPrice(price: number, tokens: number): number {
        return (price * tokens) / 1000;
    }

    public calculateTokenPrice(modelId: string, usage: { prompt_tokens: number, completion_tokens: number }): { inputPrice: number, outputPrice: number, totalPrice: number } {
        const inputTokens = usage.prompt_tokens;
        const outputTokens = usage.completion_tokens;

        const inputPrice = this.getInputPrice(modelId, inputTokens);
        const outputPrice = this.getOutputPrice(modelId, outputTokens);
        const totalPrice = this.getTotalPrice(modelId, inputTokens, outputTokens);

        this.totalInputPrice += inputPrice;
        this.totalOutputPrice += outputPrice;
        this.totalCombinedPrice += totalPrice;
        return { inputPrice, outputPrice, totalPrice };
    }

    public getTotalInputPrice(): number {
        return this.totalInputPrice;
    }

    public getTotalOutputPrice(): number {
        return this.totalOutputPrice;
    }

    public getTotalCombinedPrice(): number {
        return this.totalCombinedPrice;
    }

    public addOrUpdateModel(model: string, inputPrice: number, outputPrice: number): void {
        TokenPrice[model] = [inputPrice, outputPrice];
    }
}

export = PriceCalculator;