import { makeAutoObservable } from "mobx";
import axios, { AxiosResponse } from "axios";
import qs from "qs";
import NewsAPI from "ts-newsapi";
import { countries } from "./settings";

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

export type Categories =
  | "business"
  | "entertainment"
  | "general"
  | "health"
  | "science"
  | "sports"
  | "technology";

export type Languages = "en" | "ru"


type Settings = {
  q?: string;
  from?: string;
  to?: string;
  endpoint?: "everything" | "top-headlines";
  language: Languages;
  sortBy?: "relevancy" | "popularity" | "publishedAt";
  pageSize?: number;
  page?: number;
  searchin?: "title" | "description" | "content";
  category?: Categories;
  country?: keyof typeof countries
};

const newsApi = new NewsAPI(process.env.REACT_APP_API_KEY ?? "");


const locals: {
  [key in Languages]: {
    categories: {
      [K in Categories]: string;
    };
  };
} = {
  en: {
    categories: {
      business: "Business",
      entertainment: "Entertainment",
      sports: "Sports",
      general: "General",
      health: "Health",
      science: "Science",
      technology: "Technology",
    },
  },
  ru: {
    categories: {
      business: "Бизнес",
      entertainment: "Развлечения",
      sports: "Спорт",
      general: "Общее",
      health: "Здоровье",
      science: "Наука",
      technology: "Технологии",
    },
  },
};

export default class NewsApi {
  data: null | ArticleResponse = null;
  pending: boolean = false;
  error: string | null = null;
  settings: Settings = { language: 'en', category: 'general' };

  constructor() {
    makeAutoObservable(this);
  }

  getPage = () => {
    return this.settings.page ?? 1;
  };

  getPageSize = () => {
    return this.settings.pageSize ?? 100;
  };

  getCurrentLanguage = () => {
    return this.settings.language ?? "en";
  };

  setCurrentLanguage = (v: "ru" | "en") => {
    this.setCurrentPage();
    this.settings.language = v;
    this.fetchNews();
  };

  setCurrentPage = (v?: number) => {
    this.settings.page = v;
    this.fetchNews();
  };

  getCurrentLanguageString = () => {
    switch (this.settings.language) {
      case "en":
        return "English";
      default:
        return "English";
    }
  };

  getCurrentCategory = () => {
    return this.settings.category;
  };

  getCategoryString = (v: Categories) => {
    const local = this.getCurrentLanguage();
    return locals[local].categories[v];
  };

  setCategory = (v?: Categories) => {
    this.settings.category = v ?? 'general';
    this.fetchNews()
  };

  setPending = (v: boolean) => (this.pending = v);

  getCountry = () => this.settings.country;

  getCountryString = () => {
    if (this.settings.country) {
      return countries[this.settings.country][this.settings.language]
    }
    return null
  }

  getCountryIcon = () => {
    if (this.settings.country) {
      return countries[this.settings.country].icon
    }
    return null
  }

  setCountry = (v?: keyof typeof countries) => {
    this.settings.country = v;
    this.fetchNews()
  }

  getHeadlines = async () => {
    this.setPending(true);
    try {
      const data = await newsApi.getTopHeadlines({
        ...this.settings,
        country: this.getCountry()
      }) as ArticleResponse;
      this.data = data;
    } catch (err: any) {
      this.error = err.message;
    } finally {
      this.setPending(false);
    }
  }

  fetchNews = async () => {
    this.setPending(true);
    console.log(this.settings.category);
    try {
      const data = !this.settings.q ? (await newsApi.getTopHeadlines({
        ...this.settings,
        country: this.getCountry()
      }) as ArticleResponse) : (await newsApi.getEverything({
        q: this.settings.q,
        sortBy: this.settings.sortBy,
        page: this.settings.page,
        language: this.settings.language,
      })) as ArticleResponse;
      this.data = data;
    } catch (err: any) {
      this.error = err.message;
    } finally {
      this.setPending(false);
    }
  };
}
