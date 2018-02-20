export class Item {
	public title: string;
	public desc: string;
	public tag: string;
	public creator: string;
	public finished: boolean;
	public userId: number;

	public Item(){
	}
      
	constructor() {
        this.title = "";
        this.desc = "";
        this.tag = "";
        this.creator = "";
        this.finished = false;
        this.userId = 0;
        
	}
}
