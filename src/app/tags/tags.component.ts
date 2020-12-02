import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../shared/blog-post';
import { PostService } from '../shared/services/post.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit, OnDestroy {
  private _selectedTag: string = "";
  private _posts$: Observable<BlogPost[]>;
  private _postsSub: Subscription;
  posts: BlogPost[] = [];

  loading: boolean = true;

  constructor(
    private title: Title,
    private route: ActivatedRoute, 
    private postService: PostService
  ) { 
    this._posts$ = new Observable<BlogPost[]>();
    this._postsSub = new Subscription();
  }

  ngOnInit(): void {
    this._selectedTag = this.route.snapshot.paramMap.get("tag") || "";
    this.title.setTitle("[DEMO] " + this._selectedTag + " Posts | Maxim's Blog");
    this._posts$ = this.postService.getPostsWithTag(this._selectedTag);

    this._postsSub = this._posts$.subscribe(posts => {
      this.loading = false;
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    if (this._postsSub) this._postsSub.unsubscribe();
  }

  get tag(): string {
    return this._selectedTag;
  }
}
