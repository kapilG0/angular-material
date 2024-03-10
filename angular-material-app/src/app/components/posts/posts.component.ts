import { Component, OnInit, inject } from "@angular/core";
import { BlogService } from "../../services/blog.service";
import { RouterLink } from "@angular/router";
import { AsyncPipe, SlicePipe } from "@angular/common";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { Observable } from "rxjs";
import { Post } from "../../models/post";

@Component({
	selector: "app-posts",
	standalone: true,
	imports: [RouterLink, MatCardModule, MatGridListModule, AsyncPipe, SlicePipe],
	templateUrl: "./posts.component.html",
	styleUrl: "./posts.component.scss",
})
export class PostsComponent implements OnInit {
  blogURL!: string;
  posts$!: Observable<Post[]>;
	private blogService = inject(BlogService);

	ngOnInit() {
    this.blogURL = this.blogService.getBlogURL();
		this.posts$ = this.blogService.getPosts(this.blogURL);
	}
}
