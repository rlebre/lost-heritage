export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface NewPost {
  id: any;
  contributorName: string;
  contributorEmail: string;
  contributorAddress: string;
  title: string;
  details: string;
  location: string;
  lat: string;
  lng: string;
  previousFunctions: string;
  stories: string;
  suggestedFunctions: string;
  newsletterAgree: false,
  photos: Array<any>;
  date: Date;
  isRecovered: false;
}