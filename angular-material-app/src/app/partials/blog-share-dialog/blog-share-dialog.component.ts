import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogTitle,
} from "@angular/material/dialog";
import {ClipboardModule} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-blog-share-dialog',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatDialogContent,MatDialogClose,ClipboardModule],
  templateUrl: './blog-share-dialog.component.html',
  styleUrl: './blog-share-dialog.component.scss'
})
export class BlogShareDialogComponent {
  url:string=''
  constructor(  @Inject(MAT_DIALOG_DATA) public data: any
){}
ngOnInit(){
  console.log(this.data)
  this.url=this.data
}
shareonlinkedin(URL:any){
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${URL}`)
}
shareontwitter(URL:any){
  window.open(`https://twitter.com/intent/tweet?url=${URL}`)
}
}
