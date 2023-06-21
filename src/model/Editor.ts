export class Editor<D>{

    private document: D;
    private undoStack: D[] = [];

    constructor(initialDocument: D) {
        this.document = initialDocument;
        this.store();
    }

    public getDocument(): D {
        return this.document;
    }

    public setDocument(newDocument: D){
        this.document = newDocument;
    }

    public store(): void {
        this.undoStack.push(this.document);
    }

    public undo(): void {
        const desired = this.undoStack.pop();

        if (desired) {
            this.document = desired;
        }
    }
}