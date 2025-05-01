
declare module "juice" {
  function juiceResources(html: string, options: any, callback: (err: Error, html: string) => void): void;
  function juiceFile(filePath: string, options: any, callback: (err: Error, html: string) => void): void;
  function juice(html: string, options?: any): string;
  export = juice;
}
