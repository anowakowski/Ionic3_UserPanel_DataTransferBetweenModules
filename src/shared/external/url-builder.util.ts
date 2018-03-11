import {IEnvironment} from "./ienvironment";

export class UrlBuilder{
  private static readonly CURRENT_APP_SERVER = '';

  private constructor(environment : IEnvironment)
  private constructor(environment : IEnvironment, appContext : string)
  private constructor(environment : IEnvironment, appContext : string, path : string)
  private constructor(private environment : IEnvironment, private appContext : string = null, private path : string = '') { }

  public static builder(environment : IEnvironment) : UrlBuilder{
    return new UrlBuilder(environment);
  }

  public forAppContext(appContext : string) : UrlBuilder {
    return new UrlBuilder(this.environment, appContext);
  }

  public forPath(path : string) : UrlBuilder{
    this.validateAppContextSetup();
    return new UrlBuilder(this.environment, this.appContext, this.path + path);
  }

  public buildForPath(path : string) : string {
    return this.forPath(path).build();
  }

  public withPathParam(pathParam : string | number) : UrlBuilder {
    return this.forPath('/' + pathParam);
  }

  public buildWithPathParam(pathParam : string | number) : string {
    return this.withPathParam(pathParam).build();
  }

  public build() : string{
    this.validateAppContextSetup();
    this.validatePathSetup();

    return this.prepareBaseUrl(this.environment)  + this.appContext + this.path;
  }

  private validateAppContextSetup(){
    if(this.appContext == null){
      throw new Error('Before building url with path you need to set up application context');
    }
  }

  private validatePathSetup(){
    if(this.path && this.path.length){
      return;
    }

    throw new Error('Before building url the resouce path needs to be specified.');
  }

  private prepareBaseUrl(environment : IEnvironment){
    if(!environment.backend){
      return UrlBuilder.CURRENT_APP_SERVER;
    }

    let backend = this.environment.backend;
    return backend.protocol + '://' + backend.host + ':' + backend.port
  }
}
