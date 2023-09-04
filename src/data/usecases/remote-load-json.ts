import { UnexpectedError } from "../../domain/errors/unexpected-error";
import { LoadJson } from "../../domain/usecases/load-json";
import { HttpClient, HttpStatusCode } from "../protocols/http/http-client";


export class RemoteLoadJson implements LoadJson {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadJson.Model[]>
  ) { }

  async load(): Promise<LoadJson.Model[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get'
    })
    const data = httpResponse.body || []
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return data
      case HttpStatusCode.noContent: return []
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadJson {
  export type Model = Record<string, number>
}