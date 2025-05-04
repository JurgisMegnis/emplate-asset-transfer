
export class Step {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public fileType: string[],
    public required: boolean = false,
    public iconIdle: string,
    public iconActive: string,
    public active: boolean,
    public completed: boolean,
    public dataInputComponents: string[],
  ) {}
}
