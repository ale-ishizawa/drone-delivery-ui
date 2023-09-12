
export interface LoadJson {
  load: () => Promise<LoadJson.Model>
}

export namespace LoadJson {
  export type Model = Record<string, number>
}