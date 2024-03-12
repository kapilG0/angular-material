import { MediaMatcher } from "@angular/cdk/layout";
import {
	ChangeDetectorRef,
	Component,
	Input,
	OnDestroy,
	OnInit,
	inject,
} from "@angular/core";
import { BlogService } from "../../services/blog.service";
import { AsyncPipe, DatePipe, KeyValuePipe } from "@angular/common";
import { SanitizerHtmlPipe } from "../../pipes/sanitizer-html.pipe";
import { YoutubeVideoEmbedDirective } from "../../directives/youtube-video-embed.directive";
import { Post, SeriesList } from "../../models/post";
import { Observable, Subscription } from "rxjs";
import { BlogInfo, BlogLinks } from "../../models/blog-info";
import { RouterLink } from "@angular/router";
import { ThemeService } from "../../services/theme.service";
import { FooterComponent } from "../footer/footer.component";

import { MatSlideToggle } from "@angular/material/slide-toggle";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BlogSocialIconsComponent } from "../blog-social-icons/blog-social-icons.component";

@Component({
	selector: "app-post-details",
	standalone: true,
	imports: [
    FooterComponent,
    BlogSocialIconsComponent,
		RouterLink,
		AsyncPipe,
		DatePipe,
    KeyValuePipe,
    SanitizerHtmlPipe,
    YoutubeVideoEmbedDirective,
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatSidenavModule,
		MatListModule,
    MatSlideToggle,
	],
	templateUrl: "./post-details.component.html",
	styleUrl: "./post-details.component.scss",
})
export class PostDetailsComponent implements OnInit, OnDestroy {
	mobileQuery: MediaQueryList;
  date = new Date().getFullYear();
  blogURL!: string;
	blogInfo!: BlogInfo;
	blogName: string = "";
	blogSocialLinks!: BlogLinks;
	seriesList!: SeriesList[];
	post$!: Observable<Post>;
  themeService: ThemeService = inject(ThemeService);
	private blogService = inject(BlogService);
	private querySubscription?: Subscription;
	private _mobileQueryListener: () => void;

	@Input({ required: true }) postSlug!: string;

	constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
		this.mobileQuery = media.matchMedia("(max-width: 600px)");
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}

	ngOnInit(): void {
    this.blogURL = this.blogService.getBlogURL();
		this.querySubscription = this.blogService
			.getBlogInfo(this.blogURL)
			.subscribe((data) => {
				this.blogInfo = data;
				this.blogName = this.blogInfo.title;
        const { __typename, ...links } = data.links;
        this.blogSocialLinks = links;
			});
		this.post$ = this.blogService.getSinglePost(this.blogURL,this.postSlug);
		this.querySubscription = this.blogService
			.getSeriesList(this.blogURL)
			.subscribe((data) => {
				this.seriesList = data;
			});
	}

  toggleTheme(): void {
    this.themeService.updateTheme();
  }

	ngOnDestroy(): void {
		this.querySubscription?.unsubscribe();
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}
}
