export class IEnvironment {
  readonly production: boolean;
  readonly backend: {
    readonly protocol: string,
    readonly host: string,
    readonly port: string
  };
  readonly casLoginUrl: string;
  readonly serviceUrl: string;
}
