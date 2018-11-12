export class CreateItemDto {
    constructor(itemName: string) {
        this.itemName = itemName;
    }
    itemName: string;
}
