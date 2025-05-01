
declare module 'juice' {
  interface JuiceOptions {
    applyStyleTags?: boolean;
    removeStyleTags?: boolean;
    preserveMediaQueries?: boolean;
    preserveFontFaces?: boolean;
    preserveKeyFrames?: boolean;
    applyWidthAttributes?: boolean;
    applyHeightAttributes?: boolean;
    applyAttributesTableElements?: boolean;
    webResources?: {
      relativeTo?: string;
      images?: boolean;
      svgs?: boolean;
      scripts?: boolean;
      links?: boolean;
    };
    extraCss?: string;
    insertPreservedExtraCss?: boolean;
    inlinePseudoElements?: boolean;
  }

  function juice(html: string, options?: JuiceOptions): string;
  
  namespace juice {
    function juiceResources(html: string, options: JuiceOptions, callback: (err: Error | null, html: string) => void): void;
    function juiceResources(html: string, callback: (err: Error | null, html: string) => void): void;
    function juiceFile(filePath: string, options: JuiceOptions, callback: (err: Error | null, html: string) => void): void;
    function juiceFile(filePath: string, callback: (err: Error | null, html: string) => void): void;
    function inlineContent(html: string, css: string, options?: JuiceOptions): string;
  }
  
  export = juice;
}
