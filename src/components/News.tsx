import { observer } from "mobx-react";
import { useEffect } from "react";
import NewsApi, { ArticleResponse } from "../store/newsApi";

const newsProvider = new NewsApi();

const ArticlesVew = observer(({ newsProvider }: { newsProvider: NewsApi }) => {
  useEffect(() => {
    newsProvider.fetchNews();
  }, [newsProvider])
  
  if (newsProvider.pending) {
    return <div>Loading ...</div>;
  }

  if (newsProvider.data) {
    return (
      <div>
        Всего статей
        {newsProvider.data.totalResults}
      </div>
    );
  }

  return null;
});

const Articles = () => {


  return <ArticlesVew newsProvider={newsProvider} />
}

export default Articles;
