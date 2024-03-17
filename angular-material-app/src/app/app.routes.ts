import { Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { SeriesComponent } from './components/series/series.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';

export const routes: Routes = [
  {
    path: '',
    component: PostsComponent
  },
  {
    path: 'series/:slug',
    component: SeriesComponent
  },
  {
    path: 'post/:postSlug',
    component: PostDetailsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
