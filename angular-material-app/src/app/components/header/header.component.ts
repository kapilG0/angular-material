import {
  AfterViewInit,
	Component,
	Inject,
	inject,
	OnDestroy,
	OnInit,
	PLATFORM_ID,
} from "@angular/core";
import { ThemeService } from "../../services/theme.service";
import { DOCUMENT, isPlatformBrowser, KeyValuePipe } from "@angular/common";
import {
	ActivatedRoute,
	NavigationEnd,
	Router,
	RouterLink,
} from "@angular/router";
import { SeriesList } from "../../models/post";
import { BlogInfo, BlogLinks } from "../../models/blog-info";
import { BlogService } from "../../services/blog.service";
import { MatDialog } from "@angular/material/dialog";
import { SearchDialogComponent } from "../../partials/search-dialog/search-dialog.component";
import { SettingsDialogComponent } from "../../partials/settings-dialog/settings-dialog.component";
import { FollowDialogComponent } from "../../partials/follow-dialog/follow-dialog.component";
import { BlogSocialIconsComponent } from "../../partials/blog-social-icons/blog-social-icons.component";

import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Subscription } from "rxjs";
import { platformBrowser } from "@angular/platform-browser";

@Component({
	selector: "app-header",
	standalone: true,
	imports: [
		BlogSocialIconsComponent,
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
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
	showMainHeader: boolean = true;
	switchIcons: any;
	blogURL!: string;
	blogInfo!: BlogInfo;
	blogName: string = "";
	// start with default image to prevent 404 when returning from post-details page
	blogImage: string = "/assets/images/anguhashblog-logo-purple-bgr.jpg";
	blogSocialLinks!: BlogLinks;
	seriesList!: SeriesList[];
	themeService: ThemeService = inject(ThemeService);
	blogService: BlogService = inject(BlogService);
	private route = inject(ActivatedRoute);
	private router = inject(Router);
	private querySubscription?: Subscription;

	constructor(
		public dialog: MatDialog,
		@Inject(DOCUMENT) private document: Document,
		@Inject(PLATFORM_ID) private platformId: Object
	) {}

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
					this.blogImage = "/assets/images/anguhashblog-logo-purple-bgr.jpg";
				}
				if (!this.blogInfo.isTeam) {
					this.blogService.getAuthorInfo(this.blogURL).subscribe((data) => {
						if (data.profilePicture) {
							this.blogImage = data.profilePicture;
						} else {
							this.blogImage =
								"/assets/images/anguhashblog-logo-purple-bgr.jpg";
						}
					});
				}
				const { __typename, ...links } = data.links;
				this.blogSocialLinks = links;
			});

		this.blogService.getSeriesList(this.blogURL).subscribe((data) => {
			this.seriesList = data;
		});
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.showMainHeader =
					!this.route.snapshot.firstChild?.paramMap.has("postSlug");
			}
		});
	}

  ngAfterViewInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			this.switchIcons = document.querySelector(".mdc-switch__icons");
			this.switchIcons.innerHTML = `
    <div class="mdc-switch__icons">
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor" class="mdc-switch__icon mdc-switch__icon--off"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" aria-hidden="true" fill="currentColor" class="mdc-switch__icon mdc-switch__icon--on"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>
    </div>
    `;
		}
  }

	toggleTheme() {
		this.themeService.updateTheme();
	}

	openSearchDialog() {
		this.dialog.open(SearchDialogComponent, {
			id: "searchDialog",
			width: "60%",
			maxHeight: "70%",
			position: { top: "150px" },
			data: this.blogInfo.id,
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
