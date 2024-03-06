import { Component, OnInit, inject } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogTitle,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import {MatInputModule} from '@angular/material/input';
import { BlogService } from "../../services/blog.service";


@Component({
	selector: "app-settings-dialog",
	standalone: true,
	imports: [
    FormsModule,
    ReactiveFormsModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatDialogClose,
		MatButtonModule,
    MatIconModule,
    MatInputModule
	],
	templateUrl: "./settings-dialog.component.html",
	styleUrl: "./settings-dialog.component.scss",
})
export class SettingsDialogComponent implements OnInit {
  blogURL: string = 'hashnode.anguhashblog.com';
  newBlogURL: string = '';
  blogURLChanged: boolean = false;
  blogService: BlogService = inject(BlogService);


  ngOnInit(): void {
    this.blogURL = this.blogService.getBlogURL();
    if (this.blogURL === "hashnode.anguhashblog.com") {
      this.blogURLChanged = false;
    } else {
      this.blogURLChanged = true;
    }
  }

  changeBlogURL(): void {
    this.blogService.setBlogURL(this.newBlogURL);
    this.blogURL = this.blogService.getBlogURL();
    if (this.blogURL === "hashnode.anguhashblog.com") {
      this.blogURLChanged = false;
    } else {
      this.blogURLChanged = true;
    }
  }

  resetBlogURL(): void {
    this.blogService.resetBlogURL();
    this.blogURL = this.blogService.getBlogURL();
    this.blogURLChanged = false;
  }
}
