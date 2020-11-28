export class BlogPost {
    title: string;
    date: Date;
    body: string;
    short_description: string;
    published: boolean;
    categories: string[];

    constructor() { 
        this.title = "";
        this.date = null;
        this.body = "";
        this.short_description = "";
        this.published = false;
        this.categories = null;
    }
};
