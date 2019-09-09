import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { NotifierModule } from 'angular-notifier';
import { MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule, MatSidenavModule, MatFormFieldModule, MatTooltipModule,MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule} from '@angular/material';
import { AppComponent } from './app.component'
import { ElementModule } from './element.module'
import { SocketsService } from './sockets.service'
import { HttpClientModule } from '@angular/common/http'
import { SortPipe } from './sort.pipe';
import { PageComponent } from './page/page.component'
import { CpComponent } from './cp/cp.component';
import { LoginComponent } from './login/login.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxAutoScrollModule} from "ngx-auto-scroll";
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [BrowserModule,NgxAutoScrollModule, ReactiveFormsModule, BrowserAnimationsModule, NoopAnimationsModule, MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
    MatToolbarModule,NotifierModule, MatMenuModule, MatIconModule, FormsModule, MatProgressSpinnerModule, ElementModule, HttpClientModule, MatSidenavModule, MatFormFieldModule, MatTooltipModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/', pathMatch: 'full' },
      {path: '', component: LoginComponent},
      {path: 'chat', component: PageComponent}
    ])
  ],
  declarations: [AppComponent, PageComponent, CpComponent, SortPipe, LoginComponent],
  providers: [SocketsService,AppComponent,LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
