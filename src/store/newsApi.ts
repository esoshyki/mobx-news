import { makeAutoObservable } from "mobx";
import axios, { AxiosResponse } from "axios";
import qs from "qs";
import NewsAPI from 'ts-newsapi'

export type Article = {
  source: {
    id: null | string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export type ArticleResponse = {
  status: "ok" | "error";
  totalResults: number;
  articles: Article[];
};

type Settings = {
  query?: string;
  from?: string;
  to?: string;
  endpoint?: "everything" | "top-headlines";
  language?:
    | "ar"
    | "de"
    | "en"
    | "es"
    | "fr"
    | "he"
    | "it"
    | "nl"
    | "no"
    | "pt"
    | "ru"
    | "sv"
    | "ud"
    | "zh";
  sortBy?: "relevancy" | "popularity" | "publishedAt";
  pageSize?: number;
  page?: number;
  searchin?: "title" | "description" | "content";
  category?:
    | "business"
    | "entertainment"
    | "general"
    | "health"
    | "science"
    | "sports"
    | "technology";
  apiKey: string
};

const api = axios.create({
  headers: {
    "X-Api-Key": process.env.REACT_APP_API_KEY,
  },
  baseURL: process.env.REACT_APP_API_URL,
});

console.log(process.env.REACT_APP_API_KEY)

const newsApi = new NewsAPI(process.env.REACT_APP_API_KEY ?? "");

export default class NewsApi {
  data: null | ArticleResponse = null;
  pending: boolean = false;
  error: string | null = null;
  settings: Settings = { apiKey: process.env.REACT_APP_API_KEY ?? ""};

  constructor() {
    makeAutoObservable(this);
  }

  setPending = (v: boolean) => this.pending = v;

  fetchNews = async () => {
    this.setPending(true)
    try {
      const data = await newsApi.getEverything(this.settings as any)
      console.log(data);
    } catch (err: any) {
      console.log(err);
      this.error = err.message;
    } finally {
      this.setPending(false)
    }
  };
}
