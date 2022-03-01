import { Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private metaService: Meta, private titleService: Title) {}

  setMeta(tag: MetaDefinition): void {
    this.metaService.updateTag(tag);
  }

  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }
}
