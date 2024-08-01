declare class PriceCalculator {
    private totalInputPrice;
    private totalOutputPrice;
    private totalCombinedPrice;
    private modelFormat;
    constructor(modelFormat?: (model: string) => string);
    getInputPrice(modelId: string, tokens?: number): number;
    getOutputPrice(modelId: string, tokens?: number): number;
    getTotalPrice(modelId: string, inputTokens: number, outputTokens: number): number;
    private calcPrice;
    calculateTokenPrice(modelId: string, usage: {
        prompt_tokens: number;
        completion_tokens: number;
    }): void;
    getTotalInputPrice(): number;
    getTotalOutputPrice(): number;
    getTotalCombinedPrice(): number;
    addOrUpdateModel(model: string, inputPrice: number, outputPrice: number): void;
}
export = PriceCalculator;
