import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subscription } from 'rxjs';
import { BlogInfo } from '../../models/blog-info';
import { BlogService } from '../../services/blog.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit, OnDestroy {
  showMainFooter: boolean = true;
  blogURL!: string;
  blogInfo!: BlogInfo;
  blogName = '';
  date = new Date().getFullYear();
  blogService: BlogService = inject(BlogService);
	private route = inject(ActivatedRoute);
	private router = inject(Router);
  private querySubscription?: Subscription;

  ngOnInit(): void {
    this.blogURL = this.blogService.getBlogURL();
    this.querySubscription = this.blogService.getBlogInfo(this.blogURL).subscribe((data) => {
      this.blogInfo = data;
      this.blogName = this.blogInfo.title;
    });
    this.router.events.subscribe((event: any) => {
			if (event instanceof NavigationEnd) {
				this.showMainFooter =
					!this.route.snapshot.firstChild?.paramMap.has("postSlug");
			}
		});
  }

  ngOnDestroy() {
    this.querySubscription?.unsubscribe();
  }
}
