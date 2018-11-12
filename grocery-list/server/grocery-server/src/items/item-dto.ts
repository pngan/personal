export class ItemDto {
    constructor(itemId: string, itemName: string) {
        this.itemId = itemId;
        this.itemName = itemName;
    }
    itemName: string;
    itemId: string;
}