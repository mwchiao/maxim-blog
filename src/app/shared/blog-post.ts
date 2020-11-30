import * as firebase from 'firebase/app';
import 'firebase/firestore';

export class BlogPost {
    id: string;
    title: string;
    date: firebase.firestore.Timestamp;
    body: string;
    short_description: string;
    published: boolean;
    categories: string[];

    constructor() { 
        this.id = "";
        this.title = "";
        this.date = new firebase.firestore.Timestamp(0,0);
        this.body = "";
        this.short_description = "";
        this.published = false;
        this.categories = [];
    }
};
