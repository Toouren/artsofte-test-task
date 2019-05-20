import { Component,
          Input,
          ComponentFactoryResolver,
          OnChanges,
          ApplicationRef,
          ViewChild,
          ViewContainerRef
        } from '@angular/core';
import { ISection } from '../types';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnChanges {

  @Input()
  currentSection: ISection;

  @ViewChild('container', {read: ViewContainerRef})
  viewContainer: ViewContainerRef;


  appRef: ApplicationRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnChanges() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.currentSection.value);

    this.viewContainer.clear();
    this.viewContainer.createComponent(componentFactory);
  }
}
