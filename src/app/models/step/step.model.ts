
export class Step {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public fileType: string,
    public required: boolean = false,
    public icon: string
  ) {}
}
