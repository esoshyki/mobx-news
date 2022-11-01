import { observer } from "mobx-react";
import NewsApi, { Categories as CategoriesType } from "../store/newsApi";
import { Form } from 'react-bootstrap'

const Categories = observer(({ newsProvider }: { newsProvider: NewsApi }) => {
  const categories: CategoriesType[] = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  return (
    <Form.Select
      area-lavel="select-category"
      value={newsProvider.getCurrentCategory()}
      onChange={(e) =>
        newsProvider.setCategory(e.target.value as CategoriesType)
      }
    >
      {categories.map((el) => (
        <option value={el} key={el}>
          {newsProvider.getCategoryString(el)}
        </option>
      ))}
    </Form.Select>
  );
});

export default Categories