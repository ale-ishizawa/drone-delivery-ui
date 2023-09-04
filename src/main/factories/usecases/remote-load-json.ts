import { RemoteLoadJson } from "../../../data/usecases/remote-load-json";
import { LoadJson } from "../../../domain/usecases/load-json";
import { makeAxiosHttpClient } from "../http/axios-http-client-factory";

export const makeRemoteLoadJson = (): LoadJson => new RemoteLoadJson('https://mocki.io/v1/10404696-fd43-4481-a7ed-f9369073252f', makeAxiosHttpClient())