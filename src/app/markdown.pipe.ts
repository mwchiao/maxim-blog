import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';
import * as marked from 'marked';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string): string {
    if (value && value.length > 0) {
      // Sanitized HTML from markdown
      return this.sanitizer.sanitize(SecurityContext.HTML, marked(value));
    }
    return this.sanitizer.sanitize(SecurityContext.HTML, value);
  }

}
