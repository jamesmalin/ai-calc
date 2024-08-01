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
    'ada-v2': [0.0001, 0.0001]
};

class PriceCalculator {
    private totalInputPrice: number = 0;
    private totalOutputPrice: number = 0;
    private totalCombinedPrice: number = 0;
    private modelFormat: (model: string) => string;

    constructor(modelFormat: (model: string) => string = (model) => model) {
        this.modelFormat = modelFormat;
    }

    public getInputPrice(model: string, tokens: number = 1000): number {
        const formattedModel = this.modelFormat(model);
        return this.calcPrice(TokenPrice[formattedModel][0], tokens);
    }

    public getOutputPrice(model: string, tokens: number = 1000): number {
        const formattedModel = this.modelFormat(model);
        return this.calcPrice(TokenPrice[formattedModel][1], tokens);
    }

    public getTotalPrice(model: string, inputTokens: number, outputTokens: number): number {
        const inputPrice = this.getInputPrice(model, inputTokens);
        const outputPrice = this.getOutputPrice(model, outputTokens);
        return inputPrice + outputPrice;
    }

    private calcPrice(price: number, tokens: number): number {
        return (price * tokens) / 1000;
    }

    public calculateTokenPrice(model: string, usage: { prompt_tokens: number, completion_tokens: number }): void {
        const inputTokens = usage.prompt_tokens;
        const outputTokens = usage.completion_tokens;

        const inputPrice = this.getInputPrice(model, inputTokens);
        const outputPrice = this.getOutputPrice(model, outputTokens);
        const totalPrice = this.getTotalPrice(model, inputTokens, outputTokens);

        this.totalInputPrice += inputPrice;
        this.totalOutputPrice += outputPrice;
        this.totalCombinedPrice += totalPrice;
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