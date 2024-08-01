declare class PriceCalculator {
    private totalInputPrice;
    private totalOutputPrice;
    private totalCombinedPrice;
    private modelFormat;
    constructor(modelFormat?: (model: string) => string);
    getInputPrice(model: string, tokens?: number): number;
    getOutputPrice(model: string, tokens?: number): number;
    getTotalPrice(model: string, inputTokens: number, outputTokens: number): number;
    private calcPrice;
    calculateTokenPrice(model: string, usage: {
        prompt_tokens: number;
        completion_tokens: number;
    }): void;
    getTotalInputPrice(): number;
    getTotalOutputPrice(): number;
    getTotalCombinedPrice(): number;
    addOrUpdateModel(model: string, inputPrice: number, outputPrice: number): void;
}
export = PriceCalculator;
