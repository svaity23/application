import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// app modules
import { AppRoutingModule } from './app-routing.module';
import { ResultsStoreModule } from './store/results-store/results-store.module';

// components
import { AppComponent } from './app.component';
import { ResultsModule } from './results/results.module';

@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    ResultsStoreModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,    
    ResultsModule,
    BrowserAnimationsModule    
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]  
})
export class AppModule { }
