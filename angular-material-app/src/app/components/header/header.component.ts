import { Component, Inject, inject, OnInit } from "@angular/core";
import { ThemeService } from "../../services/theme.service";
import { DOCUMENT, KeyValuePipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { SeriesList } from "../../models/post";
import { BlogInfo, BlogLinks } from "../../models/blog-info";
import { BlogService } from "../../services/blog.service";
import { MatDialog } from "@angular/material/dialog";
import { SearchDialogComponent } from "../../partials/search-dialog/search-dialog.component";
import { SettingsDialogComponent } from "../../partials/settings-dialog/settings-dialog.component";
import { FollowDialogComponent } from "../../partials/follow-dialog/follow-dialog.component";

import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    KeyValuePipe,
    RouterLink,
    MatSlideToggleModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
  blogURL!: string;
  blogInfo!: BlogInfo;
  blogName: string = "";
  // start with default image to prevent 404 when returning from post-details page
  blogImage: string = "/assets/images/anguhashblog-logo.jpg";
  blogSocialLinks!: BlogLinks;
  seriesList!: SeriesList[];
  themeService: ThemeService = inject(ThemeService);
  blogService: BlogService = inject(BlogService);
  private querySubscription?: Subscription;

  constructor(
    public dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit(): void {
    this.blogURL = this.blogService.getBlogURL();
    this.querySubscription = this.blogService
      .getBlogInfo(this.blogURL)
      .subscribe((data) => {
        this.blogInfo = data;
        this.blogName = this.blogInfo.title;
        if (this.blogInfo.isTeam && this.blogInfo.favicon) {
          this.blogImage = this.blogInfo.favicon;
        } else {
          this.blogImage = '/assets/images/anguhashblog-logo.jpg'
        }
        if (!this.blogInfo.isTeam) {
          this.blogService
            .getAuthorInfo(this.blogURL)
            .subscribe((data) => {
              if (data.profilePicture) {
                this.blogImage = data.profilePicture;
              } else {
                this.blogImage = '/assets/images/anguhashblog-logo.jpg'
              }
            });
        }
        const {__typename, ...links} = data.links;
        this.blogSocialLinks = links;
      });

    this.blogService
      .getSeriesList(this.blogURL)
      .subscribe((data) => {
        this.seriesList = data;
      });
  }

  toggleTheme() {
    this.themeService.updateTheme();
  }

  openSearchDialog() {
    this.dialog.open(SearchDialogComponent, {
      id: 'searchDialog',
      width: '60%',
      maxHeight: '70%',
      position: {top: '150px'},
      data: this.blogInfo.id
    });
    this.applyDialogTheme();
  }

  openSettingsDialog() {
    this.dialog.open(SettingsDialogComponent, {
      height: "45vh",
      width: "26vw",
    });
    this.applyDialogTheme();
  }

  openFollowDialog() {
    this.dialog.open(FollowDialogComponent, {
      height: "50vh",
      width: "26vw",
    });
    this.applyDialogTheme();
  }

  applyDialogTheme() {
    let followDialog = this.document.querySelector(
      "mat-dialog-container"
    ) as HTMLElement;
    if (this.themeService.themeSignal() === "dark") {
      followDialog.classList.add("dark");
    }
  }

  ngOnDestroy(): void {
		this.querySubscription?.unsubscribe();
	}
}
