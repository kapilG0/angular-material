import { Component, OnInit, inject } from "@angular/core";
import { BlogService } from "../../services/blog.service";
import { RouterLink } from "@angular/router";
import { AsyncPipe, SlicePipe } from "@angular/common";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { Observable } from "rxjs";
import { Post } from "../../models/post";
import { MatDialogModule ,MatDialog,
	MatDialogRef,
	MatDialogActions,
	MatDialogClose,
	MatDialogTitle,
	MatDialogContent,} from "@angular/material/dialog";
import { BlogShareDialogComponent } from "../../partials/blog-share-dialog/blog-share-dialog.component";

@Component({
	selector: "app-posts",
	standalone: true,
	imports: [RouterLink, MatCardModule, MatDialogModule, MatGridListModule, AsyncPipe, SlicePipe],
	templateUrl: "./posts.component.html",
	styleUrl: "./posts.component.scss",
})
export class PostsComponent implements OnInit {
	constructor(public dialog: MatDialog) {}

	blogURL!: string;
	posts$!: Observable<Post[]>;
	private blogService = inject(BlogService);

	ngOnInit() {
		this.blogURL = this.blogService.getBlogURL();
		this.posts$ = this.blogService.getPosts(this.blogURL);
	}
	openBlogShareDialog(e:any,url:string,postURL:any){
		console.log(postURL,36)
		e.stopPropagation()
		this.dialog.open(BlogShareDialogComponent, {
			width: '500px',
		panelClass:'blogsharedialog',
		data:`${window.location.host}/post/${postURL.slug}`
		  });
	}
}
