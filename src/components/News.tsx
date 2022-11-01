import { observer } from "mobx-react";
import { useEffect } from "react";
import NewsApi, { ArticleResponse } from "../store/newsApi";
import Article from "./Article";
import Loader from "./Loader";
import Menu from "./Menu";
import PaginationView from "./Pagination";

const newsProvider = new NewsApi();

const ArticlesVew = observer(({ newsProvider }: { newsProvider: NewsApi }) => {
  useEffect(() => {
    newsProvider.fetchNews();
  }, [newsProvider]);

  return (
    <div className="container-flex-col full-width jc ac gap15 container">
      {newsProvider.pending && <Loader />}
      <Menu newsProvider={newsProvider} />

      {newsProvider.data && (
        <div className="container-flex-row full-width jc gap15 ac">
          <div className="container-flex-row gap5">
            <span>Всего статей</span>
            <span className="bold">{newsProvider.data.totalResults}</span>
          </div>
          <div className="container-flex-row gap5">
            <span>Страница</span>
            <span className="bold">{newsProvider.getPage()}</span>
          </div>
          <div className="container-flex-row gap5">
            <span>Новостей на странице</span>
            <span className="bold">{newsProvider.getPageSize()}</span>
          </div>
        </div>
      )}

      {newsProvider.data && (
        <div className="news-container">
          {newsProvider.data.articles.map((el, id) => (
            <Article {...el} key={id} />
          ))}
        </div>
      )}

      <PaginationView newsProvider={newsProvider} />
    </div>
  );
});

const Articles = () => {
  return <ArticlesVew newsProvider={newsProvider} />;
};

export default Articles;
