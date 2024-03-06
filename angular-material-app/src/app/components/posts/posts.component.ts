import { Component, OnInit, inject } from "@angular/core";
import { BlogService } from "../../services/blog.service";
import { Router, RouterLink } from "@angular/router";
import { AsyncPipe } from "@angular/common";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from "rxjs/operators";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { Observable } from "rxjs";
import { Post } from "../../models/post";

@Component({
	selector: "app-posts",
	standalone: true,
	imports: [RouterLink, MatCardModule, MatGridListModule, AsyncPipe],
	templateUrl: "./posts.component.html",
	styleUrl: "./posts.component.scss",
})
export class PostsComponent implements OnInit {
  blogURL!: string;
  posts$!: Observable<Post[]>;
	private blogService = inject(BlogService);
	private router = inject(Router);

	ngOnInit() {
    this.blogURL = this.blogService.getBlogURL();
		this.posts$ = this.blogService.getPosts(this.blogURL);
	}

	navigateToPost(slug: string) {
		this.router.navigate(["/post", slug]);
	}
}
