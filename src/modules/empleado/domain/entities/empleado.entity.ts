export class Empleado {
  constructor(
    public readonly id: string,
    public nombre: string,
    public usuario: string,
    public password: string,
    public activo: boolean,
    public rol: string,
    public codigo: string,
    public fechaRegistro?: Date,
    public fechaBaja?: Date,
    public consecutivo?: number,
  ) {}
}
