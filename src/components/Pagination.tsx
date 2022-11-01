import { observer } from "mobx-react";
import Pagination from "react-bootstrap/Pagination";
import NewsApi from "../store/newsApi";

const PaginationView = observer(
  ({ newsProvider }: { newsProvider: NewsApi }) => {
    if (newsProvider.data) {
      const page = newsProvider.getPage();
      const pageSize = newsProvider.getPageSize();
      const results = newsProvider.data.totalResults;
      const pageCount = Math.round(results / pageSize) || 1;
      const minPage = page - 2 >= 1 ? page - 2 : 1;
      const maxPage = minPage + 5;

      if (pageCount < 5) {
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          {new Array(5)
            .fill(0)
            .map((_, idx) => idx + 1)
            .map((el) => (
              <Pagination.Item
                className={el > pageCount ? 'hidden' : 'auto'}
                key={el}
                active={page === el}
                onClick={() => {
                  newsProvider.setCurrentPage(el);
                }}
                disabled={el > pageCount}
              >
                {el}
              </Pagination.Item>
            ))}
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>;
      }

      return (
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          {new Array(5)
            .fill(minPage)
            .map((_, idx) => idx + 1)
            .map((el) => (
              <Pagination.Item
                key={el}
                active={page === el}
                onClick={() => {
                  newsProvider.setCurrentPage(el);
                }}
                disabled={el > pageCount}
              >
                {el}
              </Pagination.Item>
            ))}
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      );
    }

    return null;
  }
);

export default PaginationView;
